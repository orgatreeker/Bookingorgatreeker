"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import useSWR from "swr";
import { Language, GeoData, QuizAnswer } from "@/lib/types";

type AppContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  geoData: GeoData | null;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  quizAnswers: QuizAnswer[];
  setQuizAnswers: (answers: QuizAnswer[]) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { data: geoData } = useSWR<GeoData>("/api/geo", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Set default language based on browser if available
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language;
      if (browserLang.startsWith("hi")) {
        setLanguage("hi");
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        geoData: geoData || null,
        isQuizOpen,
        setIsQuizOpen,
        quizAnswers,
        setQuizAnswers,
        showResults,
        setShowResults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
