import { motion } from 'framer-motion'
import { Phone, Mail, Link2 } from 'lucide-react'

const contacts = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 79752 74584',
    href: 'tel:+917975274584',
    sub: 'Call or WhatsApp'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'guruganeshbhat51@gmail.com',
    href: 'mailto:guruganeshbhat51@gmail.com',
    sub: 'Drop a message anytime'
  },
  {
    icon: Link2,
    label: 'Instagram',
    value: '@gushu_bhat',
    href: 'https://www.instagram.com/gushu_bhat?igsh=bWI5dGY2a3A3amw=',
    sub: 'DM for collaborations'
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-pad" style={{ background: '#000', position: 'relative', overflow: 'hidden' }}>
      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(139,90,43,0.1), transparent)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>Get In Touch</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 600, color: '#f0ece4', letterSpacing: '0.08em', marginBottom: '1rem'
          }}>Let's Create Together</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
            <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
          </div>
          <p style={{
            color: '#a09a8e', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif',
            lineHeight: 1.8, maxWidth: '520px', margin: '0 auto'
          }}>
            Ready to bring your vision to life? Reach out directly — I'd love to hear about your project.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2px',
          background: 'rgba(201,169,110,0.08)',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {contacts.map(({ icon: Icon, label, value, href, sub }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '3rem 2rem', background: '#000',
                textDecoration: 'none', transition: 'background 0.3s',
                position: 'relative', overflow: 'hidden', textAlign: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,169,110,0.05)'
                e.currentTarget.querySelector('.contact-top-line').style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#000'
                e.currentTarget.querySelector('.contact-top-line').style.opacity = '0'
              }}
            >
              {/* Top gold line on hover */}
              <div className="contact-top-line" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: 'linear-gradient(to right, transparent, #c9a96e, transparent)',
                opacity: 0, transition: 'opacity 0.3s'
              }} />

              <div style={{
                width: '60px', height: '60px',
                border: '1px solid rgba(201,169,110,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem', background: 'rgba(201,169,110,0.04)',
                transition: 'all 0.3s'
              }}>
                <Icon size={22} color="#c9a96e" />
              </div>

              <p style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.25em',
                color: '#5a5550', textTransform: 'uppercase', marginBottom: '0.6rem'
              }}>{label}</p>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
                color: '#f0ece4', marginBottom: '0.4rem', fontWeight: 400,
                wordBreak: 'break-all'
              }}>{value}</p>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
                color: '#5a5550', letterSpacing: '0.05em'
              }}>{sub}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
