import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const VALID_PLANS = ["essentiel", "pro", "premium"] as const;

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const secret = process.env.STRIPE_SECRET_KEY;

  if (!secret) {
    return NextResponse.json(
      { error: "Configuration Stripe manquante." },
      { status: 500 }
    );
  }

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "session_id manquant." }, { status: 400 });
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { success: false, error: "Paiement non finalisé." },
        { status: 400 }
      );
    }

    const planId =
      (session.client_reference_id as string) ||
      (session.metadata?.planId as string) ||
      "";

    if (!planId || !VALID_PLANS.includes(planId as (typeof VALID_PLANS)[number])) {
      return NextResponse.json(
        { success: false, error: "Formule invalide." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, plan: planId });
  } catch (err) {
    console.error("Stripe verify session error:", err);
    return NextResponse.json(
      { error: "Session de paiement invalide ou expirée." },
      { status: 400 }
    );
  }
}
