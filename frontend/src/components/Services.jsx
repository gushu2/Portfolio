import { useState } from 'react'
import { motion } from 'framer-motion'
import { Film, Camera, Smartphone, CalendarDays } from 'lucide-react'

const services = [
  {
    icon: Film, title: 'Video Editing',
    desc: 'Professional post-production with cinematic color grading, sound design, and seamless cuts that bring your footage to life.',
    tags: ['Color Grading', 'Sound Design', '4K Export'],
    num: '01'
  },
  {
    icon: Camera, title: 'Cinematic Shoots',
    desc: 'Full-service cinematography for films, narratives, and branded content — shot with cinema-grade equipment.',
    tags: ['Cinema Cameras', 'Drone Footage', 'Lighting'],
    num: '02'
  },
  {
    icon: Smartphone, title: 'Social Media Content',
    desc: 'Scroll-stopping reels, shorts, and branded content optimized for Instagram, YouTube, and TikTok.',
    tags: ['Reels', 'Shorts', 'Brand Content'],
    num: '03'
  },
  {
    icon: CalendarDays, title: 'Event Coverage',
    desc: 'Weddings, corporate events, and milestone moments captured with a documentary-style cinematic approach.',
    tags: ['Events', 'Corporate', 'Highlights'],
    num: '04'
  }
]

export default function Services() {
  return (
    <section id="services" className="section-pad" style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>
      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Decorative side lines */}
      <div style={{
        position: 'absolute', left: '2rem', top: '10%', bottom: '10%', width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2), transparent)'
      }} />
      <div style={{
        position: 'absolute', right: '2rem', top: '10%', bottom: '10%', width: '1px',
        background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.2), transparent)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4.5rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>What I Offer</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 600, color: '#f0ece4', letterSpacing: '0.08em', marginBottom: '1rem'
          }}>Services</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
            <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: 'rgba(201,169,110,0.08)' }}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const { icon: Icon, title, desc, tags, num } = service
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2.5rem 2rem', background: hovered ? '#0d0d0d' : '#050505',
        transition: 'background 0.3s ease', position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Number watermark */}
      <div style={{
        position: 'absolute', top: '1rem', right: '1.5rem',
        fontFamily: 'Cinzel, serif', fontSize: '3.5rem', fontWeight: 700,
        color: hovered ? 'rgba(201,169,110,0.08)' : 'rgba(201,169,110,0.04)',
        lineHeight: 1, transition: 'color 0.3s', userSelect: 'none'
      }}>{num}</div>

      {/* Top gold line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: hovered
          ? 'linear-gradient(to right, transparent, #c9a96e, transparent)'
          : 'transparent',
        transition: 'background 0.3s'
      }} />

      <div style={{
        width: '48px', height: '48px',
        border: `1px solid ${hovered ? '#c9a96e' : 'rgba(201,169,110,0.2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', transition: 'all 0.3s',
        background: hovered ? 'rgba(201,169,110,0.08)' : 'transparent',
        boxShadow: hovered ? '0 0 20px rgba(201,169,110,0.1)' : 'none'
      }}>
        <Icon size={20} color={hovered ? '#c9a96e' : '#5a5550'} style={{ transition: 'color 0.3s' }} />
      </div>

      <h3 style={{
        fontFamily: 'Cinzel, serif', fontSize: '1.1rem', fontWeight: 500,
        color: hovered ? '#f0ece4' : '#d0cbc3', marginBottom: '0.75rem',
        letterSpacing: '0.05em', transition: 'color 0.3s'
      }}>{title}</h3>
      <p style={{ color: '#6a6460', fontSize: '0.85rem', lineHeight: 1.8, fontFamily: 'Inter, sans-serif', marginBottom: '1.5rem' }}>{desc}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontSize: '0.55rem', letterSpacing: '0.12em', color: hovered ? '#c9a96e' : '#5a5550',
            border: `1px solid ${hovered ? 'rgba(201,169,110,0.3)' : '#1a1a1a'}`,
            padding: '0.25rem 0.65rem', textTransform: 'uppercase',
            fontFamily: 'Cinzel, serif', transition: 'all 0.3s'
          }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}
