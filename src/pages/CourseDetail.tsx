import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Clock, BookOpen, Play, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockCourses } from "@/data/courses";

const mockSyllabus = [
  { title: "Getting Started", lessons: 8, duration: "1h 20m" },
  { title: "Core Concepts", lessons: 14, duration: "3h 45m" },
  { title: "Advanced Techniques", lessons: 12, duration: "4h 10m" },
  { title: "Real-World Projects", lessons: 6, duration: "5h 30m" },
  { title: "Certification Prep", lessons: 10, duration: "2h 50m" },
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = mockCourses.find((c) => c.id === id);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="hero-gradient py-16">
          <div className="container mx-auto px-4">
            <Link to="/courses" className="inline-flex items-center gap-1 text-sm mb-6 hover:text-primary transition-colors" style={{ color: "hsl(220 12% 65%)" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(220 20% 95%)" }}>
                {course.title}
              </h1>
              <p className="text-lg mb-6" style={{ color: "hsl(220 12% 65%)" }}>
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: "hsl(220 12% 55%)" }}>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-primary" /> {course.rating} rating
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {course.students.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {course.duration} total
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> {course.lessons} lessons
                </span>
              </div>
              <div className="mt-4 text-sm" style={{ color: "hsl(220 12% 55%)" }}>
                Created by <span className="text-primary font-medium">{course.instructor}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Build production-ready applications",
                    "Understand core architecture patterns",
                    "Pass certification exams confidently",
                    "Deploy and scale in the cloud",
                    "Implement security best practices",
                    "Write clean, maintainable code",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">Course Syllabus</h2>
                <div className="space-y-3">
                  {mockSyllabus.map((section, i) => (
                    <div key={i} className="glass-card rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{section.title}</p>
                          <p className="text-xs text-muted-foreground">{section.lessons} lessons · {section.duration}</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <div className="text-3xl font-display font-bold text-foreground mb-1">${course.price}</div>
                <p className="text-sm text-muted-foreground mb-6">Lifetime access · Certificate included</p>
                <Button className="w-full mb-3" size="lg">Enroll Now</Button>
                <Button variant="outline" className="w-full" size="lg">Add to Wishlist</Button>
                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Duration</span><span className="text-foreground">{course.duration}</span></div>
                  <div className="flex justify-between"><span>Lessons</span><span className="text-foreground">{course.lessons}</span></div>
                  <div className="flex justify-between"><span>Level</span><span className="text-foreground">{course.level}</span></div>
                  <div className="flex justify-between"><span>Certificate</span><span className="text-foreground">Yes</span></div>
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
