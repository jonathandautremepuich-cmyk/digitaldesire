import { NextResponse } from "next/server";

/**
 * Vérifie que les variables Stripe sont définies (sans afficher les valeurs).
 * À supprimer en production si vous ne voulez pas exposer cette info.
 */
export async function GET() {
  const vars = {
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_PRICE_ESSENTIEL: !!process.env.STRIPE_PRICE_ESSENTIEL,
    STRIPE_PRICE_PRO: !!process.env.STRIPE_PRICE_PRO,
    STRIPE_PRICE_PREMIUM: !!process.env.STRIPE_PRICE_PREMIUM,
    NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
  };

  const missing = Object.entries(vars).filter(([, v]) => !v).map(([k]) => k);
  const ok = Object.entries(vars).filter(([, v]) => v).map(([k]) => k);

  return NextResponse.json({
    ok: missing.length === 0,
    defined: ok,
    missing,
    hints: {
      STRIPE_PRICE_ESSENTIEL: process.env.STRIPE_PRICE_ESSENTIEL
        ? `longueur ${process.env.STRIPE_PRICE_ESSENTIEL.length} (doit être ~25+, pas "price_57")`
        : "non défini",
    },
  });
}
