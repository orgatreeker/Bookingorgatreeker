"use client";

import { useApp } from "@/components/providers/app-context";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { language, setLanguage } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="font-serif text-xl font-semibold">
          <span className="text-primary">Orga</span>treeker
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => setLanguage("en")}
            className={cn(
              "px-2 py-1 text-sm rounded transition-colors",
              language === "en"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            EN
          </button>
          <span className="text-muted-foreground">/</span>
          <button
            onClick={() => setLanguage("hi")}
            className={cn(
              "px-2 py-1 text-sm rounded transition-colors",
              language === "hi"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            हिं
          </button>
        </div>
      </div>
    </header>
  );
}
