import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import type { Settings } from '@/types'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Aroma Bistrot',
    default: 'Aroma Bistrot — Ristorante a Offanengo',
  },
  description:
    'Cucina contemporanea, selezione vini, eventi gastronomici. Prenota il tuo tavolo ad Aroma Bistrot, Offanengo (CR).',
  openGraph: {
    locale: 'it_IT',
    type: 'website',
    siteName: 'Aroma Bistrot',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Aroma Bistrot — Ristorante a Offanengo',
      },
    ],
  },
  metadataBase: new URL('https://aromabistrot.it'),
}

const GIORNI_EN: Record<string, string> = {
  lunedi:    'Monday',
  martedi:   'Tuesday',
  mercoledi: 'Wednesday',
  giovedi:   'Thursday',
  venerdi:   'Friday',
  sabato:    'Saturday',
  domenica:  'Sunday',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings: Settings | null = await client.fetch(settingsQuery, {}, { next: { revalidate: 3600 } })

  const telefono  = settings?.telefono  ?? ''
  const whatsapp  = settings?.whatsapp  ?? ''
  const nome      = settings?.nomeLocale ?? 'Aroma Bistrot'
  const indirizzo = settings?.indirizzoStrada ?? ''
  const citta     = settings?.citta ?? ''
  const email     = settings?.email ?? ''

  // Costruisce openingHoursSpecification dagli orari Sanity
  const openingHours = (settings?.orariSettimanali ?? [])
    .filter((o) => !o.chiuso && o.orario)
    .flatMap((o) => {
      const dayOfWeek = GIORNI_EN[o.giorno]
      if (!dayOfWeek || !o.orario) return []
      // Supporta orari doppi separati da "·" es. "12:30 – 14:30 · 19:00 – 23:00"
      return o.orario.split('·').map((slot) => {
        const [opens, closes] = slot.trim().split('–').map((t) => t.trim())
        return { '@type': 'OpeningHoursSpecification', dayOfWeek, opens, closes }
      })
    })

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: nome,
    url: 'https://aromabistrot.it',
    telephone: telefono,
    email: email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: indirizzo,
      addressLocality: citta.split('(')[0]?.trim() ?? citta,
      addressRegion: citta.match(/\(([^)]+)\)/)?.[1] ?? '',
      addressCountry: 'IT',
    },
    servesCuisine: 'Cucina italiana contemporanea',
    priceRange: '€€',
    image: 'https://aromabistrot.it/images/og-default.jpg',
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
  }

  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <FloatingCTA telefono={telefono} whatsapp={whatsapp} />
      </body>
    </html>
  )
}
