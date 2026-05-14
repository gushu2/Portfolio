import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const OrnateCorner = ({ style }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={style}>
    <path d="M2 2 L20 2 M2 2 L2 20" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5"/>
    <path d="M2 2 L12 12" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5"/>
    <circle cx="2" cy="2" r="2" fill="rgba(201,169,110,0.6)"/>
    <circle cx="12" cy="12" r="1" fill="rgba(201,169,110,0.3)"/>
  </svg>
)

export default function Hero() {
  const scrollToPortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: '640px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: '#000'
    }}>
      <video autoPlay muted loop playsInline style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.35
      }}>
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Deep gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.7) 100%)'
      }} />

      {/* Mandala pattern overlay */}
      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Warm amber vignette at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to top, rgba(139,90,43,0.12), transparent)'
      }} />

      {/* Ornate corner decorations */}
      <OrnateCorner style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 3 }} />
      <OrnateCorner style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 3, transform: 'scaleX(-1)' }} />
      <OrnateCorner style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 3, transform: 'scaleY(-1)' }} />
      <OrnateCorner style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 3, transform: 'scale(-1)' }} />

      {/* Horizontal ornate lines — hidden on mobile via CSS */}
      <div className="hero-ornate-line" style={{
        position: 'absolute', top: '1.5rem', left: '80px', right: '80px', height: '1px', zIndex: 3,
        background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), rgba(201,169,110,0.5), rgba(201,169,110,0.3), transparent)'
      }} />
      <div className="hero-ornate-line" style={{
        position: 'absolute', bottom: '1.5rem', left: '80px', right: '80px', height: '1px', zIndex: 3,
        background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3), rgba(201,169,110,0.5), rgba(201,169,110,0.3), transparent)'
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.6))' }} />
          <span style={{ color: 'rgba(201,169,110,0.7)', fontSize: '0.9rem' }}>✦</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.6))' }} />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <img
            src="/gushu-logo.png"
            alt="GUSHU_BHAT — Reel Maker"
            style={{
              width: 'clamp(240px, 38vw, 500px)',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 0 40px rgba(201,169,110,0.4)) drop-shadow(0 0 80px rgba(201,169,110,0.15))'
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,169,110,0.4)' }} />
          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
            letterSpacing: '0.5em', color: '#c9a96e', textTransform: 'uppercase', fontWeight: 400
          }}>
            Reel Maker &nbsp;·&nbsp; Video Editor &nbsp;·&nbsp; Cinematographer
          </p>
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,169,110,0.4)' }} />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          onClick={scrollToPortfolio}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '0.9rem 3rem',
            border: '1px solid rgba(201,169,110,0.7)',
            color: '#c9a96e', background: 'transparent',
            fontSize: '0.65rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', fontFamily: 'Cinzel, serif',
            fontWeight: 400, cursor: 'pointer',
            transition: 'all 0.4s ease',
            position: 'relative', overflow: 'hidden'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(201,169,110,0.12)'
            e.currentTarget.style.borderColor = '#c9a96e'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(201,169,110,0.2), inset 0 0 30px rgba(201,169,110,0.05)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.7)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          View My Work
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem'
        }}
      >
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#5a5550', fontFamily: 'Cinzel, serif', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown size={16} color="#5a5550" />
        </motion.div>
      </motion.div>
    </section>
  )
}
