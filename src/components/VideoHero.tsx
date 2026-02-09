import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the video container entrance
      gsap.fromTo(
        ".video-wrapper",
        { 
          opacity: 0, 
          scale: 0.9,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // Animate the floating elements
      gsap.to(".float-element-1", {
        y: -15,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-element-2", {
        y: 15,
        rotation: -5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-element-3", {
        y: -20,
        rotation: 3,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Glow pulse animation
      gsap.to(".video-glow", {
        opacity: 0.6,
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto mt-12">
      {/* Background glow effect */}
      <div className="video-glow absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-3xl -z-10 scale-110" />
      
      {/* Main video wrapper */}
      <div className="video-wrapper relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-gradient-to-br from-gray-900 to-gray-950">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-x -z-10" />
        
        {/* Video element with animated learning content */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
          {/* Animated learning visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central animated element */}
            <div className="relative w-full h-full">
              {/* Animated grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
              
              {/* Animated learning icons and elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central brain/learning hub */}
                <div className="relative">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50">
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute -top-4 -right-4 float-element-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500/80 to-blue-600/80 flex items-center justify-center shadow-lg shadow-blue-500/30 backdrop-blur">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-2 -left-6 float-element-2">
                    <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl bg-gradient-to-br from-green-500/80 to-emerald-600/80 flex items-center justify-center shadow-lg shadow-green-500/30 backdrop-blur">
                      <svg className="w-7 h-7 md:w-9 md:h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 -right-16 md:-right-20 float-element-3">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-orange-500/80 to-amber-600/80 flex items-center justify-center shadow-lg shadow-orange-500/30 backdrop-blur">
                      <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute -top-8 -left-12 float-element-1" style={{ animationDelay: "1s" }}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-500/80 to-rose-600/80 flex items-center justify-center shadow-lg shadow-pink-500/30 backdrop-blur">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                    <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="1" />
                    <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="20%" y1="30%" x2="45%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" />
                <line x1="80%" y1="35%" x2="55%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
                <line x1="25%" y1="70%" x2="45%" y2="55%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "1s" }} />
                <line x1="75%" y1="65%" x2="55%" y2="55%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
              </svg>
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Play/Pause overlay button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>
        </div>
        
        {/* Bottom info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-sm md:text-lg">Experience Interactive Learning</h3>
              <p className="text-gray-300 text-xs md:text-sm mt-1">AI-powered courses • Real-time feedback • Personalized paths</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full text-white hover:bg-white/10"
              >
                {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl" />
    </div>
  );
};

export default VideoHero;
