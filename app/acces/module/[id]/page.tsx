"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  getModuleById,
  getBonus,
  getResultatFinal,
} from "../../modules-data";
import { downloadModulePdf } from "../../pdf-export";
import type { Category } from "../../modules-data";

type SectionData = {
  title: string;
  objective?: string;
  intro?: string;
  categories: Category[];
};

function CategoryBlock({
  category,
  index,
  isOpen,
  onToggle,
}: {
  category: Category;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasContent = category.content.trim().length > 0;
  return (
    <section className="mb-2 border border-[var(--border)] rounded-lg overflow-hidden" id={category.id}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-4 flex items-center justify-between gap-3 bg-[var(--bg-elevated)] hover:bg-[var(--border)] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex items-baseline gap-2">
          <span className="text-[var(--accent)] font-mono text-sm shrink-0">
            {String(index + 1).padStart(2, "0")}.
          </span>
          <span className="font-semibold text-[var(--text)]">{category.title}</span>
        </span>
        <span
          className={`shrink-0 text-[var(--text-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          className={`border-t border-[var(--border)] ${
            hasContent
              ? "p-5 pl-6 pr-6 pb-8 text-[var(--text-content)] text-[1.0625rem] leading-[1.8] whitespace-pre-wrap"
              : "min-h-[4rem] border border-dashed border-[var(--border)] rounded m-2 mt-0 p-4 text-sm italic text-[var(--text-muted)]"
          }`}
        >
          {hasContent ? (
            <div className="module-content">{category.content}</div>
          ) : (
            <span>Contenu à remplir</span>
          )}
        </div>
      )}
    </section>
  );
}

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : null;
  const [allowed, setAllowed] = useState(false);
  const [data, setData] = useState<SectionData | null>(null);
  const [label, setLabel] = useState("");
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [downloading, setDownloading] = useState(false);

  const toggleCategory = useCallback((categoryId: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const access = window.sessionStorage.getItem("formation_access");
    const planId = window.sessionStorage.getItem("formation_plan");
    const validPlans = ["essentiel", "pro", "premium"];
    const hasValidPlan = planId && validPlans.includes(planId);
    if (access !== "true" || !hasValidPlan) {
      window.sessionStorage.removeItem("formation_access");
      window.sessionStorage.removeItem("formation_plan");
      router.replace("/#tarifs");
      return;
    }
    setAllowed(true);
  }, [router]);

  useEffect(() => {
    if (!id) return;
    if (id === "bonus") {
      const bonus = getBonus();
      setData({
        title: bonus.title,
        intro: bonus.intro,
        categories: bonus.categories,
      });
      setLabel("BONUS");
    } else if (id === "resultat") {
      const resultat = getResultatFinal();
      setData({
        title: resultat.title,
        intro: resultat.intro,
        categories: resultat.categories,
      });
      setLabel("RÉSULTAT FINAL");
    } else {
      const mod = getModuleById(id);
      if (mod) {
        setData({
          title: mod.title,
          objective: mod.objective,
          intro: mod.intro,
          categories: mod.categories,
        });
        setLabel(`MODULE ${mod.number}`);
      } else {
        setData(null);
      }
    }
    setOpenCategories(new Set());
  }, [id]);

  const handleDownloadPdf = useCallback(async () => {
    if (!id) return;
    setDownloading(true);
    try {
      await downloadModulePdf(id);
    } finally {
      setDownloading(false);
    }
  }, [id]);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Redirection...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-[var(--text-muted)]">Module introuvable.</p>
        <Link href="/acces" className="btn btn-outline">
          Retour à Ma Formation
        </Link>
      </div>
    );
  }

  const prevModule =
    id === "bonus"
      ? { href: `/acces/module/8`, label: "Module 8" }
      : id === "resultat"
        ? { href: "/acces/module/bonus", label: "Bonus" }
        : id && ["1", "2", "3", "4", "5", "6", "7", "8"].includes(id)
          ? Number(id) > 1
            ? { href: `/acces/module/${Number(id) - 1}`, label: `Module ${Number(id) - 1}` }
            : null
          : null;

  const nextModule =
    id === "bonus"
      ? { href: "/acces/module/resultat", label: "Résultat final" }
      : id === "resultat"
        ? null
        : id && ["1", "2", "3", "4", "5", "6", "7", "8"].includes(id)
          ? Number(id) < 8
            ? { href: `/acces/module/${Number(id) + 1}`, label: `Module ${Number(id) + 1}` }
            : { href: "/acces/module/bonus", label: "Bonus" }
          : null;

  return (
    <div className="min-h-screen">
      {/* Espace en haut pour pouvoir défiler jusqu'en haut */}
      <div className="h-20 shrink-0" aria-hidden />
      <header className="header">
        <nav className="nav flex items-center justify-between max-w-[1100px] mx-auto px-6 py-4">
          <Link href="/" className="text-lg font-bold">
            Digital<span className="text-[var(--accent)]"> Desire</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/acces"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              ← Ma Formation
            </Link>
          </div>
        </nav>
      </header>

      <main className="container pt-24 pb-24 max-w-3xl mx-auto">
        <Link
          href="/acces"
          className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] mb-6"
        >
          ← Tous les modules
        </Link>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wide">
            {label}
          </p>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="btn btn-outline text-sm py-2"
          >
            {downloading ? "Génération…" : "Télécharger ce module (PDF)"}
          </button>
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold mb-4">
          {data.title}
        </h1>
        {data.objective && (
          <p className="text-[var(--accent)] font-medium mb-2">
            Objectif : {data.objective}
          </p>
        )}
        {data.intro && (
          <p className="text-[var(--text-content)] text-[1.0625rem] leading-[1.75] mb-8 max-w-[65ch]">{data.intro}</p>
        )}

        <div className="border-t border-[var(--border)] pt-6">
          {data.categories.map((cat, i) => (
            <CategoryBlock
              key={cat.id}
              category={cat}
              index={i}
              isOpen={openCategories.has(cat.id)}
              onToggle={() => toggleCategory(cat.id)}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-[var(--border)]">
          {prevModule && (
            <Link href={prevModule.href} className="btn btn-outline">
              ← {prevModule.label}
            </Link>
          )}
          {nextModule && (
            <Link href={nextModule.href} className="btn btn-primary ml-auto">
              {nextModule.label} →
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
