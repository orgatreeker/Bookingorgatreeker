"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { language } = useApp();
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            {t.faqTitle}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {t.faq.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium pr-4">{item.q}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
