"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MODULES, BONUS } from "./modules-data";
import { downloadFormationPdf } from "./pdf-export";

export default function AccesPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleDownloadFullPdf = useCallback(async () => {
    setDownloading(true);
    try {
      await downloadFormationPdf();
    } finally {
      setDownloading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.plan) {
            const u = window.sessionStorage.getItem("formation_username");
            window.sessionStorage.setItem("formation_access", "true");
            window.sessionStorage.setItem("formation_plan", data.plan);
            window.sessionStorage.setItem("formation_show_payment_success", "true");
            if (u) {
              try {
                window.localStorage.setItem(
                  `formation_paid_plan_${u.trim().toLowerCase()}`,
                  data.plan
                );
              } catch (_) {}
            }
            window.history.replaceState({}, "", "/acces");
            setAllowed(true);
            setPlan(data.plan);
            setUsername(u || null);
            setShowPaymentSuccess(true);
          } else {
            router.replace("/#tarifs");
          }
        })
        .catch(() => router.replace("/#tarifs"));
      return;
    }

    const access = window.sessionStorage.getItem("formation_access");
    const planId = window.sessionStorage.getItem("formation_plan");
    const u = window.sessionStorage.getItem("formation_username");
    const validPlans = ["essentiel", "pro", "premium"];
    const hasValidPlan = planId && validPlans.includes(planId);
    if (access !== "true" || !hasValidPlan) {
      window.sessionStorage.removeItem("formation_access");
      window.sessionStorage.removeItem("formation_plan");
      router.replace("/#tarifs");
      return;
    }
    const justPaid = window.sessionStorage.getItem("formation_show_payment_success") === "true";
    if (justPaid) {
      window.sessionStorage.removeItem("formation_show_payment_success");
      setShowPaymentSuccess(true);
    }
    setAllowed(true);
    setPlan(planId);
    setUsername(u || null);
  }, [router]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Redirection...</p>
      </div>
    );
  }

  const planNames: Record<string, string> = {
    essentiel: "Essentiel",
    pro: "Pro",
    premium: "Premium",
  };

  return (
    <div className="min-h-screen">
      {/* Espace en haut pour pouvoir défiler jusqu'en haut */}
      <div className="h-20 shrink-0" aria-hidden />
      <header className="header">
        <nav className="nav max-w-[1100px] mx-auto px-6 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="min-w-0" />
          <Link href="/" className="text-3xl font-bold tracking-tight text-[var(--text)] justify-self-center shrink-0">
            Digital<span className="text-[var(--accent)]"> Desire</span>
          </Link>
          <div className="flex items-center justify-end gap-4 pr-8">
            <Link href="/" className="text-sm font-medium text-[#fff] py-2.5 px-3.5 border-2 border-[var(--accent)] rounded-xl bg-transparent hover:bg-[var(--accent-soft)] hover:border-[var(--accent-hover)] transition-colors">
              Retour à l&apos;accueil
            </Link>
          </div>
        </nav>
      </header>

      <main className="container pt-24 pb-20">
        <div className="max-w-2xl mx-auto">
          {showPaymentSuccess ? (
            <>
              {/* Bloc succès — affiché une seule fois après le paiement */}
              <section className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--accent-border)] bg-[var(--accent-soft)] p-6 sm:p-8 mb-10 text-center">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[var(--accent)]/10 -translate-y-1/2 translate-x-1/2" aria-hidden />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[var(--accent)]/10 translate-y-1/2 -translate-x-1/2" aria-hidden />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent)]/20 border-2 border-[var(--accent)] text-[var(--accent)] mb-4" aria-hidden>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-wider mb-1">
                    Paiement validé
                  </p>
                  <p className="text-[var(--text)] font-medium text-lg">
                    Vous avez un accès intégral à la formation
                  </p>
                  <span className="inline-block mt-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/20 border border-[var(--accent-border)] text-[var(--accent)] font-semibold text-sm">
                    Formule {plan ? planNames[plan] : ""}
                  </span>
                </div>
              </section>

              {/* Message de bienvenue (première visite uniquement) */}
              <section className="mb-10">
                <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold mb-6 text-[var(--text)] leading-tight">
                  Félicitations pour avoir investi en vous.
                </h1>
                <div className="space-y-4 text-[var(--text-content)] text-lg leading-relaxed">
                  <p>
                    Vous avez fait le choix d&apos;avancer — et c&apos;est souvent le pas le plus difficile. Chaque expert a un jour commencé par une formation, une décision, un premier module.
                  </p>
                  <p>
                    Ici, pas de théorie sans pratique : vous allez construire, pas seulement apprendre. La liberté financière se gagne en agissant, pas en attendant.
                  </p>
                </div>
                <div className="mt-8 p-4 rounded-xl border-l-4 border-[var(--accent)] bg-[var(--bg-elevated)]/80">
                  <p className="text-[var(--accent)] font-semibold text-lg m-0">
                    C&apos;est à vous de jouer. Parcourez les modules dans l&apos;ordre et passez à l&apos;action.
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Retour sur la page : message simple */
            <section className="mb-10 py-4">
              <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[var(--text)] text-center">
                Accès Complet à Digital Desire
              </h1>
              <p className="text-[var(--text-muted)] text-center mt-2 text-sm">
                Reprenez où vous en étiez — parcourez les modules ci-dessous.
              </p>
            </section>
          )}

          {/* Téléchargement PDF */}
          <div className="mb-14">
            <button
              type="button"
              onClick={handleDownloadFullPdf}
              disabled={downloading}
              className="btn btn-primary btn-lg w-full sm:w-auto inline-flex items-center justify-center gap-2"
            >
              {downloading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden />
                  Génération du PDF…
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Télécharger la formation (PDF)
                </>
              )}
            </button>
          </div>

          {/* Liste des modules */}
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[var(--text)] mb-6 pb-2 border-b border-[var(--border)]">
            Vos modules
          </h2>
          <div className="space-y-4">
            {MODULES.map((mod) => (
              <Link
                key={mod.id}
                href={`/acces/module/${mod.id}`}
                className="module block p-6 no-underline"
              >
                <span className="text-xs font-semibold text-[var(--accent)]">
                  MODULE {mod.number} — {mod.title}
                </span>
                <p className="text-[var(--text-muted)] text-sm mt-2 mb-1">
                  Objectif : {mod.objective}
                </p>
                <p className="text-[var(--text-muted)] text-xs">
                  {mod.categories.length} catégorie{mod.categories.length > 1 ? "s" : ""}
                </p>
              </Link>
            ))}

            <Link
              href="/acces/module/bonus"
              className="module block p-6 no-underline border-[var(--accent)]"
            >
              <span className="text-xs font-semibold text-[var(--accent)]">BONUS</span>
              <h2 className="text-xl mt-2 mb-1">{BONUS.title}</h2>
              <p className="text-[var(--text-muted)] text-xs">
                {BONUS.categories.length} éléments
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
