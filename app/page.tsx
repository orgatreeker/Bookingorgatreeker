import { AppProvider } from "@/components/providers/app-context";
import { Hero } from "@/components/sections/hero";
import { VideoSection } from "@/components/sections/video-section";
import { MethodSection } from "@/components/sections/method-section";
import { PainPointsSection } from "@/components/sections/pain-points-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProductsSection } from "@/components/sections/products-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { QuizModal } from "@/components/quiz/quiz-modal";

export default function Home() {
  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen pt-14">
        <Hero />
        <VideoSection />
        <MethodSection />
        <PainPointsSection />
        <AboutSection />
        <ProductsSection />
        <SocialProofSection />
        <FaqSection />
        <FinalCtaSection />
        <Footer />
        <QuizModal />
      </main>
    </AppProvider>
  );
}
