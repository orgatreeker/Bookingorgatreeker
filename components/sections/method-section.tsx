"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { Search, Layers, Target } from "lucide-react";

export function MethodSection() {
  const { language } = useApp();
  const t = translations[language];

  const steps = [
    {
      icon: Search,
      title: t.step1Title,
      subtitle: t.step1Desc,
      detail: t.step1Detail,
      number: "01",
    },
    {
      icon: Layers,
      title: t.step2Title,
      subtitle: t.step2Desc,
      detail: t.step2Detail,
      number: "02",
    },
    {
      icon: Target,
      title: t.step3Title,
      subtitle: t.step3Desc,
      detail: t.step3Detail,
      number: "03",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            {t.methodTitle}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.methodSubtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-2 text-6xl font-serif font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative mb-6 inline-flex p-3 rounded-xl bg-primary/10 text-primary">
                <step.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-secondary font-medium mb-3">{step.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
