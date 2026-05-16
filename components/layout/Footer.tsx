import Link from 'next/link'
import { Instagram, Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import type { Settings, OrarioSettimanale } from '@/types'

const GIORNI_LABEL: Record<OrarioSettimanale['giorno'], string> = {
  lunedi:    'Lunedì',
  martedi:   'Martedì',
  mercoledi: 'Mercoledì',
  giovedi:   'Giovedì',
  venerdi:   'Venerdì',
  sabato:    'Sabato',
  domenica:  'Domenica',
}

const paginePrincipali = [
  { href: '/menu',       label: 'Menu' },
  { href: '/galleria',   label: 'Galleria' },
  { href: '/il-bistrot', label: 'Il Bistrot' },
  { href: '/vini',       label: 'Vini' },
  { href: '/eventi',     label: 'Eventi' },
  { href: '/contatti',   label: 'Contatti' },
]

export default async function Footer() {
  const settings: Settings | null = await client.fetch(settingsQuery, {}, { next: { revalidate: 3600 } })

  const nome       = settings?.nomeLocale   ?? 'Aroma Bistrot'
  const telefono   = settings?.telefono     ?? ''
  const whatsapp   = settings?.whatsapp     ?? ''
  const indirizzo  = settings?.indirizzoStrada ?? ''
  const citta      = settings?.citta        ?? ''
  const mapsUrl    = settings?.googleMapsUrl
  const instagram  = settings?.instagram
  const email      = settings?.email        ?? ''
  const orari      = settings?.orariSettimanali ?? []
  const noteOrari  = settings?.noteOrari

  return (
    <footer className="bg-[#F0EDE6] border-t border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

        {/* Colonna 1 — Recapiti */}
        <div className="space-y-4">
          <p className="font-serif text-xl text-foreground">{nome}</p>
          <ul className="space-y-2.5 text-sm text-foreground/60">
            {(indirizzo || citta) && (
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                {mapsUrl ? (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors duration-200"
                  >
                    {indirizzo}<br />{citta}
                  </a>
                ) : (
                  <span>{indirizzo}<br />{citta}</span>
                )}
              </li>
            )}
            {telefono && (
              <li>
                <a
                  href={`tel:${telefono.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                >
                  <Phone size={15} className="shrink-0 text-accent" />
                  {telefono}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                >
                  <MessageCircle size={15} className="shrink-0 text-accent" />
                  Scrivici su WhatsApp
                </a>
              </li>
            )}
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 hover:text-accent transition-colors duration-200"
                >
                  <Mail size={15} className="shrink-0 text-accent" />
                  {email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Colonna 2 — Orari */}
        <div className="space-y-4">
          <p className="tracking-label text-foreground/40">Orari</p>
          {orari.length > 0 ? (
            <ul className="space-y-1.5 text-sm">
              {orari.map(({ giorno, orario, chiuso }) => (
                <li key={giorno} className="flex justify-between gap-4">
                  <span className="text-foreground/50">{GIORNI_LABEL[giorno] ?? giorno}</span>
                  <span className={chiuso ? 'text-foreground/30' : 'text-foreground/70'}>
                    {chiuso ? 'Chiuso' : orario}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/40">Orari non disponibili</p>
          )}
          {noteOrari && (
            <p className="text-xs text-foreground/40 pt-1">{noteOrari}</p>
          )}
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
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors duration-200 pt-2"
            >
              <Instagram size={15} />
              {instagram.replace(/https?:\/\/(www\.)?instagram\.com\/?/, '@').replace(/\/$/, '')}
            </a>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border/60 py-5 text-center">
        <p className="text-xs text-foreground/35">
          © {new Date().getFullYear()} {nome} · tutti i diritti riservati
        </p>
      </div>
    </footer>
  )
}
