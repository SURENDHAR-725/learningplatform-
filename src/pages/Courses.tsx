import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedText from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { mockCourses, categories } from "@/data/courses";

gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = mockCourses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".page-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Search bar
      gsap.fromTo(
        ".search-section",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power3.out" }
      );

      // Filter buttons
      gsap.fromTo(
        ".filter-btn",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.3,
          ease: "back.out(1.7)",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".course-card-wrapper");
    
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [activeCategory, search]);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div ref={headerRef} className="page-header mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              <AnimatedText text="Explore Courses" animation="wave" />
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Discover courses taught by industry experts
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="search-section relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
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
          </div>

          {/* Courses Grid */}
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <div key={course.id} className="course-card-wrapper">
                <CourseCard course={course} index={i} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg mb-2">No courses found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
