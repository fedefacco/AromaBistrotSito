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
| | | |

---

## FASE 0 — Setup

---

### TASK-001 — Creazione alberatura di cartelle del progetto

**Stato:** 🔲 Da fare

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
- [ ] Tutte le cartelle esistono nel percorso `C:\Sviluppo\AromaBistrot`
- [ ] Tutti i file esistono con il contenuto placeholder corretto
- [ ] La struttura corrisponde esattamente a quella dell'analisi di progetto
- [ ] I file in `/docs` esistono e sono vuoti
