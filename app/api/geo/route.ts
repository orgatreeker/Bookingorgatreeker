import { NextResponse } from "next/server";
import { GEO_PRICING } from "@/lib/constants";
import { GeoData } from "@/lib/types";

export async function GET(request: Request) {
  try {
    // Try to get country from Vercel headers first
    const country = request.headers.get("x-vercel-ip-country") || "IN";

    const pricing = GEO_PRICING[country] || GEO_PRICING.DEFAULT;

    const geoData: GeoData = {
      country: country,
      countryCode: country,
      currency: pricing.currency,
      currencySymbol: pricing.currencySymbol,
      starterPrice: pricing.starterPrice,
      completePrice: pricing.completePrice,
      salaryPlaceholder: pricing.salaryPlaceholder,
    };

    return NextResponse.json(geoData);
  } catch {
    // Default to India if detection fails
    const defaultPricing = GEO_PRICING.IN;
    return NextResponse.json({
      country: "India",
      countryCode: "IN",
      currency: defaultPricing.currency,
      currencySymbol: defaultPricing.currencySymbol,
      starterPrice: defaultPricing.starterPrice,
      completePrice: defaultPricing.completePrice,
      salaryPlaceholder: defaultPricing.salaryPlaceholder,
    });
  }
}
