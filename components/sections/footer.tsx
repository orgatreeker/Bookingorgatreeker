"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";

export function Footer() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>{t.footerText}</div>
        <div>{t.footerConsultant}</div>
      </div>
    </footer>
  );
}
