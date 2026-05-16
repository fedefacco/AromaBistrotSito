import Image from 'next/image'
import type { WineHighlight, SezioniVisibili } from '@/types'
import { urlFor } from '@/sanity/lib/client'
import SectionLabel from '@/components/ui/SectionLabel'

interface WineTeaserProps {
  testoVini?: string
  wineHighlights?: WineHighlight[]
  sezioniVisibili?: SezioniVisibili
}

export default function WineTeaser({ testoVini, wineHighlights, sezioniVisibili }: WineTeaserProps) {
  if (!sezioniVisibili?.vini) return null

  const primaBottiglia = wineHighlights?.[0]

  return (
    <section className="py-24 md:py-32 px-6 bg-muted">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 items-center">

          {/* Testo editoriale */}
          <div>
            <SectionLabel withLine className="mb-8">I VINI</SectionLabel>

            {testoVini && (
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic mb-10">
                {testoVini}
              </p>
            )}

            {primaBottiglia && (
              <div className="border-l-2 border-accent/30 pl-5 mb-10">
                <p className="font-sans text-xs tracking-wide text-foreground/50 uppercase mb-1">
                  {primaBottiglia.cantina}
                  {primaBottiglia.territorio ? ` · ${primaBottiglia.territorio}` : ''}
                </p>
                <p className="font-serif text-lg text-foreground mb-2">{primaBottiglia.nomeBottiglia}</p>
                {primaBottiglia.descrizione && (
                  <p className="font-sans text-sm text-foreground/55 leading-relaxed">
                    {primaBottiglia.descrizione}
                  </p>
                )}
              </div>
            )}

            <a
              href="/vini"
              className="font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-accent/40 hover:decoration-foreground/40"
            >
              La nostra selezione
            </a>
          </div>

          {/* Immagine bottiglia opzionale */}
          {primaBottiglia?.immagine && (
            <div className="relative w-full aspect-[2/3] overflow-hidden hidden lg:block">
              <Image
                src={urlFor(primaBottiglia.immagine).width(400).height(600).url()}
                alt={primaBottiglia.nomeBottiglia}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 25vw, 0px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
