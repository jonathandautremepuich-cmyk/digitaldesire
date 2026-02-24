/**
 * Export PDF de la formation (intégral ou par module).
 * Mise en page ergonomique avec logo Digital Desire.
 */
import type { jsPDF } from "jspdf";
import {
  MODULES,
  BONUS,
  RESULTAT_FINAL,
  getModuleById,
  getBonus,
  getResultatFinal,
} from "./modules-data";
import type { Category } from "./modules-data";

const MARGIN = 22;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MAX_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT_BODY = 6.5;
const LINE_HEIGHT_TITLE = 10;
const TITLE_SIZE = 16;
const MODULE_TITLE_SIZE = 20;
const CATEGORY_TITLE_SIZE = 12;
const BODY_SIZE = 10.5;
const ACCENT_R = 16;
const ACCENT_G = 185;
const ACCENT_B = 129;

const HEADER_TOP = 12;
const HEADER_LINE_Y = 18;
const CONTENT_TOP = 26;
const FOOTER_Y = 285;
const CONTENT_BOTTOM = 278;

let currentPage = 1;

function addPageHeader(doc: jsPDF): void {
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 25, 30);
  doc.text("Digital", MARGIN, HEADER_TOP);
  const w1 = doc.getTextDimensions("Digital").w;
  doc.setTextColor(ACCENT_R, ACCENT_G, ACCENT_B);
  doc.text(" Desire", MARGIN + w1, HEADER_TOP);
  doc.setDrawColor(ACCENT_R, ACCENT_G, ACCENT_B);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, HEADER_LINE_Y, PAGE_WIDTH - MARGIN, HEADER_LINE_Y);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
}

function addPageFooter(doc: jsPDF): void {
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, FOOTER_Y - 4, PAGE_WIDTH - MARGIN, FOOTER_Y - 4);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text("Digital Desire — Formation IA OFM", MARGIN, FOOTER_Y + 2);
  doc.text(`Page ${currentPage}`, PAGE_WIDTH - MARGIN, FOOTER_Y + 2, { align: "right" });
  doc.setTextColor(0, 0, 0);
}

function ensureSpaceAndHeader(doc: jsPDF, needY: number): number {
  if (needY > CONTENT_BOTTOM) {
    addPageFooter(doc);
    doc.addPage();
    currentPage += 1;
    addPageHeader(doc);
    return CONTENT_TOP;
  }
  return needY;
}

function wrapLines(doc: jsPDF, text: string, maxWidth: number, fontSize: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split(/\n/);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);
  for (const para of paragraphs) {
    if (!para.trim()) {
      lines.push("");
      continue;
    }
    const words = para.split(/\s+/);
    let current = "";
    for (const w of words) {
      const test = current ? `${current} ${w}` : w;
      const width = doc.getTextDimensions(test).w;
      if (width > maxWidth && current) {
        lines.push(current);
        current = w;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

function addText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  maxWidth: number,
  lineHeight: number = LINE_HEIGHT_BODY
): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);
  const lines = wrapLines(doc, text, maxWidth, fontSize);
  for (const line of lines) {
    y = ensureSpaceAndHeader(doc, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

function addCategory(doc: jsPDF, cat: Category, index: number, x: number, y: number): number {
  y = ensureSpaceAndHeader(doc, y);
  if (y > CONTENT_BOTTOM - 25) {
    addPageFooter(doc);
    doc.addPage();
    currentPage += 1;
    addPageHeader(doc);
    y = CONTENT_TOP;
  }
  doc.setDrawColor(ACCENT_R, ACCENT_G, ACCENT_B);
  doc.setLineWidth(0.3);
  doc.line(x, y - 2, PAGE_WIDTH - MARGIN, y - 2);
  y += 4;
  doc.setFontSize(CATEGORY_TITLE_SIZE);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(ACCENT_R, ACCENT_G, ACCENT_B);
  const title = `${String(index + 1).padStart(2, "0")}. ${cat.title}`;
  doc.text(title, x, y);
  doc.setTextColor(0, 0, 0);
  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.15);
  doc.line(x, y + 1, PAGE_WIDTH - MARGIN, y + 1);
  y += LINE_HEIGHT_BODY + 4;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  const content = cat.content.trim() || "Contenu à remplir";
  y = addText(doc, content, x, y, BODY_SIZE, MAX_WIDTH);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  return y;
}

function addModuleToDoc(
  doc: jsPDF,
  title: string,
  objective: string | undefined,
  intro: string | undefined,
  categories: Category[],
  startY: number
): number {
  let y = ensureSpaceAndHeader(doc, startY);
  if (y > CONTENT_BOTTOM - 40) {
    addPageFooter(doc);
    doc.addPage();
    currentPage += 1;
    addPageHeader(doc);
    y = CONTENT_TOP;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(MODULE_TITLE_SIZE);
  doc.setTextColor(25, 25, 30);
  doc.text(title, MARGIN, y);
  y += 4;
  doc.setDrawColor(ACCENT_R, ACCENT_G, ACCENT_B);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y + 2, Math.min(MARGIN + 80, PAGE_WIDTH - MARGIN), y + 2);
  doc.setTextColor(0, 0, 0);
  y += LINE_HEIGHT_TITLE + 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  if (objective) {
    doc.setTextColor(60, 60, 65);
    y = addText(doc, `Objectif : ${objective}`, MARGIN, y, BODY_SIZE, MAX_WIDTH);
    doc.setTextColor(0, 0, 0);
    y += 6;
  }
  if (intro) {
    y = addText(doc, intro, MARGIN, y, BODY_SIZE, MAX_WIDTH);
    y += 12;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  for (let i = 0; i < categories.length; i++) {
    y = addCategory(doc, categories[i], i, MARGIN, y);
  }
  return y + 8;
}

function initPdfWithCover(doc: jsPDF, title: string, subtitle: string): number {
  currentPage = 1;
  addPageHeader(doc);
  let y = CONTENT_TOP + 20;
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 25, 30);
  doc.text("Digital", MARGIN, y);
  const w1 = doc.getTextDimensions("Digital").w;
  doc.setTextColor(ACCENT_R, ACCENT_G, ACCENT_B);
  doc.text(" Desire", MARGIN + w1, y);
  doc.setTextColor(0, 0, 0);
  y += 14;
  doc.setFontSize(TITLE_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text(title, MARGIN, y);
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(BODY_SIZE);
  doc.setTextColor(100, 100, 105);
  doc.text(subtitle, MARGIN, y);
  doc.setTextColor(0, 0, 0);
  y += 20;
  return y;
}

export async function downloadFormationPdf(): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  let y = initPdfWithCover(
    doc,
    "Formation complète — IA OFM",
    "Document généré depuis Ma Formation. Tous les modules et le bonus."
  );

  for (const mod of MODULES) {
    addPageFooter(doc);
    doc.addPage();
    currentPage += 1;
    addPageHeader(doc);
    y = CONTENT_TOP;
    y = addModuleToDoc(
      doc,
      `Module ${mod.number} — ${mod.title}`,
      mod.objective,
      mod.intro,
      mod.categories,
      y
    );
  }

  addPageFooter(doc);
  doc.addPage();
  currentPage += 1;
  addPageHeader(doc);
  y = addModuleToDoc(doc, BONUS.title, undefined, BONUS.intro, BONUS.categories, CONTENT_TOP);

  addPageFooter(doc);
  doc.addPage();
  currentPage += 1;
  addPageHeader(doc);
  y = addModuleToDoc(
    doc,
    RESULTAT_FINAL.title,
    undefined,
    RESULTAT_FINAL.intro,
    RESULTAT_FINAL.categories,
    CONTENT_TOP
  );

  addPageFooter(doc);
  doc.save("digital-desire-formation-complete.pdf");
}

export async function downloadModulePdf(moduleId: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  currentPage = 1;
  addPageHeader(doc);

  if (moduleId === "bonus") {
    const bonus = getBonus();
    const y = addModuleToDoc(doc, bonus.title, undefined, bonus.intro, bonus.categories, CONTENT_TOP);
    ensureSpaceAndHeader(doc, y);
    addPageFooter(doc);
    doc.save("digital-desire-bonus.pdf");
    return;
  }
  if (moduleId === "resultat") {
    const res = getResultatFinal();
    const y = addModuleToDoc(doc, res.title, undefined, res.intro, res.categories, CONTENT_TOP);
    ensureSpaceAndHeader(doc, y);
    addPageFooter(doc);
    doc.save("digital-desire-resultat-final.pdf");
    return;
  }

  const mod = getModuleById(moduleId);
  if (!mod) return;
  const y = addModuleToDoc(
    doc,
    `Module ${mod.number} — ${mod.title}`,
    mod.objective,
    mod.intro,
    mod.categories,
    CONTENT_TOP
  );
  ensureSpaceAndHeader(doc, y);
  addPageFooter(doc);
  doc.save(`digital-desire-module-${mod.number}.pdf`);
}
