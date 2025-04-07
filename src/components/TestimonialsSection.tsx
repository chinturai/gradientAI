
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Enable has been transformative for my son who has dyslexia. The text-to-speech functionality lets him consume content at his own pace, and the AI tutor adapts to his learning style.",
    name: "Sarah Johnson",
    role: "Parent",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote:
      "As a teacher, I've seen remarkable improvements in classroom engagement since introducing Enable. Students with different abilities can now participate equally in discussions.",
    name: "Mark Thompson",
    role: "Special Education Teacher",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote:
      "The PDF summarization tool has been a game-changer for me. With my visual impairment, going through long documents used to be exhausting, but now I can quickly grasp the key points.",
    name: "Lisa Chen",
    role: "University Student",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    quote:
      "I never thought I could pursue higher education with my hearing disability, but Enable's speech-to-text feature has made lectures accessible to me for the first time.",
    name: "David Rodriguez",
    role: "Graduate Student",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

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
    <section id="testimonials" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="animate-on-scroll text-foreground/80">
            Hear from students, parents, and educators who have experienced the
            transformative power of Enable.
          </p>
        </div>

        <div className="animate-on-scroll max-w-4xl mx-auto relative">
          <div className="glass-card rounded-xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <blockquote className="text-lg md:text-xl italic mb-4">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <div className="font-bold">{testimonials[currentIndex].name}</div>
                    <div className="text-foreground/70 text-sm">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                size="icon"
                variant={index === currentIndex ? "default" : "outline"}
                onClick={() => setCurrentIndex(index)}
                className="rounded-full h-3 w-3 p-0"
                aria-label={`Testimonial ${index + 1}`}
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </Button>
            ))}
            <Button
              size="icon"
              variant="outline"
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
