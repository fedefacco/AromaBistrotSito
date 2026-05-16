import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: React.ReactNode
  withLine?: boolean
  className?: string
}

export default function SectionLabel({ children, withLine = false, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {withLine && <span className="block h-px w-8 bg-accent/40 shrink-0" />}
      <span className="tracking-label text-foreground/50">{children}</span>
    </div>
  )
}
