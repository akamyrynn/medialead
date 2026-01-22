"use client";
import "./Spotlight.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Helper component to split text into chars manually (works with Cyrillic)
const SplitText = ({ children }) => {
  const text = String(children);
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index} className="char" style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

const Spotlight = () => {
  const spotlightRef = useRef(null);

  useGSAP(
    () => {
      const scrollTriggerInstances = [];

      const initSpotlight = () => {
        document
          .querySelectorAll(".marquee-container")
          .forEach((container, index) => {
            const marquee = container.querySelector(".marquee");
            const chars = container.querySelectorAll(".char");

            const marqueeTrigger = gsap.to(marquee, {
              x: index % 2 === 0 ? "5%" : "-15%",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "150% top",
                scrub: true,
              },
              force3D: true,
            });

            const charsTrigger = gsap.fromTo(
              chars,
              { fontWeight: 100 },
              {
                fontWeight: 900,
                duration: 1,
                ease: "none",
                stagger: {
                  each: 0.35,
                  from: index % 2 === 0 ? "end" : "start",
                  ease: "linear",
                },
                scrollTrigger: {
                  trigger: container,
                  start: "50% bottom",
                  end: "top top",
                  scrub: true,
                },
              }
            );

            if (marqueeTrigger.scrollTrigger) {
              scrollTriggerInstances.push(marqueeTrigger.scrollTrigger);
            }
            if (charsTrigger.scrollTrigger) {
              scrollTriggerInstances.push(charsTrigger.scrollTrigger);
            }
          });

        ScrollTrigger.refresh();
      };

      const waitForOtherTriggers = () => {
        const existingTriggers = ScrollTrigger.getAll();
        const hasPinnedTrigger = existingTriggers.some(
          (trigger) => trigger.vars && trigger.vars.pin
        );

        if (hasPinnedTrigger || existingTriggers.length > 0) {
          setTimeout(initSpotlight, 300);
        } else {
          initSpotlight();
        }
      };

      setTimeout(waitForOtherTriggers, 100);

      return () => {
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
      };
    },
    { scope: spotlightRef }
  );

  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="marquees">
        <div className="marquee-container" id="marquee-1">
          <div className="marquee">
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1><SplitText>Нам</SplitText></h1>
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-2">
          <div className="marquee">
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1><SplitText>Доверяют</SplitText></h1>
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-3">
          <div className="marquee">
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1><SplitText>Эти</SplitText></h1>
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-4">
          <div className="marquee">
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1><SplitText>Бренды</SplitText></h1>
            </div>
            <div className="marquee-img-item">
              <div className="placeholder-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
