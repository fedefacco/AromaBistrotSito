import Image from 'next/image'
import type { SiteGallery, SezioniVisibili } from '@/types'
import { urlFor } from '@/sanity/lib/client'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

interface GalleryTeaserProps {
  siteGallery?: SiteGallery | null
  sezioniVisibili?: SezioniVisibili
}

// Pattern ripetuto ogni 6 foto: grande (2 col), piccola, piccola, piccola, grande, piccola
const GRID_PATTERN = [true, false, false, false, true, false]

export default function GalleryTeaser({ siteGallery, sezioniVisibili }: GalleryTeaserProps) {
  if (!sezioniVisibili?.galleryTeaser) return null

  const foto = (siteGallery?.immagini ?? [])
    .filter((img) => img.inEvidenza)
    .slice(0, 8)

  if (!foto.length) return null

  return (
    <section className="py-24 md:py-32 px-6 bg-muted">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionLabel withLine>LA GALLERIA</SectionLabel>
          <a
            href="/galleria"
            className="font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-accent/40 hover:decoration-foreground/40"
          >
            Esplora la galleria
          </a>
        </div>

        {/* Grid editoriale: 3 colonne su desktop, 2 su tablet, 1 su mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[220px]">
          {foto.map((img, i) => {
            const isLarge = GRID_PATTERN[i % GRID_PATTERN.length]
            const imgSrc = urlFor(img).width(isLarge ? 900 : 500).height(isLarge ? 500 : 300).url()

            return (
              <div
                key={i}
                className={cn(
                  'relative overflow-hidden',
                  isLarge ? 'col-span-2 md:col-span-2 row-span-2' : 'col-span-1 row-span-1'
                )}
              >
                <Image
                  src={imgSrc}
                  alt={img.alt ?? 'Aroma Bistrot'}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  sizes={isLarge
                    ? '(min-width: 768px) 60vw, 90vw'
                    : '(min-width: 768px) 30vw, 45vw'
                  }
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
