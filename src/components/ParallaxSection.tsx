import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

const ParallaxSection = ({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const yPercent = direction === "up" ? -30 * speed : 30 * speed;

    gsap.to(ref.current, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxSection;
