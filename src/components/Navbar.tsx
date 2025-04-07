
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">Enable</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            <a
              href="#features"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#tools"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Tools
            </a>
            <a
              href="#accessibility"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Accessibility
            </a>
            <a
              href="#testimonials"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button className="rounded-full">Get Started</Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t dark:border-gray-800 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#features"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#tools"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tools
            </a>
            <a
              href="#accessibility"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accessibility
            </a>
            <a
              href="#testimonials"
              className="text-foreground/80 hover:text-primary py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button className="w-full rounded-full">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};
