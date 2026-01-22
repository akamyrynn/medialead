"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Optimized fragment shader - simpler noise, fewer iterations
const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseInfluence;
varying vec2 vUv;

// Simple hash-based noise (much faster than simplex)
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Simple 2-octave fbm (instead of 5)
float fbm(vec2 p) {
    float v = 0.0;
    v += 0.5 * noise(p);
    v += 0.25 * noise(p * 2.0);
    return v;
}

void main() {
    vec2 uv = vUv;
    float time = uTime * 0.08;
    
    // Mouse effect
    vec2 mousePos = uMouse * 0.5 + 0.5;
    float mouseDist = distance(uv, mousePos);
    float mouseGlow = smoothstep(0.5, 0.0, mouseDist) * uMouseInfluence * 0.4;
    
    // Simple flowing patterns
    vec2 coord = uv * 1.2 + time * 0.3;
    float n1 = fbm(coord);
    float n2 = fbm(coord * 1.2 + vec2(time * 0.2, -time * 0.15));
    
    // Colors - strong and saturated
    vec3 black = vec3(0.02, 0.01, 0.04);
    vec3 deepPurple = vec3(0.3, 0.02, 0.5);
    vec3 violet = vec3(0.55, 0.05, 0.8);
    vec3 magenta = vec3(0.75, 0.02, 0.55);
    vec3 crimson = vec3(0.65, 0.02, 0.25);
    vec3 hotPink = vec3(1.0, 0.2, 0.6);
    
    // Mix colors
    float g1 = smoothstep(-0.3, 0.8, n1 + uv.y * 0.3);
    float g2 = smoothstep(-0.2, 0.7, n2 - uv.y * 0.2 + uv.x * 0.3);
    
    vec3 color = black;
    color = mix(color, deepPurple, g1);
    color = mix(color, violet, g2 * 0.8);
    color = mix(color, magenta, n1 * n2 * 0.9);
    color = mix(color, crimson, smoothstep(0.3, 0.7, n1) * (1.0 - uv.y) * 0.6);
    
    // Mouse glow
    color = mix(color, hotPink, mouseGlow);
    
    // Soft vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.6;
    color *= vignette;
    
    // Boost
    color *= 1.2;
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function GradientPlane() {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const mouseInfluenceRef = useRef(0);
  const frameCount = useRef(0);
  
  const handleMouseMove = useCallback((event) => {
    mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    mouseInfluenceRef.current = 1.0;
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Throttled mouse listener
      let lastMove = 0;
      const throttledMove = (e) => {
        const now = Date.now();
        if (now - lastMove > 50) { // 20fps for mouse
          handleMouseMove(e);
          lastMove = now;
        }
      };
      
      window.addEventListener('mousemove', throttledMove, { passive: true });
      return () => window.removeEventListener('mousemove', throttledMove);
    }
  }, [handleMouseMove]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseInfluence: { value: 0 }
    }),
    []
  );

  useFrame((state) => {
    // Skip every other frame for performance
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;
    
    if (meshRef.current) {
      const material = meshRef.current.material;
      
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      
      mouseInfluenceRef.current *= 0.98;
      material.uniforms.uMouseInfluence.value = mouseInfluenceRef.current;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Gradient layer */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -2,
        pointerEvents: "none"
      }}>
        <Canvas
          orthographic
          camera={{ 
            position: [0, 0, 1],
            left: -1, right: 1, top: 1, bottom: -1,
            near: 0.1, far: 10, zoom: 1
          }}
          gl={{ 
            alpha: false, 
            antialias: false,
            powerPreference: "low-power",
            stencil: false,
            depth: false,
            preserveDrawingBuffer: false
          }}
          dpr={1} // Force 1x resolution - big performance boost
          frameloop="always"
          style={{ width: '100%', height: '100%' }}
        >
          <GradientPlane />
        </Canvas>
      </div>
      
      {/* Heavy frosted glass blur */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        backdropFilter: "blur(100px) saturate(1.4)",
        WebkitBackdropFilter: "blur(100px) saturate(1.4)",
        background: "rgba(0, 0, 0, 0.2)"
      }} />
    </>
  );
}
