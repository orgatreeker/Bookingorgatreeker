"use client";

import { useApp } from "@/components/providers/app-context";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

export function ProductsSection() {
  const { language, geoData } = useApp();

  const getPrice = (productId: "starter" | "complete") => {
    if (!geoData) {
      return productId === "starter" ? "₹499" : "₹1,599";
    }
    const price = productId === "starter" ? geoData.starterPrice : geoData.completePrice;
    return `${geoData.currencySymbol}${price.toLocaleString()}`;
  };

  const products = [PRODUCTS.starter, PRODUCTS.complete];

  return (
    <section id="products" className="py-20 px-4 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            {language === "hi" ? "अपना सिस्टम चुनें" : "Choose Your System"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {language === "hi"
              ? "दोनों versions एक बार के payment पर, हमेशा के लिए access।"
              : "Both versions are one-time payments with lifetime access."}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, index) => {
            const isComplete = product.id === "complete";
            const name = language === "hi" ? product.nameHi : product.name;
            const tagline = language === "hi" ? product.taglineHi : product.tagline;
            const features = language === "hi" ? product.featuresHi : product.features;
            const outcomes = language === "hi" ? product.outcomesHi : product.outcomes;

            return (
              <div
                key={product.id}
                className={`relative p-6 sm:p-8 rounded-2xl border-2 transition-all ${
                  isComplete
                    ? "border-primary bg-gradient-to-br from-primary/5 to-secondary/5"
                    : "border-border bg-card"
                }`}
              >
                {/* Popular Badge */}
                {isComplete && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {language === "hi" ? "सबसे लोकप्रिय" : "Most Popular"}
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-semibold mb-1">{name}</h3>
                  <p className="text-muted-foreground text-sm">{tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold">{getPrice(product.id)}</span>
                  <span className="text-muted-foreground ml-2">
                    {language === "hi" ? "एक बार" : "one-time"}
                  </span>
                </div>

                {/* Outcomes */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-secondary mb-3">
                    {language === "hi" ? "90 दिनों में:" : "In 90 days:"}
                  </h4>
                  <ul className="space-y-2">
                    {outcomes.slice(0, 4).map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    {language === "hi" ? "आपको मिलेगा:" : "You get:"}
                  </h4>
                  <ul className="space-y-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  variant={isComplete ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a
                    href={product.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {language === "hi" ? "अभी खरीदें" : "Get Started"} — {getPrice(product.id)}
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
