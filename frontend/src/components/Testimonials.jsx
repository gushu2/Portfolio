import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah & James',
    role: 'Wedding Clients',
    text: 'Our wedding film is absolutely breathtaking. Every emotion, every glance — captured perfectly. We watch it every anniversary and it still brings us to tears. Truly cinematic work.',
    rating: 5
  },
  {
    name: 'Marcus Chen',
    role: 'Brand Director, Luxe Co.',
    text: 'The commercial we produced together exceeded every expectation. The cinematic quality elevated our brand instantly. Our engagement tripled after the campaign launch.',
    rating: 5
  },
  {
    name: 'Priya Nair',
    role: 'Content Creator',
    text: 'My reels have never looked this good. The editing style is exactly what I envisioned — fast, punchy, and cinematic. My follower count doubled within a month.',
    rating: 5
  },
  {
    name: 'David Okafor',
    role: 'Event Organizer',
    text: 'Covered our annual gala and the highlight reel was stunning. Professional, punctual, and the final product was delivered ahead of schedule. Highly recommend.',
    rating: 5
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(i => (i + 1) % testimonials.length)

  return (
    <section id="testimonials" style={{ padding: '7rem 0', background: '#000' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{
            fontSize: '0.65rem', letterSpacing: '0.35em', color: '#c9a96e',
            textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'Inter, sans-serif'
          }}>Client Stories</p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300, color: '#f0ece4'
          }}>Testimonials</h2>
        </motion.div>

        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: 'center', padding: '3rem 2rem',
                border: '1px solid #1a1a1a', background: '#0a0a0a'
              }}
            >
              <Quote size={28} color="#c9a96e" style={{ margin: '0 auto 2rem', opacity: 0.6 }} />
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 300, color: '#d0cbc3', lineHeight: 1.8,
                fontStyle: 'italic', marginBottom: '2rem'
              }}>
                "{testimonials[current].text}"
              </p>
              <div style={{
                display: 'flex', gap: '0.25rem', justifyContent: 'center', marginBottom: '1rem'
              }}>
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <span key={i} style={{ color: '#c9a96e', fontSize: '0.8rem' }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
                color: '#f0ece4', fontWeight: 500, marginBottom: '0.25rem'
              }}>{testimonials[current].name}</p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
                color: '#5a5550', letterSpacing: '0.1em', textTransform: 'uppercase'
              }}>{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', marginTop: '2rem'
          }}>
            <button onClick={prev} style={{
              width: '40px', height: '40px', border: '1px solid #2a2a2a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#a09a8e', background: 'none', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#a09a8e' }}
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: i === current ? '24px' : '6px', height: '6px',
                  background: i === current ? '#c9a96e' : '#2a2a2a',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.3s ease', borderRadius: '3px'
                }} />
              ))}
            </div>

            <button onClick={next} style={{
              width: '40px', height: '40px', border: '1px solid #2a2a2a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#a09a8e', background: 'none', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#a09a8e' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
