import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Target, CheckCircle2, Zap, Trophy, BarChart3, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedText from "@/components/AnimatedText";
import AIQuizGenerator from "@/components/AIQuizGenerator";

gsap.registerPlugin(ScrollTrigger);

const mockTests = [
  { id: "1", title: "AWS Solutions Architect Associate", questions: 65, duration: "130 min", difficulty: "Intermediate", category: "Cloud", attempts: 3, bestScore: 82 },
  { id: "2", title: "CompTIA Security+ SY0-701", questions: 90, duration: "90 min", difficulty: "Intermediate", category: "Security", attempts: 1, bestScore: null },
  { id: "3", title: "Google Cloud Professional Engineer", questions: 50, duration: "120 min", difficulty: "Advanced", category: "Cloud", attempts: 0, bestScore: null },
  { id: "4", title: "Microsoft Azure Fundamentals AZ-900", questions: 40, duration: "60 min", difficulty: "Beginner", category: "Cloud", attempts: 5, bestScore: 94 },
  { id: "5", title: "Kubernetes CKAD", questions: 19, duration: "120 min", difficulty: "Advanced", category: "DevOps", attempts: 2, bestScore: 68 },
  { id: "6", title: "Python Data Science Assessment", questions: 50, duration: "60 min", difficulty: "Intermediate", category: "Data Science", attempts: 0, bestScore: null },
];

const testCategories = ["All", "Cloud", "Security", "DevOps", "Data Science"];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-success/15 text-success border-success/20",
  Intermediate: "bg-info/15 text-info border-info/20",
  Advanced: "bg-accent/15 text-accent border-accent/20",
};

const MockTests = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = mockTests.filter((t) => activeCategory === "All" || t.category === activeCategory);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".page-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Stats animation
      gsap.fromTo(
        ".header-stat",
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      );

      // Filter buttons
      gsap.fromTo(
        ".filter-btn",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".test-card");
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.9, rotateX: -10 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      }
    );

    // Add hover effects
    cards.forEach((card) => {
      const btn = card.querySelector("button");
      
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          boxShadow: "0 25px 50px -10px rgba(0,0,0,0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
        if (btn) {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.2,
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
        if (btn) {
          gsap.to(btn, {
            scale: 1,
            duration: 0.2,
          });
        }
      });
    });
  }, [activeCategory]);

  const totalTests = mockTests.length;
  const attempted = mockTests.filter((t) => t.attempts > 0).length;
  const avgScore = Math.round(
    mockTests.filter((t) => t.bestScore).reduce((acc, t) => acc + (t.bestScore || 0), 0) /
      mockTests.filter((t) => t.bestScore).length
  );

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div ref={headerRef} className="page-header mb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <AnimatedText text="Mock Tests" animation="wave" />
                </h1>
                <p className="text-muted-foreground">Practice with industry-standard certification exams</p>
              </div>
              <div className="flex gap-4">
                <div className="header-stat glass-card rounded-lg px-4 py-3 text-center">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Target className="w-4 h-4" />
                    <span className="font-display font-bold">{totalTests}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Total Tests</p>
                </div>
                <div className="header-stat glass-card rounded-lg px-4 py-3 text-center">
                  <div className="flex items-center gap-2 text-success mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-display font-bold">{attempted}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Attempted</p>
                </div>
                <div className="header-stat glass-card rounded-lg px-4 py-3 text-center">
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <Trophy className="w-4 h-4" />
                    <span className="font-display font-bold">{avgScore}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="ai-quiz" className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="ai-quiz" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Quiz Generator
              </TabsTrigger>
              <TabsTrigger value="certification" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Certification Tests
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-quiz">
              <AIQuizGenerator />
            </TabsContent>

            <TabsContent value="certification">
              {/* Filters */}
              <div ref={filtersRef} className="flex gap-2 flex-wrap mb-8">
                {testCategories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className="filter-btn"
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Tests Grid */}
              <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
                {filtered.map((test) => (
                  <div
                    key={test.id}
                    className="test-card glass-card rounded-xl p-6 cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{test.category}</Badge>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${difficultyColors[test.difficulty]}`}>
                    {test.difficulty}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-3 line-clamp-2">{test.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5" /> {test.questions} Q
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {test.duration}
                  </span>
                </div>

                {test.bestScore !== null ? (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Best Score</span>
                      <span className={`font-medium ${test.bestScore >= 80 ? "text-success" : test.bestScore >= 60 ? "text-primary" : "text-destructive"}`}>
                        {test.bestScore}%
                      </span>
                    </div>
                    <Progress value={test.bestScore} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {test.attempts} attempt(s)
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Not attempted yet
                  </p>
                )}

                <Button className="w-full" size="sm">
                  {test.attempts > 0 ? "Redemption Arc Time! 🔄" : "Challenge Accepted! 💪"}
                </Button>
              </div>
            ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockTests;
