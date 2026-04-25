"use client";

import { useState, useCallback } from "react";
import { useApp } from "@/components/providers/app-context";
import { translations, getDiagnosis } from "@/lib/translations";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { WistiaEmbed } from "@/components/ui/wistia-embed";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResultsProps {
  onClose: () => void;
}

export function QuizResults({ onClose }: QuizResultsProps) {
  const { language, quizAnswers, geoData } = useApp();
  const t = translations[language];
  const [videoStarted, setVideoStarted] = useState(false);
  const [showBuyButton, setShowBuyButton] = useState(false);

  // Calculate diagnosis and recommendation
  const { diagnosis, recommendation } = getDiagnosis(quizAnswers, language);

  const recommendedProduct = recommendation === "complete" ? PRODUCTS.complete : PRODUCTS.starter;
  const otherProduct = recommendation === "complete" ? PRODUCTS.starter : PRODUCTS.complete;

  // Get prices based on geo data
  const getPrice = (productId: "starter" | "complete") => {
    if (!geoData) {
      return productId === "starter" ? "₹499" : "₹1,599";
    }
    const price = productId === "starter" ? geoData.starterPrice : geoData.completePrice;
    return `${geoData.currencySymbol}${price.toLocaleString()}`;
  };

  const handleVideoPlay = useCallback(() => {
    setVideoStarted(true);
    // Show buy button after video starts
    setTimeout(() => {
      setShowBuyButton(true);
    }, 5000); // Show after 5 seconds of playback
  }, []);

  const handleVideoTimeUpdate = useCallback((time: number) => {
    // Also show buy button after 30 seconds regardless
    if (time >= 30 && !showBuyButton) {
      setShowBuyButton(true);
    }
  }, [showBuyButton]);

  // Also show buy button after 30 seconds on page
  useState(() => {
    const timer = setTimeout(() => {
      setShowBuyButton(true);
    }, 30000);
    return () => clearTimeout(timer);
  });

  const productName = language === "hi" ? recommendedProduct.nameHi : recommendedProduct.name;
  const productTagline = language === "hi" ? recommendedProduct.taglineHi : recommendedProduct.tagline;
  const outcomes = language === "hi" ? recommendedProduct.outcomesHi : recommendedProduct.outcomes;

  const otherProductName = language === "hi" ? otherProduct.nameHi : otherProduct.name;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 p-2 rounded-lg bg-card hover:bg-muted border border-border transition-colors z-20"
            aria-label="Close results"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Part 1: Diagnosis */}
          <section className="mb-12 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-secondary" />
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                {t.resultsTitle}
              </h2>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-lg leading-relaxed whitespace-pre-line text-foreground/90">
                {diagnosis}
              </p>
            </div>
          </section>

          {/* Part 2: Recommendation */}
          <section className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg text-muted-foreground mb-2">{t.recommendationTitle}</h3>
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold mb-1">
                    {productName}
                  </h4>
                  <p className="text-muted-foreground">{productTagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {getPrice(recommendedProduct.id)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {language === "hi" ? "एक बार का भुगतान" : "one-time payment"}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="font-medium mb-3">{t.outcomesTitle}</h5>
                <ul className="space-y-2">
                  {outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Part 3: Tutorial Video */}
          <section className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-2">
              {t.videoTitle}
            </h3>
            <p className="text-muted-foreground mb-6">{t.videoSubtitle}</p>
            
            <div className="rounded-xl overflow-hidden border border-border bg-card shadow-xl">
              <WistiaEmbed
                mediaId={recommendedProduct.wistiaMediaId}
                onPlay={handleVideoPlay}
                onTimeUpdate={handleVideoTimeUpdate}
              />
            </div>
          </section>

          {/* Part 4: Buy Button (appears after video) */}
          <section className={cn(
            "mb-12 transition-all duration-500",
            showBuyButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex flex-col items-center gap-4">
              <Button
                size="xl"
                asChild
                className="w-full sm:w-auto group"
              >
                <a
                  href={recommendedProduct.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.buyNow} — {getPrice(recommendedProduct.id)}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              {/* Other Product Option */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.viewOther}</p>
                <Button variant="outline" asChild>
                  <a
                    href={otherProduct.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {otherProductName} — {getPrice(otherProduct.id)}
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Both Products Comparison */}
          <section className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-serif text-xl font-semibold text-center mb-6">
              {t.bothProducts}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[PRODUCTS.starter, PRODUCTS.complete].map((product) => {
                const isRecommended = product.id === recommendedProduct.id;
                const name = language === "hi" ? product.nameHi : product.name;
                const tagline = language === "hi" ? product.taglineHi : product.tagline;
                const features = language === "hi" ? product.featuresHi : product.features;

                return (
                  <div
                    key={product.id}
                    className={cn(
                      "p-5 rounded-xl border-2 transition-all",
                      isRecommended
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-muted-foreground"
                    )}
                  >
                    {isRecommended && (
                      <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">
                        {language === "hi" ? "सिफारिश" : "Recommended"}
                      </div>
                    )}
                    <h4 className="font-serif text-xl font-semibold mb-1">{name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{tagline}</p>
                    <div className="text-2xl font-bold mb-4">{getPrice(product.id)}</div>
                    <ul className="space-y-2 mb-5">
                      {features.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {features.length > 5 && (
                        <li className="text-sm text-muted-foreground pl-6">
                          +{features.length - 5} {language === "hi" ? "और" : "more"}
                        </li>
                      )}
                    </ul>
                    <Button
                      variant={isRecommended ? "default" : "outline"}
                      className="w-full"
                      asChild
                    >
                      <a
                        href={product.purchaseLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {language === "hi" ? "चुनें" : "Choose"} {name}
                      </a>
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
