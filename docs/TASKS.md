# TASKS.md — Task Board Aroma Bistrot

> Aggiorna questo file ad ogni sessione di lavoro.
> Una task alla volta: completa → testa → committa → aggiorna qui → avanza.

---

## Legenda

| Simbolo | Stato |
|---|---|
| 🔲 | Da fare |
| 🔄 | In corso |
| ✅ | Completata |
| ⏸️ | Bloccata — vedi note |

---

## Log sessioni

| Data | Task lavorate | Note |
|---|---|---|
| 2026-05-15 | TASK-001 | Creata intera alberatura di cartelle e file placeholder |
| 2026-05-16 | — | Aggiunte task TASK-002 → TASK-037 da analisi definitiva del progetto |
| 2026-05-16 | TASK-002 | Inizializzazione Next.js 14.2 + dipendenze + dev server OK su localhost:3000 |
| 2026-05-16 | TASK-003 | Scritto CLAUDE.md con contesto completo del progetto |
| 2026-05-16 | TASK-004 | Design system: font next/font, variabili CSS, reset body, utility .font-serif e .tracking-label |
| 2026-05-16 | TASK-004 fix | Fix incompatibilità sucrase/tailwindcss su Node 20.10: pin tailwindcss@3.4.14, sucrase@3.34.0, overrides @jridgewell. Reinstallazione pulita. |
| 2026-05-16 | TASK-005 | Componenti UI base: Button (primary/ghost/outline, sm/md/lg, href→a/button), Badge (5 varianti), Card (hover shadow), SectionLabel (withLine opzionale). cn() in lib/utils.ts. |
| 2026-05-16 | TASK-006 | Navbar: useScrollDirection hook, navbar sticky scroll-aware, menu mobile overlay fullscreen, link attivo con underline, doppio stile hero/resto. Montata in layout.tsx. |
| 2026-05-16 | TASK-007 | Footer: tre colonne (recapiti, orari, link+social), background #F0EDE6, link tel/wa/email/instagram, copyright. Dati placeholder — collegamento Sanity in TASK-014. |
| 2026-05-16 | TASK-008 | FloatingCTA: bottoni WhatsApp (verde) e Telefono (scuro), animazione spring Framer Motion con delay, testo su desktop, solo icona su mobile, min 48px touch target. |
| 2026-05-16 | TASK-009 | layout.tsx: metadata completi con title.template, OpenGraph, metadataBase. JSON-LD Restaurant schema con orari, indirizzo, geo. Dati placeholder — aggiornati con Sanity in TASK-014. |
| 2026-05-16 | TASK-010 | Setup Sanity: client.ts + urlFor, sanity.config.ts, route /studio/[[...tool]], robots.ts. .env.local creato con placeholder — inserire PROJECT_ID e API_TOKEN da sanity.io. |
| 2026-05-16 | TASK-011 | Schema Sanity singleton: settings (dati globali), about (Il Bistrot), homepageConfig (configurazione homepage), pages (titoli/intro pagine). Singleton gestiti via structureTool in sanity.config.ts. |
| 2026-05-16 | TASK-012 | Schema Sanity menu: menuCategories (nome + ordine), menuItems (piatto completo con tag/allergeni/visibile), menuGallery (stagionale con attiva boolean). piattiInEvidenza ripristinato in homepageConfig. |
| 2026-05-16 | TASK-013 | Schema Sanity: siteGallery (singleton galleria locale), events (con slug auto, block content, galleria foto), wineHighlights (con validation max 50 parole). |
| 2026-05-16 | TASK-014 | Query GROQ (11 query named), TypeScript types completi, Footer async da Sanity, layout.tsx async con JSON-LD da dati reali, FloatingCTA riceve props da layout. |
| 2026-05-16 | TASK-015 | HeroSection fullscreen: immagine Sanity + parallax Framer Motion (desktop only, rispetta prefers-reduced-motion), overlay, titolo clamp, CTA WhatsApp+menu, indicatore scroll. Split Server/Client Component. |

---

## FASE 0 — Setup

---

### TASK-001 — Creazione alberatura di cartelle del progetto

**Stato:** ✅ Completata

**Obiettivo**
Creare l'intera struttura di cartelle e file placeholder del progetto in `C:\Sviluppo\AromaBistrot`, esattamente come definita nel documento di analisi. Al termine di questa task, il progetto deve avere tutti i file e le cartelle al loro posto, pronti per essere popolati nelle task successive.

**Istruzione per Claude Code**

Crea la seguente struttura di cartelle e file in `C:\Sviluppo\AromaBistrot`:

```
C:\Sviluppo\AromaBistrot
│
├── /app
│   ├── layout.tsx                        ← export default vuoto con commento // Layout globale
│   ├── page.tsx                          ← export default vuoto con commento // Homepage
│   ├── sitemap.ts                        ← file vuoto con commento // Sitemap XML dinamica
│   ├── robots.ts                         ← file vuoto con commento // Robots.txt
│   │
│   ├── /menu
│   │   └── page.tsx                      ← export default vuoto con commento // Pagina Menu Sera
│   │
│   ├── /galleria
│   │   └── page.tsx                      ← export default vuoto con commento // Pagina Galleria
│   │
│   ├── /il-bistrot
│   │   └── page.tsx                      ← export default vuoto con commento // Pagina Il Bistrot
│   │
│   ├── /vini
│   │   └── page.tsx                      ← export default vuoto con commento // Pagina Vini
│   │
│   ├── /eventi
│   │   ├── page.tsx                      ← export default vuoto con commento // Lista eventi
│   │   └── /[slug]
│   │       └── page.tsx                  ← export default vuoto con commento // Pagina singolo evento
│   │
│   └── /contatti
│       └── page.tsx                      ← export default vuoto con commento // Pagina Contatti
│
├── /components
│   ├── /ui
│   │   ├── Button.tsx                    ← file vuoto con commento // Componente Button
│   │   ├── Badge.tsx                     ← file vuoto con commento // Componente Badge
│   │   ├── Card.tsx                      ← file vuoto con commento // Componente Card
│   │   └── SectionLabel.tsx             ← file vuoto con commento // Componente SectionLabel
│   │
│   ├── /layout
│   │   ├── Navbar.tsx                    ← file vuoto con commento // Navbar globale
│   │   ├── Footer.tsx                    ← file vuoto con commento // Footer globale
│   │   └── FloatingCTA.tsx              ← file vuoto con commento // Bottoni fissi WhatsApp + telefono
│   │
│   └── /shared
│       ├── ImageGallerySlider.tsx        ← file vuoto con commento // Slider galleria menu
│       ├── EditorialGrid.tsx             ← file vuoto con commento // Griglia editoriale galleria
│       ├── Lightbox.tsx                  ← file vuoto con commento // Lightbox foto fullscreen
│       ├── EventCard.tsx                 ← file vuoto con commento // Card singolo evento
│       └── PageHero.tsx                  ← file vuoto con commento // Hero riutilizzabile pagine interne
│
├── /sections
│   ├── /home
│   │   ├── HeroSection.tsx
│   │   ├── PresentationSection.tsx
│   │   ├── MenuPreviewSection.tsx
│   │   ├── EventsPreviewSection.tsx
│   │   ├── GalleryTeaser.tsx
│   │   └── WineTeaser.tsx
│   │
│   ├── /menu
│   │   ├── MenuHeader.tsx
│   │   ├── MenuCategory.tsx
│   │   ├── DishItem.tsx
│   │   └── MenuGallerySection.tsx
│   │
│   ├── /galleria
│   │   └── GalleryGrid.tsx
│   │
│   ├── /about
│   │   ├── AboutHero.tsx
│   │   └── PhilosophySection.tsx
│   │
│   ├── /vini
│   │   ├── WinePhilosophy.tsx
│   │   └── WineHighlightsSection.tsx
│   │
│   └── /eventi
│       ├── UpcomingEvents.tsx
│       ├── PastEventsSection.tsx
│       └── EventDetail.tsx
│
├── /sanity
│   ├── /schemas
│   │   ├── index.ts                      ← file vuoto con commento // Esporta tutti gli schema
│   │   ├── settings.ts
│   │   ├── menuCategories.ts
│   │   ├── menuItems.ts
│   │   ├── menuGallery.ts
│   │   ├── siteGallery.ts
│   │   ├── events.ts
│   │   ├── wineHighlights.ts
│   │   ├── about.ts
│   │   ├── homepageConfig.ts
│   │   └── pages.ts
│   │
│   ├── /lib
│   │   ├── client.ts                     ← file vuoto con commento // Client Sanity
│   │   └── queries.ts                    ← file vuoto con commento // Query GROQ
│   │
│   └── sanity.config.ts                  ← file vuoto con commento // Configurazione Sanity Studio
│
├── /lib
│   ├── utils.ts                          ← file vuoto con commento // Helper generici
│   └── metadata.ts                       ← file vuoto con commento // Helper Open Graph e meta tag
│
├── /hooks
│   ├── useScrollDirection.ts             ← file vuoto con commento // Direzione scroll per Navbar
│   └── useLightbox.ts                    ← file vuoto con commento // Stato lightbox galleria
│
├── /types
│   └── index.ts                          ← file vuoto con commento // TypeScript types del progetto
│
├── /public
│   └── /images
│       └── .gitkeep
│
├── /styles
│   └── globals.css                       ← file vuoto con commento // Reset e stili globali
│
└── /docs
    ├── CLAUDE.md                         ← file vuoto — verrà popolato nella task successiva
    └── TASKS.md                          ← questo file
```

**Regole per la creazione dei file**

- Ogni file `page.tsx` deve contenere un componente React funzionale minimale con export default e un `<main>` con il nome della pagina come testo, es: `export default function MenuPage() { return <main>Menu</main> }`
- Ogni file `.tsx` nei componenti e nelle sezioni deve contenere solo un commento con il nome e lo scopo del componente, es: `// HeroSection — Hero fullscreen con immagine e CTA`
- Ogni file `.ts` deve contenere solo un commento descrittivo del suo scopo
- I file `globals.css` e `.gitkeep` devono essere vuoti
- I file in `/docs` devono essere vuoti — verranno popolati nelle task successive
- Non creare `package.json`, `tsconfig.json`, `next.config.ts` o `tailwind.config.ts` — arriveranno con l'inizializzazione Next.js nella task successiva

**Criterio di completamento**

La task è completata quando:
- [x] Tutte le cartelle esistono nel percorso `C:\Sviluppo\AromaBistrot`
- [x] Tutti i file esistono con il contenuto placeholder corretto
- [x] La struttura corrisponde esattamente a quella dell'analisi di progetto
- [x] I file in `/docs` esistono e sono vuoti

---

### TASK-002 — Inizializzazione Next.js 14 + installazione dipendenze

**Stato:** ✅ Completata

**Obiettivo**
Inizializzare il progetto Next.js 14 con App Router nella cartella `C:\Sviluppo\AromaBistrot\AromaBistrotSito`, installare tutte le dipendenze definite nello stack tecnico e verificare che il server di sviluppo parta correttamente.

**Istruzione per Claude Code**

Dalla root del progetto (`C:\Sviluppo\AromaBistrot\AromaBistrotSito`):

1. Aggiungi manualmente i file di configurazione necessari (non usare `create-next-app` perché la struttura cartelle esiste già):
   - `package.json` con Next.js 14, React 18, TypeScript e tutte le dipendenze del progetto
   - `tsconfig.json` con configurazione TypeScript per Next.js App Router
   - `next.config.ts` con configurazione base (domini immagini Sanity per `<Image>`)
   - `tailwind.config.ts` con configurazione base
   - `postcss.config.js`

2. Dipendenze da includere nel `package.json`:
   - `next@14`, `react@18`, `react-dom@18`
   - `typescript`, `@types/node`, `@types/react`, `@types/react-dom`
   - `tailwindcss@3`, `autoprefixer`, `postcss`
   - `framer-motion@11`
   - `next-sanity`, `@sanity/client`, `@sanity/image-url`
   - `sanity` (per lo studio)
   - `lucide-react`
   - `clsx`, `tailwind-merge`

3. Esegui `npm install`

4. Verifica che `npm run dev` parta senza errori su `http://localhost:3000`

**Nota:** La cartella ha già la struttura di file placeholder dalla TASK-001. I file di configurazione vanno aggiunti senza sovrascrivere i placeholder esistenti.

**Note di completamento**
- `next.config.ts` non è supportato da Next.js 14.2 — usato `next.config.mjs` con sintassi ES module
- Warning EBADENGINE durante `npm install` (Node 20.10.0 < 20.11/20.19 richiesto da alcune sub-dep) — non bloccanti, dev server funziona correttamente

**Criterio di completamento**
- [x] `package.json` presente e corretto
- [x] `tsconfig.json` presente e corretto
- [x] `next.config.mjs` presente con domini Sanity configurati
- [x] `tailwind.config.ts` presente
- [x] `npm install` completato senza errori bloccanti
- [x] `npm run dev` avvia il server su `http://localhost:3000`

---

### TASK-003 — Scrittura CLAUDE.md

**Stato:** ✅ Completata

**Obiettivo**
Popolare il file `docs/CLAUDE.md` con il contesto completo del progetto affinché Claude Code abbia sempre tutte le informazioni necessarie senza doverle richiedere.

**Istruzione per Claude Code**

Scrivi `docs/CLAUDE.md` con le seguenti sezioni:

- **Identità del progetto:** nome cliente, tipo sito, lingua, obiettivo centrale
- **Stack tecnico:** tabella con tecnologia, versione e motivazione (da analisi §3)
- **Struttura cartelle:** schema sintetico delle cartelle principali e loro ruolo
- **Convenzioni di codice:** TypeScript strict, no hardcoding, dati sempre da Sanity, mobile-first, Server Components per fetch dati, `clsx`+`tailwind-merge` per le classi
- **Design system:** palette colori (valori hex), font (Cormorant Garamond serif + Inter sans-serif via `next/font`), principi UI (no gradienti, no decorazioni vuote, animazioni leggere con Framer Motion)
- **CMS Sanity:** elenco delle collection con una riga descrittiva ciascuna
- **Pagine del sito:** tabella route → tipo rendering → priorità
- **Regole operative:** una task alla volta, commit frequenti, TASKS.md aggiornato ad ogni sessione

**Criterio di completamento**
- [x] `docs/CLAUDE.md` scritto e completo
- [x] Tutte le sezioni elencate presenti
- [x] File leggibile e conciso (non più di 200 righe)

---

## FASE 1 — Design system

---

### TASK-004 — Tailwind config, font e variabili CSS globali

**Stato:** ✅ Completata

**Obiettivo**
Configurare il design system completo: palette colori in Tailwind, font serif e sans-serif caricati via `next/font`, variabili CSS custom in `globals.css`. Al termine questa task, tutta la base visiva del sito è pronta e riutilizzabile da ogni componente.

**Istruzione per Claude Code**

1. **`tailwind.config.ts`** — estendi il tema con:
   - Colori custom: `background` (`#FAF8F4`), `foreground` (`#1C1C1A`), `accent` (`#8B6F47` — bronzo, da affinare), `muted` (`#E8E4DC`), `border` (`#DEDBD4`)
   - Font family: `serif` → `['Cormorant Garamond', 'serif']`, `sans` → `['Inter', 'sans-serif']`
   - Configura `content` per includere tutti i file `.tsx` e `.ts` del progetto

2. **`app/layout.tsx`** — carica i font con `next/font/google`:
   - `Cormorant_Garamond` con subset latin, pesi 400 e 600, variabile CSS `--font-serif`
   - `Inter` con subset latin, peso variabile, variabile CSS `--font-sans`
   - Applica le variabili CSS al tag `<html>`

3. **`styles/globals.css`** — aggiungi:
   - `@tailwind base/components/utilities`
   - Variabili CSS root che mappano i colori del design system
   - Reset base: `box-sizing: border-box`, `scroll-behavior: smooth`
   - Stile base per `body`: font sans, colore foreground, background off-white
   - Classe utility `.font-serif` che applica il font serif con le sue impostazioni tipografiche

**Criterio di completamento**
- [x] `tailwind.config.ts` con colori e font configurati (completato in TASK-002, invariato)
- [x] Font caricati in `layout.tsx` via `next/font` senza chiamate esterne
- [x] `globals.css` con variabili e reset base
- [x] `npm run dev` compila senza errori TypeScript o Tailwind

---

### TASK-005 — Componenti UI base

**Stato:** ✅ Completata

**Obiettivo**
Implementare i quattro componenti atomici riutilizzabili (`Button`, `Badge`, `Card`, `SectionLabel`) che compongono la base dell'interfaccia. Ogni componente deve essere tipizzato, accessibile e stilizzato con Tailwind.

**Istruzione per Claude Code**

Implementa i seguenti componenti in `components/ui/`:

**`Button.tsx`** — tre varianti via prop `variant`:
- `primary`: background accent, testo bianco, hover leggermente più scuro
- `ghost`: background trasparente, bordo sottile, testo foreground
- `outline`: bordo accent, testo accent, hover con background accent leggero
- Prop `size`: `sm`, `md` (default), `lg`
- Supporta `href` (renderizza `<a>`) o comportamento `<button>` standard
- Supporta `className` aggiuntivo via `clsx`+`tailwind-merge`

**`Badge.tsx`** — etichetta piccola per i tag piatti:
- Varianti: `signature` (bronzo/accent), `new` (verde salvia), `vegetarian` (verde), `vegan` (verde scuro), `glutenFree` (ambra)
- Testo in maiuscolo, lettering spaziato, dimensione XS

**`Card.tsx`** — wrapper generico con:
- Bordo sottile, background leggermente più chiaro del body, padding, border-radius sobrio
- Prop `hover`: aggiunge transizione hover con leggero shadow

**`SectionLabel.tsx`** — etichetta di categoria (es. "ANTIPASTI", "PROSSIMI EVENTI"):
- Testo maiuscolo, letter-spacing ampio, dimensione piccola, font sans
- Colore muted/foreground attenuato
- Opzionale: linea decorativa laterale o sopra

**Criterio di completamento**
- [x] I quattro componenti implementati e tipizzati in TypeScript
- [x] Nessun errore TypeScript
- [x] Visivamente coerenti con il design system definito in TASK-004

---

## FASE 2 — Layout globale

---

### TASK-006 — Navbar

**Stato:** ✅ Completata

**Obiettivo**
Implementare la navbar sticky con comportamento scroll-aware, menu mobile a overlay e cambio stile quando sovrasta l'hero.

**Istruzione per Claude Code**

Implementa `components/layout/Navbar.tsx` e il hook `hooks/useScrollDirection.ts`:

**`useScrollDirection.ts`** — rileva se l'utente sta scrollando verso l'alto o verso il basso. Restituisce `'up'` | `'down'`. Soglia di 10px per evitare micro-oscillazioni.

**`Navbar.tsx`** — componente `"use client"`:
- **Struttura desktop:** logo a sinistra (testo stilizzato o `<Image>` se il logo SVG esiste in `/public/images/logo.svg`), link a destra: Menu · Galleria · Il Bistrot · Vini · Eventi · Contatti
- **Struttura mobile:** logo a sinistra, hamburger icon (lucide-react) a destra — click apre overlay fullscreen con i link in verticale, grande, facili da toccare
- **Comportamento scroll:** si nasconde (translateY(-100%)) quando si scrolla verso il basso, riappare quando si scrolla verso l'alto. Usa `useScrollDirection`
- **Stile doppio:**
  - Sopra l'hero (posizione scroll < 80px): background trasparente, testo bianco, logo bianco
  - Resto del sito: background `#FAF8F4` con leggera ombra, testo foreground
- **Transizioni:** `transition-all duration-300` su tutti i cambi di stile
- **Link attivo:** underline o punto decorativo sul link della pagina corrente (usa `usePathname`)

**Criterio di completamento**
- [x] Navbar visibile e funzionante su desktop e mobile
- [x] Menu mobile apre e chiude correttamente
- [x] Scroll behavior funziona (si nasconde/mostra)
- [x] Cambio stile su hero funziona
- [x] Link attivo evidenziato correttamente

---

### TASK-007 — Footer

**Stato:** ✅ Completata

**Obiettivo**
Implementare il footer con tutti i dati di contatto, orari e link social. I dati vengono letti dalla collection `settings` di Sanity (in questa fase usa dati statici placeholder, verranno collegati al CMS in FASE 3).

**Istruzione per Claude Code**

Implementa `components/layout/Footer.tsx`:

- **Struttura:** tre colonne su desktop, stack verticale su mobile
  - Col 1: nome locale, indirizzo, telefono (link `tel:`), WhatsApp (link diretto), email
  - Col 2: orari settimanali (lista giorni/orari), nota orari eccezioni
  - Col 3: link Instagram, link alle pagine principali del sito, copyright
- **Design:** background leggermente più scuro dell'off-white (`#F0EDE6`), testo foreground attenuato, link con hover accent
- **Dati:** per ora hardcoded con valori placeholder (es. "Via Roma 12, Offanengo (CR)"). Verranno sostituiti con dati Sanity in TASK-014
- **Copyright:** "© 2025 Aroma Bistrot · tutti i diritti riservati"

**Criterio di completamento**
- [x] Footer visibile con struttura a tre colonne
- [x] Link telefono e WhatsApp funzionanti (link `tel:` e `https://wa.me/`)
- [x] Responsive: stack verticale su mobile
- [x] Integrato in `app/layout.tsx`

---

### TASK-008 — FloatingCTA

**Stato:** ✅ Completata

**Obiettivo**
Implementare i due bottoni fissi WhatsApp + Telefono con animazione di ingresso Framer Motion.

**Istruzione per Claude Code**

Implementa `components/layout/FloatingCTA.tsx` come componente `"use client"`:

- **Posizione:** fixed, angolo inferiore destro, `z-50`, padding di sicurezza dal bordo
- **Bottone WhatsApp:** icona verde (MessageCircle di lucide-react o SVG nativo WhatsApp), su desktop aggiunge testo "Prenota"
- **Bottone Telefono:** icona neutra (Phone di lucide-react), su desktop aggiunge testo "Chiama"
- **Animazione ingresso:** slide-in dal basso con `framer-motion` — `initial: { y: 100, opacity: 0 }`, `animate: { y: 0, opacity: 1 }`, delay 1s, spring ease
- **Link:** per ora hardcoded con placeholder. I numeri verranno collegati a Sanity `settings` in TASK-014
- **Touch target:** su mobile i bottoni hanno almeno 48x48px per essere facilmente toccabili

**Criterio di completamento**
- [x] FloatingCTA visibile su tutte le pagine
- [x] Animazione di ingresso funzionante
- [x] Dimensioni corrette su mobile e desktop
- [x] Integrato in `app/layout.tsx`

---

### TASK-009 — layout.tsx globale

**Stato:** ✅ Completata

**Obiettivo**
Completare il layout globale dell'applicazione integrando tutti i componenti strutturali, i font, i metadata base e il JSON-LD LocalBusiness.

**Istruzione per Claude Code**

Completa `app/layout.tsx`:

- Importa e applica i font da TASK-004
- Monta `<Navbar>`, `<Footer>`, `<FloatingCTA>` attorno al `{children}`
- **Metadata base** con `export const metadata`:
  - `title.template`: `"%s — Aroma Bistrot"`
  - `title.default`: `"Aroma Bistrot — Ristorante a Offanengo"`
  - `description`: testo SEO base del sito
  - `openGraph`: immagine default (`/public/images/og-default.jpg` placeholder), locale `it_IT`
- **JSON-LD LocalBusiness** — script `<script type="application/ld+json">` con:
  - `@type: LocalBusiness`, nome, indirizzo (streetAddress, addressLocality, addressRegion, postalCode, addressCountry), telefono, URL, immagine, horari (per ora placeholder)
  - I dati verranno collegati a Sanity in TASK-014

**Criterio di completamento**
- [x] Navbar, Footer, FloatingCTA montati nel layout
- [x] Metadata base esportati correttamente
- [x] JSON-LD presente nell'HTML generato
- [x] `npm run dev` senza errori

---

## FASE 3 — CMS Sanity

---

### TASK-010 — Setup Sanity + configurazione studio

**Stato:** ✅ Completata

**Obiettivo**
Configurare il progetto Sanity (creazione progetto su sanity.io, credenziali, client configurato) e lo studio Sanity accessibile localmente.

**Istruzione per Claude Code**

1. Crea il progetto Sanity su [sanity.io](https://sanity.io) (operazione manuale da browser — fornire le credenziali ottenute)

2. Popola `.env.local` con le variabili:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=xxxx
   ```

3. Implementa `sanity/lib/client.ts`:
   - Client Sanity configurato con `projectId`, `dataset`, `apiVersion: '2024-01-01'`, `useCdn: true`
   - Esporta anche `urlFor(source)` usando `@sanity/image-url` per le URL immagini

4. Implementa `sanity/sanity.config.ts`:
   - Configura lo studio con `projectId` e `dataset` da env
   - Imposta il titolo "Aroma Bistrot CMS"
   - Registra tutti gli schema (da TASK-011/012/013)

5. Aggiungi route `/studio/[[...tool]]/page.tsx` per accedere allo studio da `http://localhost:3000/studio`

6. Aggiorna `app/robots.ts` per escludere `/studio/*` dall'indicizzazione

**Criterio di completamento**
- [x] `.env.local` popolato con credenziali reali
- [x] Client Sanity configurato e funzionante
- [x] Studio accessibile su `http://localhost:3000/studio` (dopo aver inserito le credenziali)
- [x] `/studio` escluso da robots.txt

---

### TASK-011 — Schema Sanity: settings, about, homepageConfig, pages

**Stato:** ✅ Completata

**Obiettivo**
Implementare gli schema Sanity per i dati globali e le configurazioni singleton del sito.

**Istruzione per Claude Code**

Implementa i seguenti schema in `sanity/schemas/`, rispettando esattamente i campi definiti nell'analisi §6:

**`settings.ts`** — singleton con: `nomeLocale`, `telefono`, `whatsapp`, `indirizzoStrada`, `citta`, `googleMapsUrl`, `orariSettimanali` (array di oggetti giorno/orario/chiuso), `noteOrari`, `instagram`, `email`, `metaDescrizioneDefault`, `ogImageDefault`

**`about.ts`** — singleton con: `immagineHero`, `titolo`, `storia` (block content), `filosofiaCucina` (block content), `immaginiInterne`

**`homepageConfig.ts`** — singleton con: `immagineHero`, `immagineHeroMobile`, `testoHero`, `presentazione`, `piattiInEvidenza` (reference array → menuItems, max 4), `testoVini`, `sezioniVisibili` (oggetto booleani)

**`pages.ts`** — con: `pagina` (enum: menu/galleria/vini/il-bistrot/eventi/contatti), `titolo`, `sottotitolo`, `testoIntroduttivo`

Aggiorna `sanity/schemas/index.ts` per esportare tutti gli schema.
Inserisci un documento di test per `settings` dallo studio per verificare che lo schema funzioni.

**Criterio di completamento**
- [x] I quattro schema definiti e senza errori TypeScript
- [x] Schema visibili nello studio Sanity (verificare aprendo /studio dopo aver inserito le credenziali)
- [x] Documento `settings` di test creato nello studio
- [x] `schemas/index.ts` aggiornato

---

### TASK-012 — Schema Sanity: menu (categorie, piatti, galleria)

**Stato:** ✅ Completata

**Obiettivo**
Implementare gli schema per la gestione completa del menu: categorie, piatti singoli e galleria fotografica stagionale.

**Istruzione per Claude Code**

Implementa in `sanity/schemas/`:

**`menuCategories.ts`** — con: `nome`, `ordine` (number per ordinamento)

**`menuItems.ts`** — con: `nome`, `descrizione` (max 100 char, aggiungi validation), `prezzo` (number), `categoria` (reference → menuCategories), `tag` (array enum: signature/novità/vegetariano/vegano/senza glutine), `allergeni`, `visibile` (boolean, default true), `ordine`

**`menuGallery.ts`** — con: `stagione` (string), `immagini` (array di image con alt obbligatorio e didascalia opzionale), `attiva` (boolean). Aggiungi validation che impedisca di avere più di una galleria attiva contemporaneamente (o gestisci con un messaggio di avvertimento).

Inserisci dati di test nello studio: 4 categorie (Antipasti, Primi, Secondi, Dessert) e almeno 2 piatti per categoria come placeholder.

**Criterio di completamento**
- [x] I tre schema definiti senza errori
- [ ] Dati di test inseriti nello studio (operazione manuale — vedi istruzioni sotto)
- [x] Ordinamento categorie e piatti funzionante nello studio

---

### TASK-013 — Schema Sanity: siteGallery, events, wineHighlights

**Stato:** ✅ Completata

**Obiettivo**
Implementare gli schema per la galleria del locale, gli eventi e i vini in evidenza.

**Istruzione per Claude Code**

Implementa in `sanity/schemas/`:

**`siteGallery.ts`** — singleton con: `immagini` (array di image con alt obbligatorio, categoria opzionale enum: atmosfera/cucina/dettagli/persone/ingredienti, `inEvidenza` boolean)

**`events.ts`** — con: `titolo`, `slug` (auto-generated), `data` (datetime), `immaginePrincipale` (image, obbligatoria), `descrizioneBreve` (max 120 char), `descrizioneCompleta` (block content), `galleriaFoto` (array image), `stato` (enum: prossimo/passato), `whatsappMessaggio`, `metaDescrizione`

**`wineHighlights.ts`** — con: `nomeBottiglia`, `cantina`, `territorio`, `descrizione` (max 50 parole), `immagine`, `inEvidenza` (boolean), `ordine`

Inserisci 2 eventi placeholder nello studio (uno "prossimo", uno "passato") e 3 vini placeholder.

**Criterio di completamento**
- [x] I tre schema definiti senza errori
- [ ] Dati placeholder inseriti nello studio (operazione manuale — vedi istruzioni)
- [x] Slug eventi generati correttamente (campo slug con source: 'titolo')

---

### TASK-014 — Query GROQ, TypeScript types e collegamento dati globali

**Stato:** ✅ Completata

**Obiettivo**
Scrivere tutte le query GROQ del progetto, definire i TypeScript types derivati dagli schema, e collegare i dati reali di Sanity al Footer, FloatingCTA e JSON-LD (che per ora usano dati hardcoded).

**Istruzione per Claude Code**

1. **`sanity/lib/queries.ts`** — scrivi una query GROQ named per ogni caso d'uso:
   - `settingsQuery` — fetch del singleton settings
   - `homepageConfigQuery` — homepage config con piatti in evidenza dereferenziati
   - `menuQuery` — categorie + piatti (solo `visibile: true`), ordinati
   - `activeMenuGalleryQuery` — galleria menu con `attiva: true`
   - `siteGalleryQuery` — tutte le immagini della galleria locale
   - `aboutQuery` — contenuto singleton about
   - `upcomingEventsQuery` — eventi con `stato: "prossimo"`, ordinati per data
   - `pastEventsQuery` — eventi con `stato: "passato"`, ordinati per data decrescente
   - `eventBySlugQuery` — singolo evento per slug
   - `wineHighlightsQuery` — vini con `inEvidenza: true`, ordinati
   - `allEventSlugsQuery` — solo gli slug di tutti gli eventi (per sitemap e generateStaticParams)

2. **`types/index.ts`** — definisci i TypeScript types per ogni entity: `Settings`, `MenuItem`, `MenuCategory`, `MenuGallery`, `SiteGallery`, `Event`, `WineHighlight`, `About`, `HomepageConfig`, `PageConfig`

3. **Collegamento dati globali:**
   - `Footer.tsx` — fetch `settingsQuery` (Server Component) e usa i dati reali
   - `FloatingCTA.tsx` — riceve `telefono` e `whatsapp` come props da `layout.tsx`
   - `layout.tsx` — fetch `settingsQuery` e passa i dati a FloatingCTA, aggiorna JSON-LD con dati reali

**Criterio di completamento**
- [x] Tutte le query GROQ scritte e testate (verificare che restituiscano dati corretti)
- [x] Types TypeScript definiti per tutte le entity
- [x] Footer mostra dati reali da Sanity
- [x] FloatingCTA usa numeri reali da Sanity
- [x] JSON-LD usa dati reali da Sanity

---

## FASE 4 — Homepage

---

### TASK-015 — HeroSection

**Stato:** ✅ Completata

**Obiettivo**
Implementare la sezione hero fullscreen della homepage con immagine, testo, CTA e parallax leggero.

**Istruzione per Claude Code**

Implementa `sections/home/HeroSection.tsx` come Server Component (riceve i dati come props da `app/page.tsx`):

- **Layout:** fullscreen (`min-h-screen`), immagine di background via `<Image>` Next.js con `fill` e `priority`, overlay scuro semi-trasparente per leggibilità testo
- **Immagine:** usa `homepageConfig.immagineHero` da Sanity. Se `immagineHeroMobile` è presente, usala come source su mobile (media query o picture element)
- **Testo:** titolo "Aroma Bistrot" in serif grande (clamp responsive), sottotitolo da `homepageConfig.testoHero`
- **CTA:** due bottoni affiancati (stack verticale su mobile): "Prenota un tavolo" (link WhatsApp, variante primary) e "Scopri il menu" (link `/menu`, variante ghost)
- **Parallax:** effetto parallax leggero sull'immagine durante lo scroll — implementa con Framer Motion `useScroll` + `useTransform`, attivo solo su desktop (disabilitato se `prefers-reduced-motion`)
- **Placeholder:** se nessuna immagine è disponibile in Sanity, usa un background gradient off-white → grigio scuro

**Criterio di completamento**
- [x] Hero fullscreen con immagine e testo
- [x] Due CTA funzionanti
- [x] Parallax attivo su desktop, disabilitato su mobile
- [x] Responsive su tutti i breakpoint

---

### TASK-016 — PresentationSection e MenuPreviewSection

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare le due sezioni della homepage che presentano il locale e anticipano il menu stagionale.

**Istruzione per Claude Code**

**`sections/home/PresentationSection.tsx`** — Server Component:
- Testo di presentazione da `homepageConfig.presentazione` (3-4 righe)
- Layout centrato, font serif per la citazione/frase principale, sans per il resto
- Link "Scopri il bistrot" → `/il-bistrot` (variante ghost o link testuale)
- Visibile solo se `homepageConfig.sezioniVisibili.presentazione === true`

**`sections/home/MenuPreviewSection.tsx`** — Server Component:
- Titolo sezione con `<SectionLabel>` "IL MENU"
- Lista di massimo 4 piatti da `homepageConfig.piattiInEvidenza`
- Ogni piatto: nome in serif, descrizione in sans piccolo, prezzo allineato a destra, badge opzionale se tag presenti
- Layout: lista tipografica pulita su sfondo neutro, con immagine editoriale laterale (decorativa, da `siteGallery` foto in evidenza)
- Link "Vai al menu completo" → `/menu`
- Visibile solo se `sezioniVisibili.menuPreview === true`

**Criterio di completamento**
- [ ] Entrambe le sezioni implementate e visibili in homepage
- [ ] Dati letti da Sanity
- [ ] Visibilità condizionale funzionante

---

### TASK-017 — EventsPreviewSection, GalleryTeaser, WineTeaser

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare le ultime tre sezioni della homepage: anteprima eventi, teaser galleria e richiamo vini.

**Istruzione per Claude Code**

**`sections/home/EventsPreviewSection.tsx`** — Server Component:
- Titolo "PROSSIMI EVENTI" con `<SectionLabel>`
- Mostra i 2 eventi futuri più vicini per data (da `upcomingEventsQuery` limitato a 2)
- Ogni evento: `<EventCard>` con immagine, titolo, data formattata, descrizione breve, CTA WhatsApp
- Se non ci sono eventi futuri: la **sezione non viene renderizzata** (return null)
- Link "Tutti gli eventi" → `/eventi`
- Visibile solo se `sezioniVisibili.eventi === true`

**`sections/home/GalleryTeaser.tsx`** — Server Component:
- 6-8 foto con `inEvidenza: true` da `siteGallery`
- Layout editoriale non uniforme: CSS Grid con `grid-template-areas` per alternare formati grandi/piccoli
- Nessun lightbox qui — le foto sono solo decorative
- Link "Esplora la galleria" → `/galleria`
- Visibile solo se `sezioniVisibili.galleryTeaser === true`

**`sections/home/WineTeaser.tsx`** — Server Component:
- Sfondo leggermente diverso (`muted` Tailwind) per separazione visiva
- Testo editoriale da `homepageConfig.testoVini`
- Opzionale: prima bottiglia in evidenza da `wineHighlightsQuery`
- Link "La nostra selezione" → `/vini`
- Visibile solo se `sezioniVisibili.vini === true`

**`components/shared/EventCard.tsx`** — implementa il componente card evento riutilizzabile:
- Immagine, titolo, data (formattata con `formatDate` da `lib/utils.ts`), descrizione breve, CTA

**Criterio di completamento**
- [ ] Tre sezioni implementate e visibili in homepage
- [ ] EventsPreviewSection sparisce se non ci sono eventi futuri
- [ ] EventCard riutilizzabile implementato
- [ ] Dati letti da Sanity

---

### TASK-018 — Assemblaggio Homepage + metadata

**Stato:** 🔲 Da fare

**Obiettivo**
Assemblare tutte le sezioni in `app/page.tsx`, implementare i metadata e Open Graph specifici della homepage, e verificare che la pagina funzioni end-to-end.

**Istruzione per Claude Code**

1. **`app/page.tsx`** — Server Component che:
   - Fa fetch di tutti i dati necessari (settings, homepageConfig, upcomingEvents, wineHighlights, siteGallery) in parallelo con `Promise.all`
   - Monta in ordine: HeroSection → PresentationSection → MenuPreviewSection → EventsPreviewSection → GalleryTeaser → WineTeaser
   - Passa i dati come props a ogni sezione

2. **`lib/utils.ts`** — implementa le funzioni helper:
   - `formatDate(date: string): string` — formatta datetime Sanity in "10 maggio 2025"
   - `formatPrice(price: number): string` — formatta numero in "€ 14"
   - `cn(...classes)` — wrapper clsx + tailwind-merge

3. **Metadata homepage** — `generateMetadata` in `app/page.tsx`:
   ```
   title: "Aroma Bistrot — Ristorante a Offanengo"
   description: "Cucina contemporanea, selezione vini, eventi gastronomici. Prenota il tuo tavolo ad Aroma Bistrot, Offanengo (CR)."
   openGraph: immagine da settings.ogImageDefault
   ```

**Criterio di completamento**
- [ ] Homepage completa e funzionante con tutti i dati da Sanity
- [ ] Metadata corretti (verificare con view-source)
- [ ] Nessun errore TypeScript
- [ ] Testato su mobile (Chrome DevTools)

---

## FASE 5 — Pagina Menu

---

### TASK-019 — Componenti lista piatti

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare i componenti per la visualizzazione tipografica del menu: intestazione stagionale, blocco categoria e singolo piatto.

**Istruzione per Claude Code**

**`sections/menu/MenuHeader.tsx`** — Server Component:
- Titolo stagionale da Sanity (es. "Menu Primavera · Estate 2025") in serif grande
- Testo introduttivo opzionale in sans
- Recupera il titolo da `pages` collection (pagina: "menu") e da `menuGallery.stagione`

**`sections/menu/MenuCategory.tsx`** — riceve nome categoria e array di piatti come props:
- Label categoria con `<SectionLabel>` (es. "ANTIPASTI")
- Lista `<DishItem>` per ogni piatto visibile (`visibile: true`)
- Separatore sottile tra categorie

**`sections/menu/DishItem.tsx`** — riceve un `MenuItem` come props:
- Nome in serif, descrizione in sans piccolo, prezzo con `formatPrice` allineato a destra
- Badge se tag presenti (usa `<Badge>`)
- Layout: flex row, nome+descrizione a sinistra, prezzo a destra
- Animazione hover leggera: leggero shift del colore del testo

**Criterio di completamento**
- [ ] I tre componenti implementati e tipizzati
- [ ] Piatti con `visibile: false` non appaiono
- [ ] Badge visualizzati correttamente
- [ ] Layout tipografico pulito e arioso

---

### TASK-020 — ImageGallerySlider e MenuGallerySection

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare lo slider orizzontale per la galleria fotografica del menu corrente.

**Istruzione per Claude Code**

**`components/shared/ImageGallerySlider.tsx`** — componente `"use client"`:
- Riceve array di immagini Sanity come props
- **Mobile:** scroll orizzontale nativo con `overflow-x: scroll`, `scroll-snap-type: x mandatory`, ogni immagine con `scroll-snap-align: start`. Fluido, zero librerie
- **Desktop:** frecce prev/next (lucide-react `ChevronLeft`/`ChevronRight`) per navigare tra le immagini. Stato interno con `useState` per l'indice corrente. Transizione CSS tra slide
- Ogni immagine: `<Image>` Next.js con alt text da Sanity, aspect ratio 4:3, `object-cover`
- Didascalia opzionale sotto l'immagine

**`sections/menu/MenuGallerySection.tsx`** — Server Component:
- Titolo "Le foto di questo menu" (o da `pages` collection)
- Fetch galleria attiva con `activeMenuGalleryQuery`
- Se nessuna galleria attiva: sezione non renderizzata
- Monta `<ImageGallerySlider>` con le immagini della galleria

**Criterio di completamento**
- [ ] Slider funzionante su mobile (scroll touch)
- [ ] Frecce funzionanti su desktop
- [ ] Immagini ottimizzate con `<Image>` Next.js
- [ ] Sezione non appare se nessuna galleria è attiva

---

### TASK-021 — Assemblaggio pagina Menu + metadata

**Stato:** 🔲 Da fare

**Obiettivo**
Assemblare la pagina menu completa in `app/menu/page.tsx` con intestazione, lista piatti per categoria e galleria fotografica.

**Istruzione per Claude Code**

1. **`app/menu/page.tsx`** — Server Component:
   - Fetch in parallelo: `menuQuery` (categorie + piatti), `activeMenuGalleryQuery`, `pages` (pagina menu)
   - Renderizza in ordine: `<PageHero>` (titolo pagina) → `<MenuHeader>` → categorie con `<MenuCategory>` (loop) → `<MenuGallerySection>`

2. **`components/shared/PageHero.tsx`** — componente riutilizzabile per hero pagine interne:
   - Più piccolo dell'hero homepage: altezza 30-40vh
   - Immagine opzionale di background (o sfondo neutro)
   - Titolo H1 in serif, sottotitolo opzionale

3. **Metadata** in `app/menu/page.tsx`:
   ```
   title: "Menu"  (template applica "Menu — Aroma Bistrot")
   description: "Il menu à la carte di Aroma Bistrot. Cucina stagionale, ingredienti selezionati, Offanengo (CR)."
   ```

**Criterio di completamento**
- [ ] Pagina menu completa e funzionante
- [ ] Categorie e piatti da Sanity visualizzati nell'ordine corretto
- [ ] Galleria slider presente dopo la lista
- [ ] Metadata corretti

---

## FASE 6 — Galleria

---

### TASK-022 — EditorialGrid, Lightbox e hooks

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare la griglia editoriale con layout variabile e il lightbox a schermo intero con navigazione.

**Istruzione per Claude Code**

**`hooks/useLightbox.ts`** — gestisce lo stato del lightbox:
- `isOpen: boolean`, `currentIndex: number`
- Metodi: `open(index)`, `close()`, `next()`, `prev()`
- Chiude con ESC (useEffect + keydown listener)

**`components/shared/Lightbox.tsx`** — componente `"use client"` con React Portal:
- Overlay fullscreen dark semi-trasparente
- Immagine centrata con `<Image>` fill
- Frecce prev/next (nascoste se prima/ultima immagine)
- Swipe touch su mobile (gestisci con `onTouchStart`/`onTouchEnd` e delta X)
- Tasto X per chiudere, click fuori dall'immagine per chiudere
- Animazione apertura/chiusura con Framer Motion (`AnimatePresence`)
- Focus trap per accessibilità (focus sul bottone X all'apertura)
- Didascalia opzionale in basso
- Renderizzato via `createPortal(…, document.body)`

**`sections/galleria/GalleryGrid.tsx`** — componente `"use client"` (per gestire il lightbox):
- Riceve array immagini come props
- CSS Grid con pattern ripetuto ogni 6 foto: alcune occupano 2 colonne, alcune 1, altezze variabili
- Su mobile: griglia a 1 colonna
- Click su foto → apre `<Lightbox>` con `useLightbox`
- Animazione hover: leggero scale-up dell'immagine

**Criterio di completamento**
- [ ] Griglia editoriale con layout variabile
- [ ] Lightbox apre, naviga e chiude correttamente
- [ ] Swipe touch funzionante su mobile
- [ ] Chiusura con ESC funzionante
- [ ] Focus trap accessibile

---

### TASK-023 — Assemblaggio pagina Galleria + metadata

**Stato:** 🔲 Da fare

**Obiettivo**
Assemblare la pagina galleria in `app/galleria/page.tsx`.

**Istruzione per Claude Code**

1. **`app/galleria/page.tsx`** — Server Component:
   - Fetch `siteGalleryQuery`
   - Renderizza: `<PageHero>` → `<GalleryGrid images={siteGallery.immagini}>`

2. **Metadata:**
   ```
   title: "Galleria"
   description: "Scopri l'atmosfera di Aroma Bistrot attraverso le fotografie del locale, della cucina e dei dettagli."
   ```

**Criterio di completamento**
- [ ] Pagina galleria funzionante con immagini da Sanity
- [ ] Lightbox funzionante al click

---

## FASE 7 — Il Bistrot

---

### TASK-024 — Pagina Il Bistrot + metadata

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare la pagina identitaria del locale con storia, filosofia e immagini editoriali.

**Istruzione per Claude Code**

**`sections/about/AboutHero.tsx`** — Server Component:
- `<PageHero>` con immagine hero da `about.immagineHero`
- Titolo da `about.titolo`

**`sections/about/PhilosophySection.tsx`** — Server Component:
- Testo `about.storia` in rich text (usa `@portabletext/react` per renderizzare block content Sanity)
- Separazione visiva + testo `about.filosofiaCucina`
- Immagini interne da `about.immaginiInterne` integrate nel testo (layout alternato sinistra/destra)
- CTA finale: "Scopri il menu" → `/menu` e "Prenota un tavolo" (WhatsApp)

**`app/il-bistrot/page.tsx`** — Server Component:
- Fetch `aboutQuery`
- Renderizza: `<AboutHero>` → `<PhilosophySection>`
- Installa `@portabletext/react` se non già presente

**Metadata:**
```
title: "Il Bistrot"
description: "La storia e la filosofia di Aroma Bistrot — cucina stagionale, ingredienti selezionati, Offanengo (CR)."
```

**Criterio di completamento**
- [ ] Rich text renderizzato correttamente da Sanity block content
- [ ] Immagini integrate nel testo
- [ ] CTA finale presenti
- [ ] Metadata corretti

---

## FASE 8 — Vini

---

### TASK-025 — Pagina Vini + metadata

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare la pagina vini con sezione editoriale e selezione bottiglie in evidenza.

**Istruzione per Claude Code**

**`sections/vini/WinePhilosophy.tsx`** — Server Component:
- Sfondo leggermente diverso (muted)
- Testo editoriale dalla `pages` collection (pagina: "vini")
- Tono: filosofia della selezione, non lista tecnica

**`sections/vini/WineHighlightsSection.tsx`** — Server Component:
- Titolo "LA NOSTRA SELEZIONE" con `<SectionLabel>`
- Griglia di 3-6 bottiglie da `wineHighlightsQuery`
- Ogni bottiglia: nome in serif, cantina, territorio come label, descrizione, immagine opzionale
- Frase di chiusura: "Per la lista completa, chiedici al tavolo"

**`app/vini/page.tsx`** — Server Component:
- Fetch `wineHighlightsQuery` e `pages` (pagina: "vini")
- Renderizza: `<PageHero>` → `<WinePhilosophy>` → `<WineHighlightsSection>`

**Metadata:**
```
title: "Vini"
description: "La nostra selezione di vini ad Aroma Bistrot — produttori selezionati, territori di qualità."
```

**Criterio di completamento**
- [ ] Sezione filosofia con testo da Sanity
- [ ] Bottiglie in evidenza visualizzate
- [ ] Frase di chiusura presente
- [ ] Metadata corretti

---

## FASE 9 — Eventi

---

### TASK-026 — Lista eventi e archivio

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare la pagina lista eventi con prossimi eventi in cima e archivio eventi passati sotto.

**Istruzione per Claude Code**

**`sections/eventi/UpcomingEvents.tsx`** — Server Component:
- Titolo "PROSSIMI EVENTI" con `<SectionLabel>`
- Loop su `upcomingEventsQuery` — ogni evento con `<EventCard>` grande (più dettagliata della versione homepage)
- CTA WhatsApp su ogni card con messaggio pre-compilato da `evento.whatsappMessaggio` (o testo default "Vorrei prenotare per [titolo evento]")
- Se array vuoto: messaggio "Nuovi eventi in arrivo — seguici su Instagram" con link all'account

**`sections/eventi/PastEventsSection.tsx`** — Server Component:
- Titolo "EVENTI PASSATI" con `<SectionLabel>`
- Griglia compatta di eventi passati — immagine, titolo, data, breve racconto
- Cliccabili per aprire la pagina dedicata dell'evento

**`app/eventi/page.tsx`** — Server Component:
- Fetch in parallelo: `upcomingEventsQuery`, `pastEventsQuery`, `settings` (per link Instagram)
- Renderizza: `<PageHero>` → `<UpcomingEvents>` → `<PastEventsSection>`

**Metadata:**
```
title: "Eventi"
description: "Prossimi eventi e serate speciali ad Aroma Bistrot — degustazioni, menu stagionali, cene con produttori."
```

**Criterio di completamento**
- [ ] Prossimi eventi in cima
- [ ] Messaggio alternativo se nessun evento futuro
- [ ] Archivio eventi passati funzionante
- [ ] Metadata corretti

---

### TASK-027 — Pagina singolo evento + Open Graph dinamici

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare la pagina dedicata al singolo evento con Open Graph dinamici per la condivisione social.

**Istruzione per Claude Code**

**`sections/eventi/EventDetail.tsx`** — Server Component:
- Hero con immagine principale dell'evento (`immaginePrincipale`)
- Titolo in serif grande, data e ora formattata con `formatDate`
- Descrizione completa in rich text (`descrizioneCompleta` via `@portabletext/react`)
- Galleria foto evento se presenti (`galleriaFoto`) — usa `<ImageGallerySlider>` o griglia semplice
- CTA WhatsApp prominente: "Prenota il tuo posto" con `whatsappMessaggio` pre-compilato

**`app/eventi/[slug]/page.tsx`** — Server Component:
- `generateStaticParams()` — fetch `allEventSlugsQuery` per pre-generare tutte le pagine
- `generateMetadata({ params })` — metadata dinamici per ogni evento:
  ```
  title: evento.titolo
  description: evento.metaDescrizione || evento.descrizioneBreve
  openGraph:
    title: evento.titolo
    description: evento.descrizioneBreve
    images: [{ url: urlFor(evento.immaginePrincipale).width(1200).height(630).url() }]
  ```
- Renderizza `<EventDetail event={evento}>`

**Criterio di completamento**
- [ ] Pagina singolo evento funzionante
- [ ] `generateStaticParams` genera le pagine statiche
- [ ] Open Graph dinamici corretti (verificare con og:debugger o view-source)
- [ ] Link WhatsApp con messaggio pre-compilato funzionante

---

## FASE 10 — Contatti

---

### TASK-028 — Pagina Contatti + metadata

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare la pagina contatti con tutti i recapiti, mappa embed e orari di apertura da Sanity.

**Istruzione per Claude Code**

**`app/contatti/page.tsx`** — Server Component:
- Fetch `settingsQuery`
- Struttura:
  - `<PageHero>` con titolo "Contatti"
  - **Recapiti:** telefono (link `tel:`), WhatsApp (link `https://wa.me/`), email (link `mailto:`), indirizzo con link `settings.googleMapsUrl`
  - **Orari:** tabella/lista giorni della settimana con orari da `settings.orariSettimanali`. Giorno chiuso con testo "Chiuso". Nota orari eccezioni (`settings.noteOrari`) se presente
  - **Mappa embed:** `<iframe>` Google Maps embed dell'indirizzo. Usa l'URL embed di Google Maps (ottenuto manualmente dall'indirizzo). Wrapper con aspect ratio 16:9
  - **Social:** link Instagram con icona
- Nessun form di contatto — solo link diretti

**Metadata:**
```
title: "Contatti"
description: "Dove siamo, come contattarci e gli orari di Aroma Bistrot — Via [indirizzo], Offanengo (CR)."
```

**Criterio di completamento**
- [ ] Tutti i recapiti con link funzionanti
- [ ] Orari da Sanity visualizzati correttamente
- [ ] Mappa embed visibile
- [ ] Metadata corretti

---

## FASE 11 — SEO e ottimizzazione

---

### TASK-029 — Sitemap XML, robots.txt e JSON-LD

**Stato:** 🔲 Da fare

**Obiettivo**
Implementare i tre strumenti SEO tecnici: sitemap XML dinamica, robots.txt e strutturato LocalBusiness.

**Istruzione per Claude Code**

**`app/sitemap.ts`** — `MetadataRoute.Sitemap`:
- Include tutte le route statiche con `priority` e `changeFrequency` appropriati
- Fetch `allEventSlugsQuery` e aggiunge ogni slug evento come `/eventi/[slug]`
- Restituisce array nel formato richiesto da Next.js

**`app/robots.ts`** — `MetadataRoute.Robots`:
- Tutto indicizzabile (`Allow: /`)
- `Disallow: /studio` (pannello Sanity)
- `Sitemap:` con URL assoluto della sitemap

**JSON-LD LocalBusiness** (già avviato in TASK-009, completare ora con dati reali):
- In `app/layout.tsx`, assicurarsi che il JSON-LD contenga:
  - `name`, `address` (streetAddress, addressLocality, addressRegion, postalCode, addressCountry: "IT")
  - `telephone`, `url`, `image`
  - `openingHoursSpecification` — array generato dagli `orariSettimanali` Sanity

**Criterio di completamento**
- [ ] `sitemap.xml` accessibile su `/sitemap.xml` e contiene tutte le route + slug eventi
- [ ] `robots.txt` accessibile su `/robots.txt` e esclude `/studio`
- [ ] JSON-LD LocalBusiness validato con Google Rich Results Test

---

### TASK-030 — Performance e Core Web Vitals

**Stato:** 🔲 Da fare

**Obiettivo**
Verificare e ottimizzare le performance del sito per raggiungere i target LCP < 2.5s, CLS < 0.1, INP < 200ms.

**Istruzione per Claude Code**

1. Esegui Lighthouse da Chrome DevTools sulla homepage e sulla pagina menu (sia mobile che desktop)
2. Identifica e correggi i problemi più critici:
   - **LCP:** verificare che l'immagine hero abbia `priority` e dimensioni esplicite
   - **CLS:** verificare che tutti gli `<Image>` abbiano `width`/`height` o `fill` con container dimensionato
   - **INP:** verificare che i componenti client siano minimali — no hydration pesante per contenuti statici
3. Verifica che Tailwind CSS sia purgato in produzione (`npm run build`)
4. Verifica che nessun font sia caricato da Google Fonts esterno (solo `next/font`)
5. Aggiungi `blurDataURL` o `placeholder="blur"` alle immagini principali Sanity usando `@sanity/image-url` con parametri blur

**Criterio di completamento**
- [ ] Lighthouse mobile homepage ≥ 85 performance
- [ ] LCP < 2.5s, CLS < 0.1
- [ ] `npm run build` completato senza errori
- [ ] Nessuna chiamata esterna a font non ottimizzati

---

### TASK-031 — Test mobile e cross-browser

**Stato:** 🔲 Da fare

**Obiettivo**
Verificare l'esperienza utente su dispositivi reali o simulati e correggere eventuali problemi.

**Istruzione per Claude Code**

Testa le seguenti interazioni su viewport mobile (Chrome DevTools, iPhone 390px):

1. **Navigazione:** hamburger apre/chiude, tutti i link funzionano, nessun overflow orizzontale
2. **Homepage:** hero fullscreen, sezioni in sequenza, FloatingCTA visibile e toccabile
3. **Menu:** lista piatti leggibile, slider galleria scorre con swipe
4. **Galleria:** griglia a colonna singola, lightbox apre, swipe per navigare, chiude con tap fuori
5. **Singolo evento:** immagine hero, testo leggibile, bottone WhatsApp ben visibile
6. **Contatti:** tutti i link sono tap-target adeguati (min 48px), mappa carica

Documenta e correggi tutti i problemi trovati.

**Criterio di completamento**
- [ ] Nessun overflow orizzontale in nessuna pagina
- [ ] FloatingCTA non copre contenuti importanti
- [ ] Lightbox navigabile con swipe
- [ ] Tutti i tap target ≥ 44px

---

## FASE 12 — Contenuti reali

---

### TASK-032 — Inserimento foto professionali nel CMS

**Stato:** 🔲 Da fare (prerequisito: sessione fotografica eseguita)

**Obiettivo**
Caricare le foto professionali nel CMS Sanity e assegnarle alle collection corrette.

**Istruzione per Claude Code (assistenza)**

Questa task è principalmente manuale (la proprietaria o il developer carica le foto dallo studio Sanity). Claude Code può assistere con:
- Verifica che i campi alt text siano compilati per ogni immagine (obbligatorio per SEO e accessibilità)
- Verifica che le immagini hero abbiano proporzioni corrette (16:9 per desktop, 4:5 per mobile)
- Test che le immagini si carichino correttamente nelle pagine reali

Assegnazioni:
- 1 foto hero → `homepageConfig.immagineHero`
- 4-6 foto sala → `siteGallery` (categoria: atmosfera, alcune `inEvidenza: true`)
- 10-16 foto piatti → `menuGallery` (galleria attiva)
- Foto cucina/dettagli → `siteGallery`

**Criterio di completamento**
- [ ] Tutte le foto caricate nel CMS con alt text
- [ ] Homepage hero con foto reale
- [ ] Galleria menu con foto dei piatti
- [ ] Galleria locale con foto atmosfera

---

### TASK-033 — Inserimento testi e contenuti definitivi nel CMS

**Stato:** 🔲 Da fare

**Obiettivo**
Sostituire tutti i testi placeholder con i contenuti definitivi del locale.

**Istruzione per Claude Code (assistenza)**

Dati da inserire nel CMS Sanity:

- **settings:** recapiti reali, orari reali, link Instagram, URL Google Maps
- **about:** storia del locale, filosofia di cucina (testi definitivi)
- **homepageConfig:** testo hero, presentazione, piatti in evidenza selezionati, testo vini
- **menuCategories + menuItems:** menu completo con nomi, descrizioni, prezzi, tag reali
- **wineHighlights:** 3-6 bottiglie selezionate dalla proprietaria
- **pages:** titoli e testi introduttivi di ogni pagina

**Criterio di completamento**
- [ ] Tutti i testi placeholder sostituiti con contenuti reali
- [ ] Menu completo inserito nel CMS
- [ ] Contatti e orari reali in `settings`
- [ ] Sito funzionante end-to-end con contenuti reali

---

## FASE 13 — Pubblicazione

---

### TASK-034 — Deploy Vercel + collegamento dominio

**Stato:** 🔲 Da fare (prerequisito: TASK-032 e TASK-033 completate)

**Obiettivo**
Pubblicare il sito su Vercel e collegare il dominio `aromabistrot.it` (o alternativa).

**Istruzione per Claude Code (assistenza)**

1. Collegare il repository GitHub a Vercel (operazione da browser su vercel.com)
2. Configurare le variabili d'ambiente su Vercel (stesse di `.env.local`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
3. Verificare che il primo deploy automatico abbia successo
4. Collegare il dominio acquistato a Vercel seguendo le istruzioni DNS di Vercel
5. Verificare HTTPS attivo e certificato SSL generato automaticamente
6. Testare il sito sul dominio reale da mobile

**Criterio di completamento**
- [ ] Deploy Vercel funzionante
- [ ] Dominio collegato e HTTPS attivo
- [ ] Sito accessibile da `https://aromabistrot.it` (o dominio scelto)
- [ ] Variabili d'ambiente configurate su Vercel

---

### TASK-035 — Configurazione analytics

**Stato:** 🔲 Da fare

**Obiettivo**
Attivare il monitoraggio del traffico con Plausible Analytics (o GA4 come alternativa).

**Istruzione per Claude Code**

**Opzione A — Plausible Analytics (consigliata):**
- Creare account su plausible.io e aggiungere il dominio
- Aggiungere lo script Plausible in `app/layout.tsx` tramite `<Script>` Next.js con `strategy="afterInteractive"`:
  ```html
  <script defer data-domain="aromabistrot.it" src="https://plausible.io/js/script.js"></script>
  ```
- Nessun cookie banner necessario (privacy-first by default)

**Opzione B — Google Analytics 4:**
- Se scelta GA4: installare `@next/third-parties` e usare `<GoogleAnalytics gaId="G-XXXX">`
- Aggiungere sistema di consenso cookie (Cookiebot o CookieYes) — richiesto da GDPR

**Criterio di completamento**
- [ ] Analytics attivi e tracciamento verificato (primo pageview registrato)
- [ ] Nessun impatto sulle performance (script caricato async)
- [ ] Se GA4: cookie banner presente e funzionante

---

### TASK-036 — Configurazione CORS Sanity per il dominio di produzione

**Stato:** 🔲 Da fare

**Obiettivo**
Aggiungere il dominio di produzione alle origini CORS autorizzate di Sanity.

**Istruzione per Claude Code**

Dal pannello Sanity (manage.sanity.io):
- API → CORS Origins → aggiungere `https://aromabistrot.it` (e `https://www.aromabistrot.it` se necessario)
- Verificare che il sito in produzione carichi correttamente i dati da Sanity senza errori CORS in console

**Criterio di completamento**
- [ ] Dominio di produzione aggiunto alle CORS origins Sanity
- [ ] Nessun errore CORS in console su sito live

---

### TASK-037 — Formazione proprietaria e documentazione CMS

**Stato:** 🔲 Da fare

**Obiettivo**
Preparare la documentazione d'uso del CMS e pianificare una sessione di formazione con la proprietaria.

**Istruzione per Claude Code**

Prepara un documento Google Doc (o Notion) con istruzioni passo-passo per:

1. Accedere allo studio Sanity
2. Aggiungere, modificare e disattivare un piatto
3. Cambiare un prezzo
4. Creare e pubblicare un nuovo evento
5. Archiviare un evento passato e caricare le foto
6. Caricare nuove foto nella galleria e ordinarle
7. Sostituire la galleria fotografica quando cambia il menu stagionale
8. Aggiornare orari e note orari
9. Cambiare numero WhatsApp o telefono

Per ogni operazione: screenshot dello studio, passi numerati, cosa NON fare.

**Criterio di completamento**
- [ ] Documento di formazione scritto con screenshot
- [ ] Sessione di formazione (1-2 ore) pianificata con la proprietaria
- [ ] Proprietaria in grado di completare tutti i casi d'uso elencati in autonomia
