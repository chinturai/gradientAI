
import { useEffect, useRef } from "react";
import { Accessibility, Book, Sparkles, Volume2 } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Ultimate AI",
    description:
      "Advanced AI that adapts to individual learning needs and preferences."
  },
  {
    icon: <Volume2 className="h-6 w-6" />,
    title: "Text-to-Speech & Speech-to-Text",
    description:
      "Convert written content to audio and spoken words to text with high accuracy."
  },
  {
    icon: <Book className="h-6 w-6" />,
    title: "PDF Summarization",
    description:
      "Automatically extract key points from PDFs for easier comprehension."
  },
  {
    icon: <Accessibility className="h-6 w-6" />,
    title: "Image Generator",
    description:
      "Create visual representations to enhance understanding of complex concepts."
  }
];

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 bg-accent/50 dark:bg-accent/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">Tools</span> for Inclusive
            Learning
          </h2>
          <p className="animate-on-scroll text-foreground/80">
            Enable combines multiple accessibility technologies to create a
            seamless learning experience for all students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-on-scroll glass-card rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/20 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
