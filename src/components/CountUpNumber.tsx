import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const CountUpNumber = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: CountUpNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const el = ref.current;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
        onEnter: () => {
          hasAnimated.current = true;
        },
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [end, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

export default CountUpNumber;
