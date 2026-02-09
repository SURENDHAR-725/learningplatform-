import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Clock, Award, TrendingUp, Play, ArrowRight, Target, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CountUpNumber from "@/components/CountUpNumber";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const statCards = [
  { label: "Courses Enrolled", value: 6, icon: BookOpen, color: "text-primary", bg: "from-primary/20 to-primary/5" },
  { label: "Hours Learned", value: 84, icon: Clock, color: "text-info", bg: "from-info/20 to-info/5" },
  { label: "Certificates", value: 2, icon: Award, color: "text-accent", bg: "from-accent/20 to-accent/5" },
  { label: "Day Streak", value: 12, icon: Flame, color: "text-destructive", bg: "from-destructive/20 to-destructive/5" },
];

const enrolledCourses = [
  { title: "AWS Solutions Architect", progress: 72, instructor: "Sarah Chen", nextLesson: "VPC Deep Dive" },
  { title: "Full-Stack React & Node.js", progress: 45, instructor: "Marcus Rodriguez", nextLesson: "Auth with JWT" },
  { title: "Machine Learning with Python", progress: 18, instructor: "Dr. Aisha Patel", nextLesson: "Neural Networks" },
];

const Dashboard = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Welcome animation
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".welcome-section",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Stats cards with stagger
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50, scale: 0.8, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Course cards slide in
      gsap.fromTo(
        ".course-card",
        { opacity: 0, x: -60, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: coursesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Sidebar cards
      gsap.fromTo(
        ".sidebar-card",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sidebar-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add hover effects to stat cards
      const statCards = gsap.utils.toArray<HTMLElement>(".stat-card");
      statCards.forEach((card) => {
        const icon = card.querySelector(".stat-icon");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.03,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotate: 15,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
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
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="welcome-section mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
              <span className="text-3xl">👋</span>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              You've learned 3.5 hours this week. Keep it up!
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10" style={{ perspective: "1000px" }}>
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`stat-card glass-card rounded-xl p-5 cursor-pointer bg-gradient-to-br ${stat.bg}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`stat-icon w-5 h-5 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground">
                  <CountUpNumber end={stat.value} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Enrolled Courses */}
            <div ref={coursesRef} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-foreground">Continue Learning</h2>
                <Link to="/courses">
                  <Button variant="ghost" size="sm" className="group">
                    See All the Goods 👀 <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.title}
                    className="course-card glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-primary/30 transition-all"
                  >
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {course.instructor} · Next: {course.nextLesson}
                      </p>
                      <div className="flex items-center gap-3">
                        <Progress value={course.progress} className="flex-1 h-2" />
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">{course.progress}%</span>
                      </div>
                    </div>
                    <Button size="sm" className="shrink-0">Back to the Grind 💪</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar-section space-y-6">
              <div className="sidebar-card glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Weekly Goal
                </h3>
                <div className="text-center mb-4">
                  <div className="font-display text-3xl font-bold text-foreground">
                    <CountUpNumber end={3} suffix=".5" /> / 7h
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">hours this week</p>
                </div>
                <Progress value={50} className="h-2.5 mb-2" />
                <p className="text-xs text-muted-foreground text-center">3.5 more hours to reach your goal</p>
              </div>

              <div className="sidebar-card glass-card rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" /> Recent Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    { badge: "🔥", title: "10-Day Streak", date: "Today" },
                    { badge: "📚", title: "First Certificate", date: "3 days ago" },
                    { badge: "⭐", title: "Quiz Master", date: "1 week ago" },
                  ].map((ach, i) => (
                    <div
                      key={ach.title}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <span className="text-2xl">{ach.badge}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{ach.title}</p>
                        <p className="text-xs text-muted-foreground">{ach.date}</p>
                      </div>
                    </div>
                  ))}
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

export default Dashboard;
