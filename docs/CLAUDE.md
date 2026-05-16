# CLAUDE.md — Contesto progetto Aroma Bistrot

> Questo file è la memoria del progetto per Claude Code.
> Aggiornalo quando cambiano decisioni architetturali rilevanti.

---

## Identità del progetto

**Cliente:** Aroma Bistrot — ristorante, Offanengo (CR)
**Tipo:** Sito web editoriale premium per ristorante
**Lingua:** Italiano
**Obiettivo centrale:** Piattaforma digitale viva che racconta il locale. La proprietaria gestisce tutto in autonomia dal CMS — testi, menu, eventi, foto — senza mai coinvolgere un tecnico.

---

## Stack tecnico

| Layer | Tecnologia | Versione | Note |
|---|---|---|---|
| Frontend | Next.js App Router | 14.2 | SSG + ISR, Server Components, `<Image>` ottimizzata |
| Linguaggio | TypeScript | 5 (strict) | Type safety su tutto il progetto |
| Styling | Tailwind CSS | 3 | Nessun CSS custom, design system in `tailwind.config.ts` |
| Animazioni | Framer Motion | 11 | Fade-in scroll, parallax hero, FloatingCTA, Lightbox |
| CMS | Sanity | v3 | Headless, GROQ, CDN immagini integrato |
| Hosting | Vercel | — | Deploy auto su push `main`, CDN globale |
| Font | next/font | — | `Cormorant_Garamond` (serif) + `Inter` (sans) — nessuna chiamata esterna |
| Icone | lucide-react | — | Tree-shakable, nessuna icona decorativa vuota |
| Classi CSS | clsx + tailwind-merge | — | Sempre usati insieme per gestire classi condizionali |

**Config files:** `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.js`
**Nota:** `next.config.ts` non è supportato da Next.js 14.2 — usare `.mjs`.

---

## Struttura cartelle

```
/app              → pagine Next.js App Router (layout.tsx, page.tsx per ogni route)
/components
  /ui             → atomici: Button, Badge, Card, SectionLabel
  /layout         → strutturali: Navbar, Footer, FloatingCTA
  /shared         → riutilizzabili: ImageGallerySlider, EditorialGrid, Lightbox, EventCard, PageHero
/sections         → sezioni specifiche per pagina (home/, menu/, galleria/, about/, vini/, eventi/)
/sanity
  /schemas        → definizione content type Sanity (uno schema per file)
  /lib            → client.ts (client Sanity + urlFor) e queries.ts (tutte le GROQ)
/lib              → utils.ts (cn, formatDate, formatPrice) e metadata.ts (helper OG)
/hooks            → useScrollDirection.ts, useLightbox.ts
/types            → index.ts (TypeScript types derivati dagli schema Sanity)
/styles           → globals.css (reset + direttive Tailwind)
/public/images    → logo.svg, logo-white.svg, og-default.jpg, favicon.ico
/docs             → CLAUDE.md (questo file), TASKS.md (task board)
```

---

## Design system

### Palette colori

| Token | Valore | Uso |
|---|---|---|
| `background` | `#FAF8F4` | Sfondo principale — off-white caldo |
| `foreground` | `#1C1C1A` | Testo principale — nero morbido |
| `accent` | `#8B6F47` | Bronzo — CTA, dettagli, badge (da affinare con la proprietaria) |
| `muted` | `#E8E4DC` | Sfondi sezioni alternate, elementi attenuati |
| `border` | `#DEDBD4` | Separatori e bordi — quasi impercettibili |

Nessun colore saturo. Nessun gradiente. Nessun effetto plastico.

### Tipografia

- **Serif** (`--font-serif`): Cormorant Garamond — titoli, prezzi, citazioni. Trasmette qualità e tradizione.
- **Sans** (`--font-sans`): Inter — corpo testo, interfaccia, label. Trasmette modernità e chiarezza.
- **Label categorie** (es. "ANTIPASTI", "PROSSIMI EVENTI"): tutto maiuscolo, letter-spacing ampio, dimensione XS, font sans. Implementato con `<SectionLabel>`.

### Principi UI

- **Mobile-first assoluto** — si progetta da 390px verso il desktop, mai il contrario
- **Ritmo visivo** — ogni pagina alterna testo, immagini, spazio vuoto; mai due sezioni uguali in sequenza
- **Animazioni leggere** — fade-in scroll, parallax hero leggero, micro-transizioni hover; niente che distragga
- **Nessun elemento decorativo vuoto** — ogni elemento ha funzione; via divider ornamentali e icone decorative

---

## Convenzioni di codice

- **TypeScript strict** — nessun `any`, tipi derivati dagli schema Sanity in `types/index.ts`
- **Nessun hardcoding** — ogni testo, numero di telefono, orario, immagine viene letto da Sanity
- **Server Components per il fetch dati** — il fetch avviene lato server; nessun loader visibile, nessuna API esposta nel browser. Solo i componenti che usano stato o eventi browser sono `"use client"`
- **Classi Tailwind** — sempre con `cn()` da `lib/utils.ts` (wrapper clsx + tailwind-merge)
- **Immagini** — sempre con `<Image>` di Next.js; alt text obbligatorio; `priority` sull'immagine LCP; `placeholder="blur"` dove possibile
- **Commenti nel codice** — solo quando il "perché" è non ovvio; nessun commento descrittivo del "cosa"

---

## CMS Sanity — collection

| Schema | Tipo | Contenuto |
|---|---|---|
| `settings` | Singleton | Dati globali: telefono, WhatsApp, indirizzo, orari, Instagram, email, OG default |
| `menuCategories` | Multiplo | Categorie menu con ordine (Antipasti, Primi, Secondi, Dessert) |
| `menuItems` | Multiplo | Piatti: nome, descrizione, prezzo, categoria, tag, allergeni, visibile, ordine |
| `menuGallery` | Multiplo (1 attiva) | Galleria fotografica stagionale del menu — una sola attiva per volta |
| `siteGallery` | Singleton | Tutte le foto del locale non legate al menu |
| `events` | Multiplo | Eventi: titolo, slug, data, immagine, descrizione, stato (prossimo/passato) |
| `wineHighlights` | Multiplo | Bottiglie in evidenza: nome, cantina, territorio, descrizione |
| `about` | Singleton | Contenuto pagina Il Bistrot: storia, filosofia, immagini |
| `homepageConfig` | Singleton | Configurazione homepage: immagini hero, testi, piatti in evidenza, sezioni visibili |
| `pages` | Multiplo | Titoli e testi introduttivi delle pagine (menu, galleria, vini, eventi, contatti) |

---

## Pagine del sito

| Pagina | Route | Rendering | Priorità |
|---|---|---|---|
| Homepage | `/` | SSG + ISR | Massima |
| Menu sera | `/menu` | SSG + ISR | Massima |
| Galleria | `/galleria` | SSG + ISR | Alta |
| Il Bistrot | `/il-bistrot` | SSG | Alta |
| Vini | `/vini` | SSG + ISR | Media |
| Lista eventi | `/eventi` | SSG + ISR | Alta |
| Singolo evento | `/eventi/[slug]` | SSG dinamico | Alta |
| Contatti | `/contatti` | SSG | Alta |

---

## Regole operative

1. **Una task alla volta** — si completa, si testa nel browser, si committa, poi si avanza
2. **`docs/TASKS.md` aggiornato ad ogni sessione** — task avviate, completate, blocchi, note
3. **`docs/CLAUDE.md` aggiornato solo quando cambiano decisioni architetturali** — non ad ogni sessione
4. **Branch separato per ogni task** — `task/NNN-descrizione`, poi merge su `main` a task completata
5. **Commit frequenti** — dopo ogni componente o feature funzionante
6. **Nessun hardcoding** — qualsiasi dato che potrebbe cambiare nel tempo va nel CMS Sanity
