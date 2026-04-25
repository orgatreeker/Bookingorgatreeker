"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { QUIZ_QUESTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuizResults } from "./quiz-results";
import { Language } from "@/lib/types";

export function QuizModal() {
  const {
    language,
    setLanguage,
    isQuizOpen,
    setIsQuizOpen,
    quizAnswers,
    setQuizAnswers,
    showResults,
    setShowResults,
  } = useApp();

  const t = translations[language];
  const questions = QUIZ_QUESTIONS[language];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Reset quiz state when opening
  useEffect(() => {
    if (isQuizOpen) {
      setCurrentQuestion(0);
      setQuizAnswers([]);
      setShowResults(false);
      setSelectedOption(null);
    }
  }, [isQuizOpen, setQuizAnswers, setShowResults]);

  // Pre-select option if already answered
  useEffect(() => {
    const existingAnswer = quizAnswers.find(
      (a) => a.questionId === questions[currentQuestion]?.id
    );
    setSelectedOption(existingAnswer?.answerId || null);
  }, [currentQuestion, quizAnswers, questions]);

  if (!isQuizOpen) return null;

  const handleClose = () => {
    setIsQuizOpen(false);
    setQuizAnswers([]);
    setShowResults(false);
    setCurrentQuestion(0);
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const question = questions[currentQuestion];
    const newAnswers = quizAnswers.filter((a) => a.questionId !== question.id);
    newAnswers.push({ questionId: question.id, answerId: selectedOption });
    setQuizAnswers(newAnswers);

    // Handle language preference question (Q6)
    if (question.id === 6) {
      const newLang: Language = selectedOption === 2 ? "hi" : "en";
      setLanguage(newLang);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return <QuizResults onClose={handleClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full quiz-progress-bar transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* Language Toggle - only show on first question */}
          {currentQuestion === 0 && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-3 py-1 text-sm rounded-lg transition-colors",
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={cn(
                  "px-3 py-1 text-sm rounded-lg transition-colors",
                  language === "hi"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                हिंदी
              </button>
            </div>
          )}

          {/* Header - only on first question */}
          {currentQuestion === 0 && (
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-2">
                {t.quizTitle}
              </h2>
              <p className="text-muted-foreground">{t.quizSubtitle}</p>
            </div>
          )}

          {/* Question Counter */}
          <div className="text-center mb-4">
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} {t.questionOf} {questions.length}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-xl sm:text-2xl font-medium text-center mb-8">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={cn(
                  "w-full p-4 text-left rounded-xl border-2 transition-all duration-200",
                  selectedOption === option.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border hover:border-muted-foreground bg-muted/30 text-foreground"
                )}
              >
                <span className="text-base sm:text-lg">{option.text}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={cn(currentQuestion === 0 && "invisible")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.quizBack}
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="group"
            >
              {currentQuestion === questions.length - 1 ? t.quizSubmit : t.quizNext}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
