"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WistiaEmbed } from "@/components/ui/wistia-embed";

// Presales video - this would be the consultant introduction video
const PRESALES_VIDEO_ID = "q2fgrmv8ze";

export function VideoSection() {
  const { language, setIsQuizOpen } = useApp();
  const t = translations[language];

  return (
    <section id="video-section" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            {t.videoSectionTitle}
          </h2>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5">
          <WistiaEmbed mediaId={PRESALES_VIDEO_ID} />
        </div>

        {/* Trigger Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-xl bg-muted/30 border border-border">
          <div className="text-center sm:text-left">
            <div className="font-medium text-lg">{t.videoTrigger}</div>
            <div className="text-sm text-muted-foreground">{t.videoTriggerSub}</div>
          </div>
          <Button onClick={() => setIsQuizOpen(true)} className="group">
            {t.heroCta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
