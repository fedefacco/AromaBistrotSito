import Image from 'next/image'
import type { HomepageConfig, SiteGalleryImage, SezioniVisibili } from '@/types'
import type { MenuItemTag } from '@/types'
import { urlFor } from '@/sanity/lib/client'
import { formatPrice } from '@/lib/utils'
import SectionLabel from '@/components/ui/SectionLabel'
import Badge from '@/components/ui/Badge'

type BadgeVariant = 'signature' | 'new' | 'vegetarian' | 'vegan' | 'glutenFree'

function tagToBadgeVariant(tag: MenuItemTag): BadgeVariant {
  const map: Record<MenuItemTag, BadgeVariant> = {
    signature: 'signature',
    novita: 'new',
    vegetariano: 'vegetarian',
    vegano: 'vegan',
    'senza-glutine': 'glutenFree',
  }
  return map[tag]
}

interface MenuPreviewSectionProps {
  piattiInEvidenza?: HomepageConfig['piattiInEvidenza']
  sezioniVisibili?: SezioniVisibili
  immagineDecorativa?: SiteGalleryImage | null
}

export default function MenuPreviewSection({
  piattiInEvidenza,
  sezioniVisibili,
  immagineDecorativa,
}: MenuPreviewSectionProps) {
  if (!sezioniVisibili?.menuPreview) return null
  if (!piattiInEvidenza?.length) return null

  const piatti = piattiInEvidenza.slice(0, 4)
  const imageSrc = immagineDecorativa
    ? urlFor(immagineDecorativa).width(600).height(800).url()
    : null

  return (
    <section className="bg-muted py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">

          {/* Lista piatti */}
          <div>
            <SectionLabel withLine className="mb-8">IL MENU</SectionLabel>

            <ul>
              {piatti.map((piatto) => (
                <li
                  key={piatto._id}
                  className="flex flex-col gap-1.5 py-5 border-b border-border last:border-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-xl text-foreground">{piatto.nome}</h3>
                    <span className="font-sans text-base text-foreground shrink-0">
                      {formatPrice(piatto.prezzo)}
                    </span>
                  </div>
                  {piatto.descrizione && (
                    <p className="font-sans text-sm text-foreground/55 leading-relaxed">
                      {piatto.descrizione}
                    </p>
                  )}
                  {piatto.tag && piatto.tag.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {piatto.tag.map((tag) => (
                        <Badge key={tag} variant={tagToBadgeVariant(tag)} />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="/menu"
                className="font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-accent/40 hover:decoration-foreground/40"
              >
                Vai al menu completo
              </a>
            </div>
          </div>

          {/* Immagine editoriale laterale */}
          {imageSrc && (
            <div className="relative w-full aspect-[3/4] overflow-hidden hidden lg:block">
              <Image
                src={imageSrc}
                alt={immagineDecorativa?.alt ?? 'Aroma Bistrot — dettaglio cucina'}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 33vw, 0px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
