import { client } from '@/sanity/lib/client'
import { homepageConfigQuery, settingsQuery, siteGalleryQuery } from '@/sanity/lib/queries'
import type { HomepageConfig, Settings, SiteGallery } from '@/types'
import HeroSection from '@/sections/home/HeroSection'
import PresentationSection from '@/sections/home/PresentationSection'
import MenuPreviewSection from '@/sections/home/MenuPreviewSection'

export default async function HomePage() {
  const [config, settings, siteGallery] = await Promise.all([
    client.fetch<HomepageConfig>(homepageConfigQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<Settings>(settingsQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<SiteGallery>(siteGalleryQuery, {}, { next: { revalidate: 3600 } }),
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
    </main>
  )
}
