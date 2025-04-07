
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileText, Image, Mic, Volume2 } from "lucide-react";

const tools = [
  {
    name: "Ultimate AI",
    description: "Personalized AI tutor that adapts to individual learning styles and needs.",
    icon: <Brain className="h-6 w-6" />,
    link: "#",
    color: "from-blue-500 to-indigo-600"
  },
  {
    name: "Text-to-Speech",
    description: "Convert written content to natural-sounding audio for auditory learners.",
    icon: <Volume2 className="h-6 w-6" />,
    link: "#",
    color: "from-green-500 to-emerald-600"
  },
  {
    name: "Speech-to-Text",
    description: "Transform spoken words into written text for easier note-taking and review.",
    icon: <Mic className="h-6 w-6" />,
    link: "#",
    color: "from-purple-500 to-violet-600"
  },
  {
    name: "PDF Summarization",
    description: "Extract key information from documents to improve comprehension.",
    icon: <FileText className="h-6 w-6" />,
    link: "#",
    color: "from-red-500 to-pink-600"
  },
  {
    name: "Image Generator",
    description: "Create custom visual aids to enhance understanding of complex topics.",
    icon: <Image className="h-6 w-6" />,
    link: "#",
    color: "from-amber-500 to-orange-600"
  }
];

export const ToolsSection = () => {
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
    <section id="tools" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4">
            Explore Our <span className="gradient-text">Accessibility</span> Tools
          </h2>
          <p className="animate-on-scroll text-foreground/80">
            Each tool is designed to address specific learning challenges and can
            be used independently or in combination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="animate-on-scroll glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tool.color} text-white mr-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                </div>
                <p className="text-foreground/70 mb-4">{tool.description}</p>
                <Button variant="ghost" className="group" asChild>
                  <a href={tool.link}>
                    Access Tool
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
