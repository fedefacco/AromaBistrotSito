import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/layout/FloatingCTA'

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

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Aroma Bistrot',
  url: 'https://aromabistrot.it',
  telephone: '+390373000000',
  email: 'info@aromabistrot.it',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Roma 12',
    addressLocality: 'Offanengo',
    addressRegion: 'CR',
    postalCode: '26010',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.3667,
    longitude: 9.7833,
  },
  servesCuisine: 'Cucina italiana contemporanea',
  priceRange: '€€',
  image: 'https://aromabistrot.it/images/og-default.jpg',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
      opens: '19:00',
      closes: '22:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '19:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '12:30',
      closes: '14:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '19:00',
      closes: '23:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '12:30',
      closes: '14:30',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <FloatingCTA />
      </body>
    </html>
  )
}
