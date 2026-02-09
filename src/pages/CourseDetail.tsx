import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Users, Clock, BookOpen, Play, CheckCircle2, ArrowLeft, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButton from "@/components/MagneticButton";
import AnimatedText from "@/components/AnimatedText";
import { mockCourses } from "@/data/courses";

gsap.registerPlugin(ScrollTrigger);

const mockSyllabus = [
  { title: "Getting Started", lessons: 8, duration: "1h 20m" },
  { title: "Core Concepts", lessons: 14, duration: "3h 45m" },
  { title: "Advanced Techniques", lessons: 12, duration: "4h 10m" },
  { title: "Real-World Projects", lessons: 6, duration: "5h 30m" },
  { title: "Certification Prep", lessons: 10, duration: "2h 50m" },
];

const learningPoints = [
  "Build production-ready applications",
  "Understand core architecture patterns",
  "Pass certification exams confidently",
  "Deploy and scale in the cloud",
  "Implement security best practices",
  "Write clean, maintainable code",
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || !course) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      
      heroTl
        .fromTo(".back-link", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" })
        .fromTo(".course-badges", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .fromTo(".course-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(".course-description", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(".course-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }, "-=0.3");

      // Learning points animation
      gsap.fromTo(
        ".learning-point",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".learning-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Syllabus items
      gsap.fromTo(
        ".syllabus-item",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".syllabus-section",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Sidebar animation
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover effects for syllabus items
      const syllabusItems = gsap.utils.toArray<HTMLElement>(".syllabus-item");
      syllabusItems.forEach((item) => {
        const playIcon = item.querySelector(".play-icon");
        
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: 10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          if (playIcon) {
            gsap.to(playIcon, {
              scale: 1.3,
              rotate: 360,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          if (playIcon) {
            gsap.to(playIcon, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Link to="/courses"><Button>Browse Courses</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div ref={heroRef} className="hero-gradient py-16 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <div className="container mx-auto px-4 relative z-10">
            <Link
              to="/courses"
              className="back-link inline-flex items-center gap-1 text-sm mb-6 hover:text-primary transition-colors group"
              style={{ color: "hsl(220 12% 65%)" }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Courses
            </Link>
            
            <div className="max-w-3xl">
              <div className="course-badges flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              
              <h1 className="course-title font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(220 20% 95%)" }}>
                {course.title}
              </h1>
              
              <p className="course-description text-lg mb-6" style={{ color: "hsl(220 12% 65%)" }}>
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: "hsl(220 12% 55%)" }}>
                <span className="course-meta flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-primary" /> {course.rating} rating
                </span>
                <span className="course-meta flex items-center gap-1">
                  <Users className="w-4 h-4" /> {course.students.toLocaleString()} students
                </span>
                <span className="course-meta flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {course.duration} total
                </span>
                <span className="course-meta flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> {course.lessons} lessons
                </span>
              </div>
              
              <div className="course-meta mt-4 text-sm" style={{ color: "hsl(220 12% 55%)" }}>
                Created by <span className="text-primary font-medium">{course.instructor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <section className="learning-section">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <AnimatedText text="What You'll Learn" animation="reveal" />
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {learningPoints.map((item) => (
                    <div key={item} className="learning-point flex items-start gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Syllabus */}
              <section className="syllabus-section">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Course Syllabus
                </h2>
                <div className="space-y-3">
                  {mockSyllabus.map((section, i) => (
                    <div
                      key={i}
                      className="syllabus-item glass-card rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-primary/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{section.title}</p>
                          <p className="text-xs text-muted-foreground">{section.lessons} lessons · {section.duration}</p>
                        </div>
                      </div>
                      <Play className="play-icon w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div ref={sidebarRef}>
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <div className="text-3xl font-display font-bold text-foreground mb-1">${course.price}</div>
                <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Lifetime access · Certificate included
                </p>
                <MagneticButton className="w-full mb-3">
                  <Button className="w-full" size="lg">Enroll Now</Button>
                </MagneticButton>
                <Button variant="outline" className="w-full" size="lg">Add to Wishlist</Button>
                
                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="text-foreground font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons</span>
                    <span className="text-foreground font-medium">{course.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level</span>
                    <span className="text-foreground font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate</span>
                    <span className="text-foreground font-medium">Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
