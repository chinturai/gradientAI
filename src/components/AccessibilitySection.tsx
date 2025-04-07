
import { useEffect, useRef } from "react";
import { Eye, Brain, Headphones } from "lucide-react";

const accessibilityTypes = [
  {
    title: "Visual Disabilities",
    icon: <Eye className="h-6 w-6" />,
    benefits: [
      "Text-to-speech narration of content",
      "High contrast mode for easier reading",
      "Descriptive image alternatives",
      "Customizable font sizes and types"
    ]
  },
  {
    title: "Hearing Disabilities",
    icon: <Headphones className="h-6 w-6" />,
    benefits: [
      "Speech-to-text transcription",
      "Visual cues and notifications",
      "Captioned educational videos",
      "Sign language translation support"
    ]
  },
  {
    title: "Cognitive Disabilities",
    icon: <Brain className="h-6 w-6" />,
    benefits: [
      "Simplified content summaries",
      "Structured learning paths",
      "Memory aids and visual organizers",
      "Personalized pace of instruction"
    ]
  }
];

export const AccessibilitySection = () => {
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
      id="accessibility"
      ref={sectionRef}
      className="py-20 bg-accent/50 dark:bg-accent/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4">
            Benefits for <span className="gradient-text">All Learners</span>
          </h2>
          <p className="animate-on-scroll text-foreground/80">
            Enable is specifically designed to support students with different
            types of disabilities, making education truly inclusive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessibilityTypes.map((type, index) => (
            <div
              key={index}
              className="animate-on-scroll glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {type.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                {type.title}
              </h3>
              <ul className="space-y-3">
                {type.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
