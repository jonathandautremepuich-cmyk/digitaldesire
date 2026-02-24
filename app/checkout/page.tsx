"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

const PROMO_CODE = "devenirriche";
const PLANS: Record<string, { name: string; price: number }> = {
  essentiel: { name: "Essentiel", price: 57 },
  pro: { name: "Pro", price: 127 },
  premium: { name: "Premium", price: 217 },
};

const STORAGE_ACCOUNT = "formation_account_created";
const STORAGE_USERNAME = "formation_username";
const STORAGE_PASSWORD = "formation_password";
const STORAGE_ACCESS = "formation_access";
const STORAGE_PLAN = "formation_plan";
const PAID_PLAN_KEY = (u: string) => `formation_paid_plan_${u.trim().toLowerCase()}`;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = (searchParams.get("plan") || "pro").toLowerCase();
  const plan = PLANS[planId] || PLANS.pro;

  const [step, setStep] = useState<"account" | "checkout">("account");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountError, setAccountError] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "valid" | "invalid" | "applying">("idle");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(true);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasAccess = window.sessionStorage.getItem(STORAGE_ACCESS) === "true";
    if (hasAccess) {
      router.replace("/acces");
      return;
    }
    const existingUser = window.sessionStorage.getItem(STORAGE_USERNAME);
    if (existingUser) {
      setUsername(existingUser);
      setStep("checkout");
    }
    setRedirecting(false);
  }, [router]);

  const handleCreateAccount = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setAccountError("");
      const u = username.trim();
      const p = password;
      const cp = confirmPassword;

      if (!u) {
        setAccountError("Choisissez un nom d'utilisateur.");
        return;
      }
      if (u.length < 3) {
        setAccountError("Le nom d'utilisateur doit faire au moins 3 caractères.");
        return;
      }
      if (!p) {
        setAccountError("Choisissez un mot de passe.");
        return;
      }
      if (p.length < 6) {
        setAccountError("Le mot de passe doit faire au moins 6 caractères.");
        return;
      }
      if (p !== cp) {
        setAccountError("Les deux mots de passe ne correspondent pas.");
        return;
      }

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(STORAGE_ACCOUNT, "true");
        window.sessionStorage.setItem(STORAGE_USERNAME, u);
        window.sessionStorage.setItem(STORAGE_PASSWORD, p);
        // Do NOT set formation_access or formation_plan — access is granted only after payment
      }
      setUsername(u);
      setStep("checkout");
    },
    [username, password, confirmPassword, router, planId]
  );

  const applyCode = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      const value = code.trim().toLowerCase();
      if (!value) {
        setError("Veuillez entrer un code promo.");
        return;
      }
      setStatus("applying");
      setTimeout(() => {
        if (value === PROMO_CODE) {
          setStatus("valid");
        } else {
          setStatus("invalid");
          setError("Code promo invalide.");
        }
      }, 300);
    },
    [code]
  );

  const handleStripePayment = useCallback(async () => {
    setStripeError("");
    setStripeLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStripeError(data.error || "Impossible de lancer le paiement.");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setStripeError("Réponse serveur invalide.");
    } catch {
      setStripeError("Erreur réseau. Réessayez.");
    } finally {
      setStripeLoading(false);
    }
  }, [planId]);

  const grantAccess = useCallback(() => {
    if (typeof window !== "undefined") {
      const u = window.sessionStorage.getItem(STORAGE_USERNAME) || username;
      window.sessionStorage.setItem(STORAGE_ACCESS, "true");
      window.sessionStorage.setItem(STORAGE_PLAN, planId);
      window.sessionStorage.setItem("formation_show_payment_success", "true");
      if (u) {
        try {
          window.localStorage.setItem(PAID_PLAN_KEY(u), planId);
        } catch (_) {}
      }
    }
    router.push("/acces");
  }, [router, planId, username]);

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Redirection vers Ma Formation...</p>
      </div>
    );
  }

  if (step === "account") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20 w-full max-w-[100vw] box-border overflow-x-hidden">
        <div className="w-full max-w-md min-w-0 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 sm:p-8 box-border">
          <Link
            href="/#tarifs"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 inline-block"
          >
            ← Retour aux offres
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-2">
            Créez votre accès
          </h1>
          <p className="text-[var(--text-muted)] text-sm mb-6">
            Choisissez un nom d&apos;utilisateur et un mot de passe pour accéder à la formation.
          </p>
          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">
                Nom d&apos;utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: marie_dupont"
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                autoComplete="username"
                minLength={3}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 caractères"
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                autoComplete="new-password"
                minLength={6}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Retapez votre mot de passe"
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                autoComplete="new-password"
              />
            </div>
            {accountError && (
              <p className="text-sm text-red-400">{accountError}</p>
            )}
            <button type="submit" className="btn btn-primary btn-lg w-full">
              Créer mon compte
            </button>
          </form>
          <p className="text-sm text-[var(--text-muted)] mt-4 text-center">
            Déjà un compte ?{" "}
            <Link href="/connexion" className="text-[var(--accent)] hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20 w-full max-w-[100vw] box-border overflow-x-hidden">
      <div className="w-full max-w-md min-w-0 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 sm:p-8 box-border">
        <Link
          href="/#tarifs"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 inline-block"
        >
          ← Retour aux offres
        </Link>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-2">
          Finaliser l&apos;accès
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-6">
          Formule <strong className="text-[var(--text)]">{plan.name}</strong> —{" "}
          <span className="text-[var(--accent)] font-semibold">{plan.price} €</span> (paiement unique)
        </p>

        {status === "valid" ? (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)] text-[var(--accent)] font-medium text-center">
              Code accepté ! Vous bénéficiez d&apos;un accès intégral sans paiement.
            </div>
            <button
              type="button"
              onClick={grantAccess}
              className="btn btn-primary btn-lg w-full"
            >
              Accéder à la formation
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={applyCode} className="space-y-4 mb-6">
              <label htmlFor="promo" className="block text-sm font-medium mb-1">
                Code promo (optionnel)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="promo"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setStatus("idle");
                    setError("");
                  }}
                  placeholder="Ex: MONCODE"
                  className="flex-1 px-4 py-3 rounded-[var(--radius)] bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                  autoComplete="off"
                />
                <button type="submit" className="btn btn-outline whitespace-nowrap" disabled={status === "applying"}>
                  {status === "applying" ? "..." : "Appliquer"}
                </button>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              {status === "invalid" && (
                <p className="text-sm text-[var(--text-muted)]">
                  Pas de code ? Passez au paiement ci-dessous.
                </p>
              )}
            </form>

            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-muted)] mb-3">
                Paiement sécurisé — Stripe
              </p>
              {stripeError && (
                <p className="text-sm text-red-400 mb-3" role="alert">
                  {stripeError}
                </p>
              )}
              <button
                type="button"
                onClick={handleStripePayment}
                disabled={stripeLoading}
                className="btn btn-primary w-full mt-4 inline-flex items-center justify-center gap-2"
              >
                {stripeLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden />
                    Redirection vers Stripe…
                  </>
                ) : (
                  <>Payer {plan.price} € avec Stripe</>
                )}
              </button>
              <p className="text-xs text-[var(--text-muted)] mt-3 text-center">
                Sans Stripe configuré ?{" "}
                <button
                  type="button"
                  onClick={grantAccess}
                  className="text-[var(--accent)] hover:underline"
                >
                  Payer en simulation
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-[var(--text-muted)]">Chargement...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
