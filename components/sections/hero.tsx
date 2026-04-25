"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users, TrendingUp } from "lucide-react";

export function Hero() {
  const { language, setIsQuizOpen } = useApp();
  const t = translations[language];

  const scrollToVideo = () => {
    document.getElementById("video-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Consultant Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8 animate-fade-in">
          <span className="text-sm text-muted-foreground">{t.consultantBadge}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm font-medium text-foreground">Gopu Halder</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm text-secondary">{t.guidedCount}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-6 text-balance animate-fade-in-up">
          {t.heroHeadline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {t.heroSubheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Button
            size="xl"
            onClick={() => setIsQuizOpen(true)}
            className="group w-full sm:w-auto"
          >
            {t.heroCta}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="xl"
            onClick={scrollToVideo}
            className="w-full sm:w-auto"
          >
            <Play className="w-5 h-5" />
            {t.heroSecondaryCta}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-semibold">{t.stats.guided}</div>
              <div className="text-sm text-muted-foreground">{t.stats.guidedLabel}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-semibold">{t.stats.saved}</div>
              <div className="text-sm text-muted-foreground">{t.stats.savedLabel}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Star className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-semibold">{t.stats.rating}</div>
              <div className="text-sm text-muted-foreground">{t.stats.ratingLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
