import { client } from '@/sanity/lib/client'
import { homepageConfigQuery, settingsQuery } from '@/sanity/lib/queries'
import type { HomepageConfig, Settings } from '@/types'
import HeroSection from '@/sections/home/HeroSection'

export default async function HomePage() {
  const [config, settings] = await Promise.all([
    client.fetch<HomepageConfig>(homepageConfigQuery, {}, { next: { revalidate: 3600 } }),
    client.fetch<Settings>(settingsQuery, {}, { next: { revalidate: 3600 } }),
  ])

  return (
    <main>
      <HeroSection config={config} whatsapp={settings?.whatsapp ?? ''} />
    </main>
  )
}
