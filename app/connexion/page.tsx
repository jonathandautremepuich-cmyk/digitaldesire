"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const STORAGE_ACCOUNT = "formation_account_created";
const STORAGE_USERNAME = "formation_username";
const STORAGE_PASSWORD = "formation_password";
const STORAGE_ACCESS = "formation_access";
const STORAGE_PLAN = "formation_plan";
const PAID_PLAN_KEY = (u: string) => `formation_paid_plan_${u.trim().toLowerCase()}`;

export default function ConnexionPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      const u = username.trim();
      const p = password;
      if (!u || !p) {
        setError("Veuillez remplir tous les champs.");
        return;
      }
      if (typeof window === "undefined") return;
      const savedUsername = window.sessionStorage.getItem(STORAGE_USERNAME);
      const savedPassword = window.sessionStorage.getItem(STORAGE_PASSWORD);
      if (!savedUsername || !savedPassword) {
        setError("Aucun compte trouvé. Créez un accès en choisissant une formule.");
        return;
      }
      if (savedUsername !== u || savedPassword !== p) {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
        return;
      }
      const paidPlan = typeof window !== "undefined" ? window.localStorage.getItem(PAID_PLAN_KEY(u)) : null;
      if (!paidPlan) {
        setError("Vous n'avez pas encore accès à une formule. Choisissez une formule et payez pour y accéder.");
        return;
      }
      window.sessionStorage.setItem(STORAGE_ACCOUNT, "true");
      window.sessionStorage.setItem(STORAGE_USERNAME, u);
      window.sessionStorage.setItem(STORAGE_ACCESS, "true");
      window.sessionStorage.setItem(STORAGE_PLAN, paidPlan);
      router.push("/acces");
    },
    [username, password, router]
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Orbe décorative derrière le formulaire */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,520px)] h-[min(80vw,400px)] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, var(--accent-glow) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className="w-full max-w-[420px] relative animate-fade-up opacity-0"
        style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
      >
        <div
          className="relative rounded-[var(--radius-xl)] p-8 sm:p-10 overflow-hidden transition-all duration-300"
          style={{
            background: "var(--bg-glass)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg), 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          {/* Bandeau accent en haut */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-[var(--radius-xl)]"
            style={{
              background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-muted) 50%, var(--accent) 100%)",
              boxShadow: "0 0 20px var(--accent-glow)",
            }}
          />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-8 transition-colors duration-200"
          >
            <span className="opacity-80">←</span>
            Retour à l&apos;accueil
          </Link>

          {/* Icône + titre */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--accent-border)",
                boxShadow: "0 0 24px var(--accent-glow)",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight mb-2">
              Se connecter
            </h1>
            <p className="text-[var(--text-muted)] text-sm max-w-[280px]">
              Entrez les identifiants créés lors de votre inscription.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2 text-[var(--text-secondary)]"
              >
                Nom d&apos;utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Votre nom d'utilisateur"
                className="w-full px-4 py-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all duration-200"
                autoComplete="username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-[var(--text-secondary)]"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all duration-200"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors duration-200"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="space-y-2">
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-amber-200 bg-amber-500/15 border border-amber-500/30"
                  role="alert"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
                {error.includes("pas encore accès") && (
                  <p className="text-center">
                    <Link href="/#tarifs" className="text-[var(--accent)] font-medium hover:underline">
                      Choisir une formule et payer →
                    </Link>
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full mt-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] text-center">
              Pas encore de compte ?{" "}
              <Link
                href="/inscription"
                className="text-[var(--accent)] font-medium hover:text-[var(--accent-hover)] hover:underline underline-offset-2 transition-colors duration-200"
              >
                Rejoindre la formation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
