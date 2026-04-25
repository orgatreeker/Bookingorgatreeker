export type Language = "en" | "hi";

export type QuizAnswer = {
  questionId: number;
  answerId: number;
};

export type QuizResult = {
  score: number;
  recommendation: "starter" | "complete";
  diagnosis: string;
  diagnosisHi: string;
};

export type GeoData = {
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  starterPrice: number;
  completePrice: number;
  salaryPlaceholder: string;
};

export type Product = {
  id: "starter" | "complete";
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  price: number;
  currency: string;
  currencySymbol: string;
  purchaseLink: string;
  wistiaMediaId: string;
  outcomes: string[];
  outcomesHi: string[];
  features: string[];
  featuresHi: string[];
};
