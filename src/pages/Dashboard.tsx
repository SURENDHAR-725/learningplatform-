import { motion } from "framer-motion";
import { BookOpen, Clock, Award, TrendingUp, Play, ArrowRight, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const statCards = [
  { label: "Courses Enrolled", value: "6", icon: BookOpen, color: "text-primary" },
  { label: "Hours Learned", value: "84", icon: Clock, color: "text-info" },
  { label: "Certificates", value: "2", icon: Award, color: "text-accent" },
  { label: "Current Streak", value: "12 days", icon: Flame, color: "text-destructive" },
];

const enrolledCourses = [
  { title: "AWS Solutions Architect", progress: 72, instructor: "Sarah Chen", nextLesson: "VPC Deep Dive" },
  { title: "Full-Stack React & Node.js", progress: 45, instructor: "Marcus Rodriguez", nextLesson: "Auth with JWT" },
  { title: "Machine Learning with Python", progress: 18, instructor: "Dr. Aisha Patel", nextLesson: "Neural Networks" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Welcome back, Alex! 👋</h1>
          <p className="text-muted-foreground">You've learned 3.5 hours this week. Keep it up!</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">Continue Learning</h2>
              <Link to="/courses">
                <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </Link>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((course, i) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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
                  <Button size="sm" className="shrink-0">Continue</Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Weekly Goal
              </h3>
              <div className="text-center mb-4">
                <div className="font-display text-3xl font-bold text-foreground">3.5 / 7h</div>
                <p className="text-xs text-muted-foreground mt-1">hours this week</p>
              </div>
              <Progress value={50} className="h-2.5 mb-2" />
              <p className="text-xs text-muted-foreground text-center">3.5 more hours to reach your goal</p>
            </div>

            <div className="glass-card rounded-xl p-5">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" /> Recent Achievements
              </h3>
              <div className="space-y-3">
                {[
                  { badge: "🔥", title: "10-Day Streak", date: "Today" },
                  { badge: "📚", title: "First Certificate", date: "3 days ago" },
                  { badge: "⭐", title: "Quiz Master", date: "1 week ago" },
                ].map((ach) => (
                  <div key={ach.title} className="flex items-center gap-3">
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

export default Dashboard;
