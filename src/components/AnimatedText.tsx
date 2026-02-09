import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: "reveal" | "wave" | "bounce" | "glitch" | "gradient";
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  animation = "reveal",
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || charsRef.current.length === 0) return;

    const chars = charsRef.current.filter(Boolean);

    const animations = {
      reveal: {
        from: { opacity: 0, y: 50, rotateX: -90 },
        to: { opacity: 1, y: 0, rotateX: 0, ease: "back.out(1.7)" },
      },
      wave: {
        from: { opacity: 0, y: 30, scale: 0 },
        to: { opacity: 1, y: 0, scale: 1, ease: "elastic.out(1, 0.5)" },
      },
      bounce: {
        from: { opacity: 0, y: -100 },
        to: { opacity: 1, y: 0, ease: "bounce.out" },
      },
      glitch: {
        from: { opacity: 0, x: -20, skewX: -30 },
        to: { opacity: 1, x: 0, skewX: 0, ease: "power4.out" },
      },
      gradient: {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0, ease: "power3.out" },
      },
    };

    const anim = animations[animation];

    gsap.fromTo(chars, anim.from, {
      ...anim.to,
      duration: 0.8,
      delay,
      stagger: {
        each: stagger,
        from: "start",
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Add hover effect
    chars.forEach((char) => {
      if (!char) return;

      const handleEnter = () => {
        gsap.to(char, {
          y: -5,
          scale: 1.2,
          color: "hsl(38 92% 50%)",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        gsap.to(char, {
          y: 0,
          scale: 1,
          color: "inherit",
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      };

      char.addEventListener("mouseenter", handleEnter);
      char.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animation, delay, stagger]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => {
            const globalIndex = words.slice(0, wordIndex).join("").length + wordIndex + charIndex;
            return (
              <span
                key={charIndex}
                ref={(el) => {
                  if (el) charsRef.current[globalIndex] = el;
                }}
                className="inline-block cursor-default"
                style={{ perspective: "1000px" }}
              >
                {char}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
