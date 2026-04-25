"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCtaSection() {
  const { language, setIsQuizOpen } = useApp();
  const t = translations[language];

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 text-balance">
              {t.finalCtaTitle}
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                onClick={() => setIsQuizOpen(true)}
                className="group w-full sm:w-auto"
              >
                {t.finalCtaButton}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToProducts}
                className="w-full sm:w-auto"
              >
                {t.finalCtaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
