import Image from 'next/image'
import type { Event } from '@/types'
import { urlFor } from '@/sanity/lib/client'
import { formatDate } from '@/lib/utils'
import { Calendar } from 'lucide-react'

interface EventCardProps {
  evento: Pick<Event, '_id' | 'titolo' | 'slug' | 'data' | 'immaginePrincipale' | 'descrizioneBreve' | 'whatsappMessaggio'>
  whatsapp?: string
}

export default function EventCard({ evento, whatsapp }: EventCardProps) {
  const imgSrc = urlFor(evento.immaginePrincipale).width(800).height(600).url()
  const waMsg = evento.whatsappMessaggio
    ? encodeURIComponent(evento.whatsappMessaggio)
    : encodeURIComponent(`Vorrei prenotare per ${evento.titolo}`)
  const waNumber = whatsapp?.replace(/\D/g, '') ?? ''
  const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

  return (
    <article className="flex flex-col bg-background border border-border overflow-hidden group">
      {/* Immagine */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={imgSrc}
          alt={evento.immaginePrincipale?.alt ?? evento.titolo}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 90vw"
        />
      </div>

      {/* Contenuto */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-center gap-2 text-foreground/50">
          <Calendar size={14} strokeWidth={1.5} />
          <time dateTime={evento.data} className="font-sans text-xs tracking-wide">
            {formatDate(evento.data)}
          </time>
        </div>

        <h3 className="font-serif text-xl text-foreground leading-snug">
          <a href={`/eventi/${evento.slug}`} className="hover:text-accent transition-colors duration-200">
            {evento.titolo}
          </a>
        </h3>

        {evento.descrizioneBreve && (
          <p className="font-sans text-sm text-foreground/55 leading-relaxed">
            {evento.descrizioneBreve}
          </p>
        )}

        <div className="mt-auto pt-4">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-accent/40 hover:decoration-foreground/40"
          >
            Prenota il tuo posto
          </a>
        </div>
      </div>
    </article>
  )
}
