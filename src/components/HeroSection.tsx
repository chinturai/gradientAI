
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToNextSection = () => {
    const nextSection = sectionRef.current?.nextElementSibling;
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background gradient elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero title with staggered animation */}
          <div className="text-center mb-8">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <span className="block overflow-hidden">
                <span className="block transform transition-transform duration-1000 delay-100 ease-out" 
                      style={{ transform: isVisible ? "translateY(0)" : "translateY(100%)" }}>
                  Making Education 
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="gradient-text block transform transition-transform duration-1000 delay-300 ease-out"
                      style={{ transform: isVisible ? "translateY(0)" : "translateY(100%)" }}>
                  Accessible
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block transform transition-transform duration-1000 delay-500 ease-out"
                      style={{ transform: isVisible ? "translateY(0)" : "translateY(100%)" }}>
                  for Everyone
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle with fade-in animation */}
          <p className={`text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Enable is an AI-powered assistant that helps students with visual,
            hearing, and cognitive disabilities to learn more effectively and
            independently.
          </p>

          {/* CTA buttons with scale animation */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Button size="lg" className="rounded-full px-10 py-8 text-lg font-medium group hover:shadow-lg hover:shadow-primary/30 transition-all">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-8 text-lg font-medium group hover:shadow-md transition-all border-2"
            >
              View Demo
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Hero image/illustration */}
          <div className={`relative mt-8 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-400/30 rounded-3xl blur-3xl -z-10 transform translate-y-1/4 scale-75 opacity-70"></div>
            <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gray-900 p-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6 md:p-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="h-[350px] md:h-[450px] rounded-lg bg-gradient-to-br from-primary/10 to-purple-400/10 flex items-center justify-center relative overflow-hidden">
                  {/* Animated floating elements */}
                  <div className="absolute w-24 h-24 bg-primary/20 rounded-full top-10 left-10 animate-bounce-slow"></div>
                  <div className="absolute w-16 h-16 bg-purple-400/20 rounded-full bottom-12 right-12 animate-bounce-slow animation-delay-1000"></div>
                  
                  <div className="text-center p-8 relative z-10 transition-all transform hover:scale-105 duration-300">
                    <div className="inline-block p-6 mb-6 rounded-full bg-primary/20 text-primary">
                      <svg
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 8.5V12M17 8.5V12M9 16.5C9 16.5 10 17.5 12 17.5C14 17.5 15 16.5 15 16.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">
                      AI-Powered Learning Assistant
                    </h3>
                    <p className="text-foreground/70 text-lg max-w-lg mx-auto">
                      Personalized support for students with disabilities, making
                      education more inclusive and accessible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <button 
              onClick={scrollToNextSection}
              className="flex flex-col items-center text-foreground/50 hover:text-primary transition-colors"
              aria-label="Scroll to next section"
            >
              <span className="text-sm font-medium mb-2">Discover More</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
