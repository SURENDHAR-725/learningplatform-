import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Sparkles, Users, Award, BookOpen, Zap, Brain, Trophy, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedText from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";
import ParallaxSection from "@/components/ParallaxSection";
import CountUpNumber from "@/components/CountUpNumber";
import VideoHero from "@/components/VideoHero";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, suffix: "K+", label: "Active Learners" },
  { value: 1200, suffix: "+", label: "Courses" },
  { value: 10, suffix: "K+", label: "Mock Tests" },
  { value: 95, suffix: "%", label: "Success Rate" },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Animate orbs
      gsap.to(orb1Ref.current, {
        x: 50,
        y: 30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        x: -40,
        y: -40,
        scale: 1.1,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Hero content entrance
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 40, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "back.out(1.7)" 
          },
          "-=0.3"
        );

      // Parallax on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(orb1Ref.current, {
          x: x * 2,
          y: y * 2,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(orb2Ref.current, {
          x: -x * 1.5,
          y: -y * 1.5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Animated orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px]"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div ref={contentRef} className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary mb-8">
            <Sparkles className="w-4 h-4 animate-pulse" />
            AI-Powered Learning Platform
          </div>

          <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Master Skills That </span>
            <br />
            <span className="text-primary">Shape Careers</span>
          </h1>

          <p
            className="hero-subtitle text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-gray-300"
          >
            From certification prep to real-world projects — learn with AI guidance,
            practice with 10,000+ mock tests, and build a portfolio that gets you hired.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link to="/courses">
                <Button variant="hero" size="lg" className="text-base px-8 h-12 group">
                  Let's Get This Bread 🍞
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                <Button variant="hero-outline" size="lg" className="text-base px-8 h-12 group">
                  <Play className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" /> Sneak Peek 👀
                </Button>
              </a>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={stat.label} className="hero-stat text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient-primary">
                  <CountUpNumber end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm mt-1" style={{ color: "hsl(220 12% 55%)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Video Animation Section */}
          <VideoHero />
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: Brain,
    title: "AI Study Companion",
    description: "Get 24/7 personalized help from an AI that knows your courses inside and out.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: BookOpen,
    title: "Mock Test Library",
    description: "10,000+ practice questions for AWS, GCP, Azure, CompTIA and more certifications.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Study rooms, peer reviews, discussion forums, and live Q&A with instructors.",
    gradient: "from-info/20 to-info/5",
  },
  {
    icon: Trophy,
    title: "Career Integration",
    description: "Skill gap analysis, interview prep, and direct connections to hiring partners.",
    gradient: "from-success/20 to-success/5",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        ".features-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-header",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate feature cards
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 80, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add hover animations
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");
      cards.forEach((card) => {
        const icon = card.querySelector(".feature-icon");
        
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 360,
              scale: 1.2,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <ParallaxSection className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" speed={0.2} />
      <ParallaxSection className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" speed={0.3} direction="down" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="features-header text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <AnimatedText text="Succeed" className="text-gradient-primary" animation="bounce" />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete ecosystem designed to take you from learning to earning.
          </p>
        </div>

        <div className="features-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1000px" }}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`feature-card glass-card rounded-xl p-6 cursor-pointer group bg-gradient-to-br ${feature.gradient}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="feature-icon w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const trustedLogos = [
  { name: "Google", icon: Zap },
  { name: "Amazon", icon: Target },
  { name: "Microsoft", icon: Award },
  { name: "Meta", icon: Brain },
  { name: "Netflix", icon: Trophy },
  { name: "Spotify", icon: Sparkles },
];

const TrustedBySection = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const width = track.scrollWidth / 2;

    gsap.to(track, {
      x: -width,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm text-muted-foreground">
          Trusted by teams at leading companies
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        <div ref={trackRef} className="flex gap-16 whitespace-nowrap">
          {[...trustedLogos, ...trustedLogos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <logo.icon className="w-6 h-6" />
              <span className="font-display font-semibold text-xl">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      // Floating particles
      const particles = gsap.utils.toArray<HTMLElement>(".cta-particle");
      particles.forEach((p, i) => {
        gsap.to(p, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="cta-particle absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="cta-content text-center max-w-3xl mx-auto">
          <h2
            className="font-display text-3xl md:text-5xl font-bold mb-6"
            style={{ color: "hsl(220 20% 95%)" }}
          >
            Ready to Transform Your{" "}
            <AnimatedText text="Career?" className="text-gradient-primary" animation="gradient" />
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-8"
            style={{ color: "hsl(220 12% 65%)" }}
          >
            Join 50,000+ learners already building their future with NexusLearn.
          </p>
          <MagneticButton strength={0.5}>
            <Link to="/signup">
              <Button variant="hero" size="lg" className="text-base px-10 h-12 group">
                Join the Cool Kids Club 😎
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export { HeroSection, FeaturesSection, TrustedBySection, CTASection };
