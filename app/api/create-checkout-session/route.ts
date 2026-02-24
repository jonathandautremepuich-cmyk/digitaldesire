import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const VALID_PLANS = ["essentiel", "pro", "premium"] as const;

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!secret || !appUrl) {
    return NextResponse.json(
      { error: "Configuration Stripe manquante (STRIPE_SECRET_KEY ou NEXT_PUBLIC_APP_URL)." },
      { status: 500 }
    );
  }

  let body: { planId?: string; username?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const planId = typeof body.planId === "string" ? body.planId.toLowerCase().trim() : "";
  if (!planId || !VALID_PLANS.includes(planId as (typeof VALID_PLANS)[number])) {
    return NextResponse.json({ error: "Formule invalide." }, { status: 400 });
  }

  const priceKey = `STRIPE_PRICE_${planId.toUpperCase()}` as "STRIPE_PRICE_ESSENTIEL" | "STRIPE_PRICE_PRO" | "STRIPE_PRICE_PREMIUM";
  const priceId = process.env[priceKey];
  if (!priceId) {
    return NextResponse.json(
      { error: `Prix Stripe non configuré pour la formule ${planId}.` },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/acces?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout?plan=${planId}`,
      client_reference_id: planId,
      metadata: { planId },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossible de créer la session Stripe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}
