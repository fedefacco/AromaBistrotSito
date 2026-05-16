import { cn } from '@/lib/utils'

type CardProps = {
  hover?: boolean
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export default function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#F5F2EC] border border-border rounded p-5',
        hover && 'transition-shadow duration-200 hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
