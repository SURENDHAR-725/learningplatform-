import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Course } from "@/data/courses";

const levelColors: Record<string, string> = {
  Beginner: "bg-success/15 text-success border-success/20",
  Intermediate: "bg-info/15 text-info border-info/20",
  Advanced: "bg-accent/15 text-accent border-accent/20",
};

const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;

    const handleEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });
      if (image) {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      if (image) {
        gsap.to(image, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Tilt effect on mouse move
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMoveEnd = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleMoveEnd);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleMoveEnd);
    };
  }, []);

  return (
    <Link to={`/course/${course.id}`}>
      <div
        ref={cardRef}
        className="glass-card rounded-xl overflow-hidden h-full flex flex-col cursor-pointer"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div ref={imageRef} className="h-40 bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/30" />
          </div>
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[course.level]}`}>
              {course.level}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {course.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" /> {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> {(course.students / 1000).toFixed(1)}K
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">{course.instructor}</span>
            <span className="font-display font-bold text-foreground">${course.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
