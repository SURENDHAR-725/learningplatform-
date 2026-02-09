import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Users, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "1,200+", label: "Courses" },
  { value: "10K+", label: "Mock Tests" },
  { value: "95%", label: "Success Rate" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
    {/* Ambient orbs */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-float" />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float-delayed" />

    <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning Platform
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6"
          style={{ color: "hsl(220 20% 95%)" }}
        >
          Master Skills That{" "}
          <span className="text-gradient-primary">Shape Careers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "hsl(220 12% 65%)" }}
        >
          From certification prep to real-world projects — learn with AI guidance,
          practice with 10,000+ mock tests, and build a portfolio that gets you hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/courses">
            <Button variant="hero" size="lg" className="text-base px-8 h-12">
              Start Learning Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Button variant="hero-outline" size="lg" className="text-base px-8 h-12">
            <Play className="w-4 h-4 mr-1" /> Watch Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient-primary">
                {stat.value}
              </div>
              <div className="text-sm mt-1" style={{ color: "hsl(220 12% 55%)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: Sparkles,
    title: "AI Study Companion",
    description: "Get 24/7 personalized help from an AI that knows your courses inside and out.",
  },
  {
    icon: BookOpen,
    title: "Mock Test Library",
    description: "10,000+ practice questions for AWS, GCP, Azure, CompTIA and more certifications.",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Study rooms, peer reviews, discussion forums, and live Q&A with instructors.",
  },
  {
    icon: Award,
    title: "Career Integration",
    description: "Skill gap analysis, interview prep, and direct connections to hiring partners.",
  },
];

const FeaturesSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Everything You Need to <span className="text-gradient-primary">Succeed</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A complete ecosystem designed to take you from learning to earning.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 hero-gradient relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/5" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6" style={{ color: "hsl(220 20% 95%)" }}>
          Ready to Transform Your Career?
        </h2>
        <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "hsl(220 12% 65%)" }}>
          Join 50,000+ learners already building their future with NexusLearn.
        </p>
        <Link to="/signup">
          <Button variant="hero" size="lg" className="text-base px-10 h-12">
            Get Started — It's Free <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export { HeroSection, FeaturesSection, CTASection };
