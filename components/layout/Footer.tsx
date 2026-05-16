import Link from 'next/link'
import { Instagram, Phone, MessageCircle, Mail, MapPin } from 'lucide-react'

const orari = [
  { giorno: 'Lunedì',    orario: 'Chiuso' },
  { giorno: 'Martedì',   orario: '19:00 – 22:30' },
  { giorno: 'Mercoledì', orario: '19:00 – 22:30' },
  { giorno: 'Giovedì',   orario: '19:00 – 22:30' },
  { giorno: 'Venerdì',   orario: '19:00 – 23:00' },
  { giorno: 'Sabato',    orario: '12:30 – 14:30 · 19:00 – 23:00' },
  { giorno: 'Domenica',  orario: '12:30 – 14:30' },
]

const paginePrincipali = [
  { href: '/menu',       label: 'Menu' },
  { href: '/galleria',   label: 'Galleria' },
  { href: '/il-bistrot', label: 'Il Bistrot' },
  { href: '/vini',       label: 'Vini' },
  { href: '/eventi',     label: 'Eventi' },
  { href: '/contatti',   label: 'Contatti' },
]

export default function Footer() {
  return (
    <footer className="bg-[#F0EDE6] border-t border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

        {/* Colonna 1 — Recapiti */}
        <div className="space-y-4">
          <p className="font-serif text-xl text-foreground">Aroma Bistrot</p>
          <ul className="space-y-2.5 text-sm text-foreground/60">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>Via Roma 12<br />26010 Offanengo (CR)</span>
            </li>
            <li>
              <a
                href="tel:+390373000000"
                className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
              >
                <Phone size={15} className="shrink-0 text-accent" />
                +39 0373 000000
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/393000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
              >
                <MessageCircle size={15} className="shrink-0 text-accent" />
                Scrivici su WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:info@aromabistrot.it"
                className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
              >
                <Mail size={15} className="shrink-0 text-accent" />
                info@aromabistrot.it
              </a>
            </li>
          </ul>
        </div>

        {/* Colonna 2 — Orari */}
        <div className="space-y-4">
          <p className="tracking-label text-foreground/40">Orari</p>
          <ul className="space-y-1.5 text-sm">
            {orari.map(({ giorno, orario }) => (
              <li key={giorno} className="flex justify-between gap-4">
                <span className="text-foreground/50">{giorno}</span>
                <span className={orario === 'Chiuso' ? 'text-foreground/30' : 'text-foreground/70'}>
                  {orario}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-foreground/40 pt-1">
            Orari soggetti a variazioni nei giorni festivi.
          </p>
        </div>

        {/* Colonna 3 — Link e social */}
        <div className="space-y-4">
          <p className="tracking-label text-foreground/40">Esplora</p>
          <ul className="space-y-2 text-sm">
            {paginePrincipali.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-foreground/60 hover:text-accent transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://instagram.com/aromabistrot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors duration-200 pt-2"
          >
            <Instagram size={15} />
            @aromabistrot
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/60 py-5 text-center">
        <p className="text-xs text-foreground/35">
          © 2025 Aroma Bistrot · tutti i diritti riservati
        </p>
      </div>
    </footer>
  )
}
