'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type FloatingCTAProps = {
  telefono?: string
  whatsapp?: string
}

const spring = { type: 'spring', stiffness: 260, damping: 20 }

export default function FloatingCTA({
  telefono = '+390373000000',
  whatsapp = '393000000000',
}: FloatingCTAProps) {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3 items-end">
      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Prenota su WhatsApp"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 1.1 }}
        className={cn(
          'flex items-center gap-2.5 bg-[#25D366] text-white shadow-lg',
          'h-12 px-4 rounded-full',
          'hover:bg-[#1db954] transition-colors duration-200',
          'min-w-[48px] min-h-[48px]',
        )}
      >
        <MessageCircle size={20} className="shrink-0" />
        <span className="hidden md:inline text-sm font-medium tracking-wide">Prenota</span>
      </motion.a>

      {/* Telefono */}
      <motion.a
        href={`tel:${telefono}`}
        aria-label="Chiama il ristorante"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 1.25 }}
        className={cn(
          'flex items-center gap-2.5 bg-foreground text-background shadow-lg',
          'h-12 px-4 rounded-full',
          'hover:bg-foreground/80 transition-colors duration-200',
          'min-w-[48px] min-h-[48px]',
        )}
      >
        <Phone size={20} className="shrink-0" />
        <span className="hidden md:inline text-sm font-medium tracking-wide">Chiama</span>
      </motion.a>
    </div>
  )
}
