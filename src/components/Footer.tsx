import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Github, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { title: "Platform", links: ["Courses", "Mock Tests", "Career Hub", "Pricing"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Support", links: ["Help Center", "Community", "Privacy", "Terms"] },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Mail, label: "Email" },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate footer sections
      gsap.fromTo(
        ".footer-section",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate footer links
      gsap.fromTo(
        ".footer-link",
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.02,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Social icons
      gsap.fromTo(
        ".social-icon",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Hover effects for social icons
      const icons = gsap.utils.toArray<HTMLElement>(".social-icon");
      icons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            rotate: 10,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 footer-section">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              NexusLearn
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              The next-generation learning platform powered by AI. Master skills, earn certifications, and advance your career.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="max-w-[200px]" />
                <Button size="icon" className="shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title} className="footer-section">
              <h4 className="font-display font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="footer-link text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors inline-block">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NexusLearn. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <span
                key={social.label}
                className="social-icon w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
