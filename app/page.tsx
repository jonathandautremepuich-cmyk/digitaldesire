"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const STORAGE_USERNAME = "formation_username";
const STORAGE_ACCESS = "formation_access";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const access = window.sessionStorage.getItem(STORAGE_ACCESS);
    const planId = window.sessionStorage.getItem("formation_plan");
    const validPlans = ["essentiel", "pro", "premium"];
    const hasValidPlan = planId && validPlans.includes(planId);
    if (access === "true" && !hasValidPlan) {
      window.sessionStorage.removeItem(STORAGE_ACCESS);
      window.sessionStorage.removeItem("formation_plan");
    }
    const u = window.sessionStorage.getItem(STORAGE_USERNAME);
    setUsername(u || null);
    setIsMember(access === "true" && !!hasValidPlan);
  }, []);

  const handleLogout = useCallback(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(STORAGE_ACCESS);
    window.sessionStorage.removeItem(STORAGE_USERNAME);
    window.sessionStorage.removeItem("formation_account_created");
    window.sessionStorage.removeItem("formation_plan");
    window.sessionStorage.removeItem("formation_password");
    setUsername(null);
    document.querySelector(".nav")?.classList.remove("open");
    router.push("/");
  }, [router]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToId(href.slice(1));
    }
  }, []);

  const handleBurgerClick = useCallback(() => {
    document.querySelector(".nav")?.classList.toggle("open");
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.querySelector("#name") as HTMLInputElement)?.value?.trim();
    if (name) {
      alert(
        `Merci ${name} ! Votre message a bien été envoyé.\n(En production, connectez ce formulaire à votre backend ou service d'email.)`
      );
      form.reset();
    }
  }, []);

  return (
    <>
      <div className="mindset-band">
        <p className="text-center max-w-2xl mx-auto">
          Les personnes qui réussissent investissent en elles-mêmes.{" "}
          <span className="text-[var(--accent)] font-semibold">Votre formation, votre avenir.</span>
        </p>
      </div>

      <header className="header">
        <nav className="nav">
          <Link href="/" className="text-lg font-bold tracking-tight text-[var(--text)] shrink-0">
            Digital<span className="text-[var(--accent)]"> Desire</span>
          </Link>
          <ul className="nav-links">
            <li><a href="#programme" onClick={handleNavClick}>Programme</a></li>
            <li><a href="#avantages" onClick={handleNavClick}>Avantages</a></li>
            <li><a href="#tarifs" onClick={handleNavClick}>Tarifs</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
            {username ? (
              <>
                {isMember && <li className="md:hidden"><Link href="/acces">Ma Formation</Link></li>}
                <li className="md:hidden">
                  <span
                    className="inline-flex items-center gap-2 rounded-xl text-sm font-medium border-2 border-[var(--accent)] bg-transparent text-[var(--text)] overflow-hidden"
                    title={`Connecté : ${username}`}
                  >
                    <span className="inline-flex items-center gap-2 pl-3 py-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      {username}
                    </span>
                    <span className={`inline-flex items-center px-3 py-2 text-xs font-semibold whitespace-nowrap ${isMember ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`}>
                      {isMember ? "Membre" : "Non Membre"}
                    </span>
                  </span>
                </li>
                <li className="md:hidden"><button type="button" onClick={handleLogout} className="bg-transparent border-none cursor-pointer p-0 font-medium text-sm text-[var(--text)] hover:text-[var(--accent)]">Déconnexion</button></li>
              </>
            ) : (
              <>
                <li className="md:hidden"><Link href="/connexion">Se connecter</Link></li>
                <li className="md:hidden"><Link href="/inscription">Rejoindre la formation</Link></li>
              </>
            )}
          </ul>
          {username ? (
            <div className="nav-cta flex items-center gap-4">
              {isMember && (
                <Link href="/acces" className="text-sm font-medium transition-colors">
                  Ma Formation
                </Link>
              )}
              <span
                className="inline-flex items-center rounded-xl text-sm font-medium border-2 border-[var(--accent)] bg-transparent text-[var(--text)] overflow-hidden"
                title={`Connecté en tant que ${username}`}
              >
                <span className="inline-flex items-center gap-2 py-2.5 pl-3.5 pr-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-transparent" aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  {username}
                </span>
                <span className={`inline-flex items-center py-2.5 px-3.5 text-xs font-semibold whitespace-nowrap ${isMember ? "bg-[var(--accent-soft)] text-[var(--accent)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`}>
                  {isMember ? "Membre" : "Non Membre"}
                </span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium transition-colors"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="nav-cta flex items-center gap-3">
              <Link
                href="/connexion"
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)]"
              >
                Se connecter
              </Link>
              <Link
                href="/inscription"
                className="btn btn-primary"
                aria-label="Rejoindre la formation"
              >
                Rejoindre la formation
              </Link>
            </div>
          )}
          <button
            type="button"
            className="burger"
            onClick={handleBurgerClick}
            aria-label="Ouvrir le menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero relative min-h-[90vh] flex items-center pt-28 pb-20 px-0" aria-label="Accroche">
          <div className="hero-bg" aria-hidden />
          <div className="container relative text-center">
            <p className="hero-badge">Formation 100 % en ligne</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.15] tracking-tight text-[var(--text)] max-w-[22ch] mx-auto mb-5">
              Votre liberté financière commence ici.{" "}
              <em className="not-italic text-[var(--accent)]">Avec l&apos;IA OFM, c&apos;est maintenant.</em>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-[44ch] mx-auto mb-8 leading-relaxed">
              Rejoignez ceux qui ont choisi d&apos;agir. La formation qui transforme votre potentiel en revenus réels.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <a href="#tarifs" onClick={handleNavClick} className="btn btn-primary btn-lg">
                Voir les offres
              </a>
              <a href="#programme" onClick={handleNavClick} className="btn btn-outline btn-lg">
                Découvrir le programme
              </a>
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-12 max-w-md mx-auto">
              Pour ceux qui sont prêts à agir. Pas demain — aujourd&apos;hui.
            </p>
            <ul className="hero-stats" role="list" aria-label="Chiffres clés">
              <li className="hero-stat">
                <span className="hero-stat-value">2 500+</span>
                <span className="hero-stat-label">apprenants</span>
              </li>
              <li className="hero-stat">
                <span className="hero-stat-value">4.9/5</span>
                <span className="hero-stat-label">satisfaction</span>
              </li>
              <li className="hero-stat">
                <span className="hero-stat-value">12h</span>
                <span className="hero-stat-label">de contenu</span>
              </li>
            </ul>
            <a
              href="#programme"
              onClick={handleNavClick}
              className="mt-16 inline-flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300"
              aria-label="Découvrir le programme"
            >
              <span className="text-xs font-medium tracking-widest uppercase">Découvrir</span>
              <span className="block w-6 h-10 rounded-full border-2 border-current opacity-60 flex items-start justify-center pt-2">
                <span className="w-1 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDuration: "2s" }} />
              </span>
            </a>
          </div>
        </section>

        {/* Programme */}
        <section id="programme" className="section section-alt relative" aria-labelledby="programme-title">
          <div className="container relative z-10">
            <p className="section-label text-center">Programme</p>
            <h2 id="programme-title" className="section-title text-center">Ce que vous allez apprendre</h2>
            <p className="section-subtitle text-center mb-12">
              De la compréhension du business à la monétisation, tout le parcours IA OFM. Un programme pensé pour les esprits entrepreneurs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article className="card">
                <span className="card-number">01</span>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Fondations & modèle</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Comprendre l&apos;IA OFM, créer votre avatar, définir l&apos;identité et produire le contenu.
                </p>
              </article>
              <article className="card">
                <span className="card-number">02</span>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Monétisation & trafic</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Mettre en place les plateformes, attirer du trafic et convertir en abonnés.
                </p>
              </article>
              <article className="card">
                <span className="card-number">03</span>
                <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Conversations & scaling</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Gérer les échanges, monétiser les conversations et développer plusieurs modèles.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Citation mindset */}
        <section className="mindset-block" aria-label="Citation">
          <div className="container max-w-2xl mx-auto text-center">
            <p className="mindset-quote text-[var(--accent)]">
              « L&apos;investissement le plus rentable que vous puissiez faire est en vous-même. »
            </p>
            <p className="text-[var(--text-muted)] mt-4 text-sm">
              Ceux qui construisent leur liberté financière ont tous commencé par une décision.
            </p>
          </div>
        </section>

        {/* Avantages */}
        <section id="avantages" className="section" aria-labelledby="avantages-title">
          <div className="container">
            <p className="section-label text-center">Avantages</p>
            <h2 id="avantages-title" className="section-title text-center">Pourquoi choisir cette formation ?</h2>
            <p className="section-subtitle text-center mb-12">
              Une formation conçue pour ceux qui veulent des résultats, pas seulement de la théorie.
            </p>
            <ul className="max-w-[560px] mx-auto" role="list">
              {[
                { title: "Accès à vie", desc: "— Consultez les modules quand vous voulez." },
                { title: "Accompagnement personnalisé", desc: "— Un vrai suivi à vos côtés, réponses en moins de 24h." },
                { title: "Méthode structurée", desc: "— Un parcours clair, étape par étape, de A à Z." },
                { title: "Prompts et scripts fournis", desc: "— Des outils prêts à l'emploi pour gagner du temps." },
                { title: "Applications concrètes", desc: "— Méthodes éprouvées, exemples réels et tout le nécessaire pour piloter votre activité." },
                { title: "Téléchargement PDF", desc: "— Formation complète ou module par module, à garder hors ligne." },
              ].map((item, i) => (
                <li key={i} className="avantage-item">
                  <span className="avantage-icon" aria-hidden>✓</span>
                  <div className="text-[var(--text-secondary)] text-sm">
                    <strong className="text-[var(--text)]">{item.title}</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tarifs */}
        <section id="tarifs" className="section section-alt relative" aria-labelledby="tarifs-title">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center mb-14">
              <p className="mindset-quote text-[var(--text)] mb-2">
                Votre avenir vaut plus que le prix de cette formation.
              </p>
              <p className="text-[var(--text-muted)] text-sm">
                Un seul paiement. Un accès illimité. Une décision qui peut tout changer.
              </p>
            </div>
            <p className="section-label text-center">Offres</p>
            <h2 id="tarifs-title" className="section-title text-center">Choisissez votre formule</h2>
            <p className="section-subtitle text-center mb-12">Investissez à la hauteur de vos ambitions.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <article className="pricing-card">
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1 mt-0">Essentiel</h3>
                <p className="text-[var(--text-muted)] text-sm mb-6">Pour apprendre à votre rythme</p>
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[var(--accent)]">57 €</span>
                  <span className="block text-sm text-[var(--text-muted)] mt-0.5">paiement unique</span>
                </div>
                <ul className="price-features mb-6">
                  <li>Accès à tous les modules</li>
                  <li>Accès à vie</li>
                </ul>
                <Link href="/checkout?plan=essentiel" className="btn btn-outline btn-block font-semibold">
                  Rejoindre — Essentiel
                </Link>
              </article>

              <article className="pricing-card featured">
                <span className="pricing-badge">Recommandé</span>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1 mt-6">Pro</h3>
                <p className="text-[var(--text-muted)] text-sm mb-6">Le plus populaire</p>
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[var(--accent)]">127 €</span>
                  <span className="block text-sm text-[var(--text-muted)] mt-0.5">paiement unique</span>
                </div>
                <ul className="price-features mb-6">
                  <li>Tout Essentiel</li>
                  <li>Support prioritaire</li>
                  <li>2 sessions de coaching (1h)</li>
                </ul>
                <Link href="/checkout?plan=pro" className="btn btn-primary btn-block font-semibold">
                  Rejoindre — Pro
                </Link>
              </article>

              <article className="pricing-card">
                <h3 className="text-xl font-semibold text-[var(--text)] mb-1 mt-0">Premium</h3>
                <p className="text-[var(--text-muted)] text-sm mb-6">Accompagnement maximal</p>
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[var(--accent)]">217 €</span>
                  <span className="block text-sm text-[var(--text-muted)] mt-0.5">paiement unique</span>
                </div>
                <ul className="price-features mb-6">
                  <li>Tout Pro</li>
                  <li>5 sessions de coaching</li>
                  <li>Revue personnalisée de vos projets</li>
                  <li>Groupe privé communauté</li>
                </ul>
                <Link href="/checkout?plan=premium" className="btn btn-outline btn-block font-semibold">
                  Rejoindre — Premium
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="container">
            <p className="section-label text-center">Contact</p>
            <h2 id="contact-title" className="section-title text-center">Une question ?</h2>
            <p className="section-subtitle text-center mb-12">
              On vous répond en moins de 24h. Les décideurs posent des questions avant d&apos;investir.
            </p>
            <form className="max-w-[480px] mx-auto" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" required placeholder="Votre nom" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="votre@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} required placeholder="Votre message..." />
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-full mt-2">
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="text-lg font-bold text-[var(--text)]">
                Digital<span className="text-[var(--accent)]"> Desire</span>
              </Link>
            </div>
            <p className="footer-quote text-sm text-[var(--accent)] font-medium max-w-xs mx-auto md:mx-0">
              Ceux qui agissent aujourd&apos;hui construisent demain.
            </p>
            <p className="footer-legal text-sm text-[var(--text-muted)]">
              © 2025 Digital Desire. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
