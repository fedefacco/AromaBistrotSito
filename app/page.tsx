import { client } from '@/sanity/lib/client'
import {
  homepageConfigQuery,
  settingsQuery,
  siteGalleryQuery,
  upcomingEventsQuery,
  wineHighlightsQuery,
} from '@/sanity/lib/queries'
import type { HomepageConfig, Settings, SiteGallery, Event, WineHighlight } from '@/types'
import HeroSection from '@/sections/home/HeroSection'
import PresentationSection from '@/sections/home/PresentationSection'
import MenuPreviewSection from '@/sections/home/MenuPreviewSection'
import EventsPreviewSection from '@/sections/home/EventsPreviewSection'
import GalleryTeaser from '@/sections/home/GalleryTeaser'
import WineTeaser from '@/sections/home/WineTeaser'

export default async function HomePage() {
  const [config, settings, siteGallery, eventi, wineHighlights] = await Promise.all([
    client.fetch<HomepageConfig>(homepageConfigQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<Settings>(settingsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SiteGallery>(siteGalleryQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<Event[]>(upcomingEventsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<WineHighlight[]>(wineHighlightsQuery, {}, { next: { revalidate: 3600 } }),
  ])

  const immagineDecorativa = siteGallery?.immagini?.find((i) => i.inEvidenza) ?? null

  return (
    <main>
      <HeroSection config={config} whatsapp={settings?.whatsapp ?? ''} />
      <PresentationSection
        presentazione={config?.presentazione}
        sezioniVisibili={config?.sezioniVisibili}
      />
      <MenuPreviewSection
        piattiInEvidenza={config?.piattiInEvidenza}
        sezioniVisibili={config?.sezioniVisibili}
        immagineDecorativa={immagineDecorativa}
      />
      <EventsPreviewSection
        eventi={eventi}
        sezioniVisibili={config?.sezioniVisibili}
        whatsapp={settings?.whatsapp}
      />
      <GalleryTeaser
        siteGallery={siteGallery}
        sezioniVisibili={config?.sezioniVisibili}
      />
      <WineTeaser
        testoVini={config?.testoVini}
        wineHighlights={wineHighlights}
        sezioniVisibili={config?.sezioniVisibili}
      />
    </main>
  )
}
