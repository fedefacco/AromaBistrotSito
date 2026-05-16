import { cn } from '@/lib/utils'

type BadgeVariant = 'signature' | 'new' | 'vegetarian' | 'vegan' | 'glutenFree'

type BadgeProps = {
  variant: BadgeVariant
  label?: string
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  signature:  'bg-accent/15 text-accent',
  new:        'bg-[#e8f0e9] text-[#5a7a5e]',
  vegetarian: 'bg-[#e6f0e6] text-[#3d6b40]',
  vegan:      'bg-[#d6e8d6] text-[#2d5230]',
  glutenFree: 'bg-[#f5ead6] text-[#7a5a20]',
}

const defaultLabels: Record<BadgeVariant, string> = {
  signature:  'Firma',
  new:        'Novità',
  vegetarian: 'Vegetariano',
  vegan:      'Vegano',
  glutenFree: 'Senza glutine',
}

export default function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block tracking-label px-2 py-0.5 rounded-sm',
        variantClasses[variant],
        className,
      )}
    >
      {label ?? defaultLabels[variant]}
    </span>
  )
}
