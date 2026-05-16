import type { Event, SezioniVisibili } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import EventCard from '@/components/shared/EventCard'

interface EventsPreviewSectionProps {
  eventi?: Event[]
  sezioniVisibili?: SezioniVisibili
  whatsapp?: string
}

export default function EventsPreviewSection({
  eventi,
  sezioniVisibili,
  whatsapp,
}: EventsPreviewSectionProps) {
  if (!sezioniVisibili?.eventi) return null
  if (!eventi?.length) return null

  const prossimi = eventi.slice(0, 2)

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionLabel withLine>PROSSIMI EVENTI</SectionLabel>
          <a
            href="/eventi"
            className="font-sans text-sm tracking-wide text-accent hover:text-foreground transition-colors duration-200 underline underline-offset-4 decoration-accent/40 hover:decoration-foreground/40"
          >
            Tutti gli eventi
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {prossimi.map((evento) => (
            <EventCard key={evento._id} evento={evento} whatsapp={whatsapp} />
          ))}
        </div>
      </div>
    </section>
  )
}
