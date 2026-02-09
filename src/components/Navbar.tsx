import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";

const navItems = [
  { label: "Courses", href: "/courses" },
  { label: "Mock Tests", href: "/mock-tests" },
  { label: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline();
      
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".nav-link",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.3"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    }, navRef);

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Logo hover animation
  useEffect(() => {
    if (!logoRef.current) return;

    const logo = logoRef.current;
    const icon = logo.querySelector(".logo-icon");

    const handleEnter = () => {
      gsap.to(icon, {
        rotate: 360,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    logo.addEventListener("mouseenter", handleEnter);
    logo.addEventListener("mouseleave", handleLeave);

    return () => {
      logo.removeEventListener("mouseenter", handleEnter);
      logo.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileOpen) {
      gsap.fromTo(
        ".mobile-menu",
        { opacity: 0, height: 0 },
        { opacity: 1, height: "auto", duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        ".mobile-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1, ease: "power2.out" }
      );
    }
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-card border-b shadow-lg backdrop-blur-xl"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/">
          <div ref={logoRef} className="flex items-center gap-2 font-display text-xl font-bold text-foreground cursor-pointer">
            <div className="logo-icon w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            NexusLearn
          </div>
        </Link>

        <div ref={linksRef} className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link">
              <MagneticButton strength={0.2}>
                <Button
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="relative overflow-hidden group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />
                </Button>
              </MagneticButton>
            </Link>
          ))}
        </div>

        <div ref={actionsRef} className="hidden md:flex items-center gap-2">
          <Link to="/login">
            <MagneticButton strength={0.2}>
              <Button variant="ghost" size="sm">Log in</Button>
            </MagneticButton>
          </Link>
          <Link to="/signup">
            <MagneticButton strength={0.3}>
              <Button size="sm" className="relative overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </MagneticButton>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu md:hidden border-t border-border bg-card px-4 py-4 space-y-2 overflow-hidden">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="mobile-link block">
              <Button variant="ghost" className="w-full justify-start">{item.label}</Button>
            </Link>
          ))}
          <div className="flex gap-2 pt-2 mobile-link">
            <Link to="/login" className="flex-1">
              <Button variant="outline" className="w-full">Log in</Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
