"use client";

import { useApp } from "@/components/providers/app-context";
import { translations } from "@/lib/translations";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Bangalore",
    text: "I was skeptical at first — another spreadsheet? But this is different. Within 2 weeks, I found ₹4,500 in subscriptions I had forgotten about. Now I save consistently every month.",
    textHi: "पहले शक था — एक और स्प्रेडशीट? पर ये अलग है। 2 हफ्ते में, मुझे ₹4,500 के subscriptions मिले जो भूल गई थी। अब हर महीने consistently बचत होती है।",
    saved: "₹4,500/month",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Marketing Manager",
    location: "Mumbai",
    text: "My salary used to vanish by the 15th. Now I know exactly where every rupee goes. Started my first SIP last month. The Pro version setup call with Gopu was incredibly helpful.",
    textHi: "पहले 15 तारीख तक सैलरी खत्म हो जाती थी। अब पता है हर रुपया कहाँ जाता है। पिछले महीने पहला SIP शुरू किया। Gopu के साथ Pro version setup call बहुत helpful थी।",
    saved: "₹8,000/month",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    role: "Doctor",
    location: "Delhi",
    text: "I earn well but had no visibility into my finances. The Budget Master template gave me complete control. My net worth is finally growing instead of staying flat.",
    textHi: "अच्छा कमाती हूँ पर finances में कोई visibility नहीं थी। Budget Master template ने पूरा control दिया। Net worth finally बढ़ रही है, flat नहीं रह रही।",
    saved: "₹15,000/month",
    rating: 5,
  },
];

export function SocialProofSection() {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            {t.socialProofTitle}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card border border-border flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6 flex-grow">
                {language === "hi" ? testimonial.textHi : testimonial.text}
              </p>

              {/* Saved Amount */}
              <div className="mb-4 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium inline-flex self-start">
                {language === "hi" ? "बचत:" : "Saved:"} {testimonial.saved}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.location}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
