"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";

export function AboutSection() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Photo placeholder */}
          <div className="md:col-span-2">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-muted/50 mb-4 flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-primary">G</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold">Gopu Halder</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.aboutSubtitle}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
              {t.aboutTitle}
            </h2>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
              <p>{t.aboutText3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
