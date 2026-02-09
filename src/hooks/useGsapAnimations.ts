import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Staggered card animation
export const useStaggerCards = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cards = ref.current.querySelectorAll(".gsap-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return ref;
};

// Parallax effect for sections
export const useParallax = <T extends HTMLElement>(speed: number = 0.5) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      yPercent: -30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [speed]);

  return ref;
};

// Magnetic hover effect
export const useMagnetic = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
};

// Floating animation
export const useFloat = <T extends HTMLElement>(amplitude: number = 20) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: amplitude,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, [amplitude]);

  return ref;
};

// Initialize page scroll animations
export const usePageAnimations = () => {
  useEffect(() => {
    // Fade up elements
    gsap.utils.toArray<HTMLElement>(".gsap-fade-up").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Scale in elements
    gsap.utils.toArray<HTMLElement>(".gsap-scale-in").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Slide in from left
    gsap.utils.toArray<HTMLElement>(".gsap-slide-left").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Slide in from right
    gsap.utils.toArray<HTMLElement>(".gsap-slide-right").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};
