import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Work', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0.6rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(0,0,0,0.96)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        {/* Gold line at bottom of nav when scrolled */}
        {scrolled && (
          <div style={{
            position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)'
          }} />
        )}

        <a href="#hero" onClick={e => { e.preventDefault(); handleNav('#hero') }}
          style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/gushu-logo.png" alt="GUSHU_BHAT"
            style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </a>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <button key={l.label} onClick={() => handleNav(l.href)}
              style={{
                color: '#a09a8e', fontSize: '0.65rem', letterSpacing: '0.25em',
                textTransform: 'uppercase', fontWeight: 400, fontFamily: 'Cinzel, serif',
                transition: 'color 0.3s', background: 'none', border: 'none', cursor: 'pointer',
                position: 'relative', paddingBottom: '2px'
              }}
              onMouseEnter={e => { e.target.style.color = '#c9a96e' }}
              onMouseLeave={e => { e.target.style.color = '#a09a8e' }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: '#c9a96e', display: 'none' }} className="mobile-menu-btn">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
              background: 'rgba(0,0,0,0.98)', backdropFilter: 'blur(20px)',
              padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
              borderBottom: '1px solid rgba(201,169,110,0.2)'
            }}
          >
            {links.map(l => (
              <button key={l.label} onClick={() => handleNav(l.href)}
                style={{
                  color: '#f0ece4', fontSize: '1rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', fontWeight: 400, textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Cinzel, serif'
                }}>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
