import type { SezioniVisibili } from '@/types'

interface PresentationSectionProps {
  presentazione?: string
  sezioniVisibili?: SezioniVisibili
}

export default function PresentationSection({ presentazione, sezioniVisibili }: PresentationSectionProps) {
  if (!sezioniVisibili?.presentazione || !presentazione) return null

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic mb-10">
          {presentazione}
        </p>
        <a
          href="/il-bistrot"
          className="font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-accent/40 hover:decoration-foreground/40"
        >
          Scopri il bistrot
        </a>
      </div>
    </section>
  )
}
