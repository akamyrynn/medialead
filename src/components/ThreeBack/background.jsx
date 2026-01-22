import {
  Renderer,
  Program,
  Color,
  Mesh,
  Vec2,
  Geometry,
  Camera
} from "https://cdn.skypack.dev/ogl";

const vertex = /* glsl */ `
precision mediump float;

attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}
`;

const fragment = /* glsl */ `
precision mediump float;

#define PI 3.141592653589793

uniform float uTime;
uniform vec3 uColors[16];
varying vec2 vUv;
uniform vec2 uResolution;

float oscillate(float time, float min, float max) {
    float mid = (min + max) / 2.0;
    float amplitude = (max - min) / 2.0;
    return amplitude * sin(time) + mid;
}

float waveX(float linePos, float edgeSize, float time) {
    linePos -= 0.5;
    vec2 uv = vUv - 0.5;
    float wave = 0.1 * sin(uv.y * PI + time) + linePos;
    float edge0 = wave - edgeSize;
    float edge1 = wave + edgeSize;
    return smoothstep(edge0, edge1, uv.x);
}

float waveY(float linePos, float edgeSize, float time) {
    linePos -= 0.5;
    vec2 uv = vUv - 0.5;
    float wave = 0.1 * sin(uv.x * PI + time) + linePos;
    float edge0 = wave - edgeSize;
    float edge1 = wave + edgeSize;
    return smoothstep(edge0, edge1, uv.y);
}

void main() {
    vec3 layer1, layer2;
    vec3 mix1, mix2;

    mix1 = mix(
        uColors[4],
        uColors[0],
        waveY(0.75, oscillate(uTime, 0.1, 0.2), uTime * 2.1)
    );
    mix2 = mix(
        uColors[5],
        uColors[1],
        waveY(0.75, 0.1, uTime * 1.2)
    );
    layer1 = mix(
        mix1,
        mix2,
        waveX(0.25, 0.1, uTime * 1.1)
    );

    mix1 = mix(
        uColors[6],
        uColors[2],
        waveY(0.75, oscillate(uTime * 0.1, 0.1, 0.2), uTime * -2.0)
    );
    mix2 = mix(
        uColors[7],
        uColors[3],
        waveY(0.75, 0.1, uTime * -1.0)
    );
    layer2 = mix(
        mix1,
        mix2,
        waveX(0.75, 0.1, uTime * 2.0)
    );
    vec3 layerMix1 = mix(
        layer1,
        layer2,
        waveX(0.5, 0.1, uTime * 2.0)
    );

    mix1 = mix(
        uColors[12],
        uColors[8],
        waveY(0.0, 0.1, uTime * 2.1)
    );
    mix2 = mix(
        uColors[13],
        uColors[9],
        waveY(0.25, 0.1, uTime * 3.4)
    );
    layer1 = mix(
        mix1,
        mix2,
        waveX(0.25, 0.2, uTime * 2.0)
    );

    mix1 = mix(
        uColors[14],
        uColors[10],
        waveY(0.25, 0.1, uTime * -1.2)
    );
    mix2 = mix(
        uColors[15],
        uColors[11],
        waveY(0.25, 0.1, uTime * -3.0)
    );
    layer2 = mix(
        mix1,
        mix2,
        waveX(0.75, 0.1, uTime * 2.4)
    );

    vec3 layerMix2 = mix(
        layer1,
        layer2,
        waveX(0.5, 0.2, uTime * 1.2)
    );

    vec3 finalComp = mix(
        layerMix2,
        layerMix1,
        waveY(0.5, 0.1, uTime * -0.5)
    );
    
    // Grains noise
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float noiseAmount = 0.1;
    float n = fract(sin(dot(uv, vec2(uTime + 12.9898, 78.233))) * 43758.5453);
    finalComp *= (1.0 - noiseAmount + n * noiseAmount);

    gl_FragColor = vec4(finalComp, 1.);
}`;

const renderer = new Renderer({
  dpr: devicePixelRatio
});
const gl = renderer.gl;
document.body.appendChild(gl.canvas);
gl.clearColor(1, 1, 1, 0);

const resolution = { value: new Vec2() };
const camera = new Camera(gl, { fov: 35 });
camera.position.set(0, 0, 5);

function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  resolution.value.set(width, height);
  camera.perspective({ aspect: width / height });
}
window.addEventListener("resize", resize, false);
resize();

function hexToVec3(e) {
  var t = parseInt(e.substring(1, 3), 16) / 255,
    g = parseInt(e.substring(3, 5), 16) / 255,
    b = parseInt(e.substring(5, 7), 16) / 255;
  return new Color(t, g, b);
}

function colors() {
  const t = [
    "#efbfb1",
    "#ecce6b",
    "#f7c652",
    "#e0e4eb",
    "#ff9373",
    "#f7c652",
    "#ff9373",
    "#ff7f79",
    "#f7c652",
    "#e37e78",
    "#077aad",
    "#ff7f79",
    "#ecce6b",
    "#e0e3ea",
    "#e37e78",
    "#055b82"
  ];

  return t.map(function (t) {
    return hexToVec3(t);
  });
}

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTime: { value: 0 },
    uColors: { value: colors() },
    uResolution: resolution
  }
});

const geometry = new Geometry(gl, {
  position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
  uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
});

const plane = new Mesh(gl, { geometry, program });

requestAnimationFrame(update);
function update(t) {
  requestAnimationFrame(update);

  program.uniforms.uTime.value = t * 0.0005;

  renderer.render({ scene: plane, camera });
}
