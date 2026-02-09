import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

const MagneticButton = ({ children, className = "", strength = 0.4 }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const text = textRef.current;

    const handleMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });

      if (text) {
        gsap.to(text, {
          x: x * strength * 0.5,
          y: y * strength * 0.5,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });

      if (text) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    button.addEventListener("mousemove", handleMove);
    button.addEventListener("mouseleave", handleLeave);

    return () => {
      button.removeEventListener("mousemove", handleMove);
      button.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={`inline-block ${className}`}>
      <span ref={textRef} className="block">
        {children}
      </span>
    </div>
  );
};

export default MagneticButton;
