import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Target, CheckCircle2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockTests = [
  { id: "1", title: "AWS Solutions Architect Associate", questions: 65, duration: "130 min", difficulty: "Intermediate", category: "Cloud", attempts: 3, bestScore: 82 },
  { id: "2", title: "CompTIA Security+ SY0-701", questions: 90, duration: "90 min", difficulty: "Intermediate", category: "Security", attempts: 1, bestScore: null },
  { id: "3", title: "Google Cloud Professional Engineer", questions: 50, duration: "120 min", difficulty: "Advanced", category: "Cloud", attempts: 0, bestScore: null },
  { id: "4", title: "Microsoft Azure Fundamentals AZ-900", questions: 40, duration: "60 min", difficulty: "Beginner", category: "Cloud", attempts: 5, bestScore: 94 },
  { id: "5", title: "Kubernetes CKAD", questions: 19, duration: "120 min", difficulty: "Advanced", category: "DevOps", attempts: 2, bestScore: 68 },
  { id: "6", title: "Python Data Science Assessment", questions: 50, duration: "60 min", difficulty: "Intermediate", category: "Data Science", attempts: 0, bestScore: null },
];

const testCategories = ["All", "Cloud", "Security", "DevOps", "Data Science"];

const MockTests = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = mockTests.filter((t) => activeCategory === "All" || t.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Mock Tests</h1>
            <p className="text-muted-foreground">Practice with industry-standard certification exams</p>
          </motion.div>

          <div className="flex gap-2 flex-wrap mb-8">
            {testCategories.map((cat) => (
              <Button key={cat} variant={activeCategory === cat ? "default" : "secondary"} size="sm" onClick={() => setActiveCategory(cat)}>
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary">{test.category}</Badge>
                  <span className="text-xs text-muted-foreground">{test.difficulty}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-3">{test.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {test.questions} Q</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {test.duration}</span>
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
                    <p className="text-xs text-muted-foreground mt-1">{test.attempts} attempt(s)</p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Not attempted yet
                  </p>
                )}

                <Button className="w-full" size="sm">
                  {test.attempts > 0 ? "Retake Test" : "Start Test"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MockTests;
