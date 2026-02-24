"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const STORAGE_ACCOUNT = "formation_account_created";
const STORAGE_USERNAME = "formation_username";
const STORAGE_PASSWORD = "formation_password";
const STORAGE_ACCESS = "formation_access";
const STORAGE_PLAN = "formation_plan";

const validPlans = ["essentiel", "pro", "premium"];

export default function InscriptionPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const access = window.sessionStorage.getItem(STORAGE_ACCESS);
    const planId = window.sessionStorage.getItem(STORAGE_PLAN);
    const hasValidPlan = planId && validPlans.includes(planId);
    if (access === "true" && hasValidPlan) {
      router.replace("/acces");
      return;
    }
    const existingUser = window.sessionStorage.getItem(STORAGE_USERNAME);
    if (existingUser) {
      router.replace("/#tarifs");
      return;
    }
    setRedirecting(false);
  }, [router]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      const u = username.trim();
      const p = password;
      const cp = confirmPassword;

      if (!u) {
        setError("Choisissez un nom d'utilisateur.");
        return;
      }
      if (u.length < 3) {
        setError("Le nom d'utilisateur doit faire au moins 3 caractères.");
        return;
      }
      if (!p) {
        setError("Choisissez un mot de passe.");
        return;
      }
      if (p.length < 6) {
        setError("Le mot de passe doit faire au moins 6 caractères.");
        return;
      }
      if (p !== cp) {
        setError("Les deux mots de passe ne correspondent pas.");
        return;
      }

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(STORAGE_ACCOUNT, "true");
        window.sessionStorage.setItem(STORAGE_USERNAME, u);
        window.sessionStorage.setItem(STORAGE_PASSWORD, p);
      }
      router.push("/#tarifs");
    },
    [username, password, confirmPassword, router]
  );

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Redirection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8">
        <Link
          href="/"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6 inline-block"
        >
          ← Retour à l&apos;accueil
        </Link>
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-2">
          Créez votre compte
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-6">
          Une fois inscrit, vous pourrez choisir l&apos;une des trois formules (Essentiel, Pro ou Premium) sur la page d&apos;accueil et payer pour y accéder.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && <p className="text-sm text-red-400">{error}</p>}
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
