import { motion } from 'framer-motion'
import { Film, Award, Smartphone, Zap } from 'lucide-react'

const stats = [
  { icon: Film, value: '5+', label: 'Years Experience' },
  { icon: Award, value: '200+', label: 'Projects Completed' },
  { icon: Smartphone, value: '4K', label: 'Ultra HD Quality' },
  { icon: Zap, value: '48hr', label: 'Turnaround' },
]

export default function About() {
  return (
    <section id="about" className="section-pad" style={{ background: '#000', position: 'relative', overflow: 'hidden' }}>
      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Warm side glow */}
      <div style={{
        position: 'absolute', left: 0, top: '20%', width: '300px', height: '60%',
        background: 'radial-gradient(ellipse at left, rgba(139,90,43,0.08), transparent)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>About Me</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 600, color: '#f0ece4', letterSpacing: '0.08em', marginBottom: '1rem'
          }}>The Storyteller</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
            <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
          </div>
        </motion.div>

        <div className="about-grid">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ position: 'relative' }}
          >
            {/* Ornate frame */}
            <div style={{ position: 'relative', padding: '12px' }}>
              <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(201,169,110,0.3)' }} />
              <div style={{ position: 'absolute', inset: '6px', border: '1px solid rgba(201,169,110,0.1)' }} />
              {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', width: '8px', height: '8px', background: '#c9a96e', ...pos,
                  transform: 'translate(-50%, -50%)',
                  ...(pos.right !== undefined ? { transform: 'translate(50%, -50%)' } : {}),
                  ...(pos.bottom !== undefined && pos.left !== undefined ? { transform: 'translate(-50%, 50%)' } : {}),
                  ...(pos.bottom !== undefined && pos.right !== undefined ? { transform: 'translate(50%, 50%)' } : {}),
                }} />
              ))}
              <div style={{ aspectRatio: '3/4', background: '#0d0d0d', overflow: 'hidden' }}>
                <img src="/gushu-logo.png" alt="GuruGanesh N Bhat"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2rem' }} />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="about-floating-badge"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: '1.5rem', left: '-2rem',
                background: 'linear-gradient(135deg, #0d0d0d, #141414)',
                border: '1px solid rgba(201,169,110,0.4)',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(201,169,110,0.08)'
              }}
            >
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '2.2rem', fontWeight: 600, color: '#c9a96e', lineHeight: 1 }}>5+</p>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#5a5550', textTransform: 'uppercase', fontFamily: 'Cinzel, serif', marginTop: '0.3rem' }}>Years of Craft</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <h3 style={{
              fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 500, color: '#f0ece4', lineHeight: 1.2, marginBottom: '0.4rem'
            }}>
              Hi, I'm GuruGanesh N Bhat
            </h3>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
              fontStyle: 'italic', color: '#c9a96e', marginBottom: '1.75rem', letterSpacing: '0.03em'
            }}>
              Reel Maker &amp; Video Editor
            </p>

            <p style={{ color: '#a09a8e', lineHeight: 1.9, marginBottom: '1.1rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
              A passionate Computer Science student at SMVITM with a deep love for digital content creation, cinematography, and professional video editing. With 5+ years of experience crafting cinematic reels, event highlights, and aesthetic edits — I bring stories to life frame by frame.
            </p>
            <p style={{ color: '#a09a8e', lineHeight: 1.9, marginBottom: '1.1rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
              Specializing in Adobe Premiere Pro and CapCut, I deliver high-quality visuals with smooth transitions, clean color grading, synced beats, and modern storytelling that instantly captures attention.
            </p>
            <p style={{ color: '#a09a8e', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
              Blending technical knowledge from computer science with creative visual storytelling — my goal is to build unique digital experiences that leave a lasting impression.
            </p>

            {/* Skill tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {['Adobe Premiere Pro', 'CapCut', 'Color Grading', 'Cinematic Reels', 'Instagram', 'YouTube'].map(tag => (
                <span key={tag} style={{
                  fontSize: '0.58rem', letterSpacing: '0.12em', color: '#c9a96e',
                  border: '1px solid rgba(201,169,110,0.25)', padding: '0.3rem 0.8rem',
                  textTransform: 'uppercase', fontFamily: 'Cinzel, serif',
                  background: 'rgba(201,169,110,0.04)'
                }}>{tag}</span>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
              background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.1)'
            }}>
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1.25rem', background: '#000',
                  transition: 'background 0.3s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = '#000'}
                >
                  <Icon size={16} color="#c9a96e" />
                  <div>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.3rem', fontWeight: 600, color: '#c9a96e', lineHeight: 1 }}>{value}</p>
                    <p style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: '#5a5550', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid { padding: 0 0.5rem; }
        .section-pad { padding: 7rem 0; }
        @media (max-width: 768px) {
          .section-pad { padding: 4rem 0; }
          .about-floating-badge { position: relative !important; left: 0 !important; bottom: 0 !important; display: inline-block; margin-top: 1rem; }
        }
      `}</style>
    </section>
  )
}
