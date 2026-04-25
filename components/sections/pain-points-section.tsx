"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { AlertCircle } from "lucide-react";

export function PainPointsSection() {
  const { language } = useApp();
  const t = translations[language];

  const painPoints = [t.pain1, t.pain2, t.pain3, t.pain4];

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            {t.painTitle}
          </h2>
        </div>

        {/* Pain Points Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {painPoints.map((pain, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-secondary/10">
                <AlertCircle className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-foreground/90">{pain}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
