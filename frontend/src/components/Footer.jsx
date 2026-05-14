import { Mail, Phone, Link2 } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer style={{ background: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Top ornate border */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), rgba(201,169,110,0.7), rgba(201,169,110,0.2), transparent)'
      }} />

      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '3.5rem 2rem 2rem' }}>

        {/* Main footer content */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>

          {/* Logo */}
          <div>
            <img src="/gushu-logo.png" alt="GUSHU_BHAT"
              style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
            <p style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.3em',
              color: '#5a5550', textTransform: 'uppercase', marginTop: '0.5rem'
            }}>Your Story, Our Reel</p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[['#portfolio', 'Work'], ['#about', 'About'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
              <button key={label} onClick={() => scrollTo(href)} style={{
                color: '#5a5550', fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontFamily: 'Cinzel, serif',
                background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s'
              }}
                onMouseEnter={e => e.target.style.color = '#c9a96e'}
                onMouseLeave={e => e.target.style.color = '#5a5550'}
              >{label}</button>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { icon: Link2, href: 'https://www.instagram.com/gushu_bhat?igsh=bWI5dGY2a3A3amw=', label: 'Instagram' },
              { icon: Mail, href: 'mailto:guruganeshbhat51@gmail.com', label: 'Email' },
              { icon: Phone, href: 'tel:+917975274584', label: 'Phone' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                title={label}
                style={{
                  width: '40px', height: '40px',
                  border: '1px solid rgba(201,169,110,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#5a5550', transition: 'all 0.3s',
                  background: 'rgba(201,169,110,0.02)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#c9a96e'
                  e.currentTarget.style.color = '#c9a96e'
                  e.currentTarget.style.background = 'rgba(201,169,110,0.08)'
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(201,169,110,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.2)'
                  e.currentTarget.style.color = '#5a5550'
                  e.currentTarget.style.background = 'rgba(201,169,110,0.02)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider with ornament */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2))' }} />
          <span style={{ color: 'rgba(201,169,110,0.4)', fontSize: '0.7rem' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.2))' }} />
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.65rem', color: '#2a2a2a', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>
            © {year} GUSHU_BHAT. All rights reserved.
          </p>
          <p style={{ fontSize: '0.65rem', color: '#2a2a2a', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
            Your Story, Our Reel
          </p>
        </div>
      </div>
    </footer>
  )
}
