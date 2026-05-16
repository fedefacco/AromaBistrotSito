'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const links = [
  { href: '/menu', label: 'Menu' },
  { href: '/galleria', label: 'Galleria' },
  { href: '/il-bistrot', label: 'Il Bistrot' },
  { href: '/vini', label: 'Vini' },
  { href: '/eventi', label: 'Eventi' },
  { href: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const pathname = usePathname()
  const direction = useScrollDirection()
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Blocca lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Trasparente solo sulla homepage quando si è in cima (dove c'è l'hero scuro)
  const isAtTop = pathname === '/' && scrollY < 80
  const isHidden = direction === 'down' && !menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isAtTop
            ? 'bg-transparent'
            : 'bg-background shadow-sm',
          isHidden && '-translate-y-full',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'font-serif text-xl tracking-wide transition-colors duration-300',
              isAtTop ? 'text-white' : 'text-foreground',
            )}
            onClick={() => setMenuOpen(false)}
          >
            Aroma Bistrot
          </Link>

          {/* Link desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'relative text-sm tracking-wide transition-colors duration-200',
                      isAtTop
                        ? 'text-white/90 hover:text-white'
                        : 'text-foreground/70 hover:text-foreground',
                      active && 'font-medium',
                    )}
                  >
                    {label}
                    {active && (
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-0 right-0 h-px',
                          isAtTop ? 'bg-white' : 'bg-accent',
                        )}
                      />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Hamburger mobile */}
          <button
            className={cn(
              'md:hidden p-2 transition-colors duration-300',
              isAtTop ? 'text-white' : 'text-foreground',
            )}
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Overlay menu mobile */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-background transition-opacity duration-300 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex h-16 items-center justify-end px-6">
          {/* Il bottone X è già nella navbar sopra */}
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-10">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'font-serif text-4xl transition-colors duration-200',
                    active ? 'text-accent' : 'text-foreground hover:text-accent',
                  )}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
