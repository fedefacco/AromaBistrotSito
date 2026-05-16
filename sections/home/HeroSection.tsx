import type { HomepageConfig } from '@/types'
import { urlFor } from '@/sanity/lib/client'
import Button from '@/components/ui/Button'
import HeroParallaxImage from './HeroParallaxImage'

interface HeroSectionProps {
  config: HomepageConfig | null
  whatsapp: string
}

export default function HeroSection({ config, whatsapp }: HeroSectionProps) {
  const imageSrc = config?.immagineHero
    ? urlFor(config.immagineHero).width(1920).height(1080).url()
    : null

  const mobileImageSrc = config?.immagineHeroMobile
    ? urlFor(config.immagineHeroMobile).width(768).height(1024).url()
    : null

  const altText = config?.immagineHero?.alt ?? 'Aroma Bistrot — ristorante a Offanengo'
  const waLink = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, '')}` : '#'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroParallaxImage src={imageSrc} mobileSrc={mobileImageSrc} alt={altText} />

      {/* Overlay semi-trasparente per leggibilità */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenuto hero */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <h1
          className="font-serif font-semibold leading-none tracking-tight mb-5"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          Aroma Bistrot
        </h1>

        {config?.testoHero && (
          <p className="font-sans text-lg md:text-xl text-white/85 mb-10 max-w-xl mx-auto leading-relaxed">
            {config.testoHero}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={waLink}
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prenota un tavolo
          </Button>
          <Button
            href="/menu"
            variant="ghost"
            size="lg"
            className="text-white border-white hover:bg-white/10"
          >
            Scopri il menu
          </Button>
        </div>
      </div>

      {/* Indicatore scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
