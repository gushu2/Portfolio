import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film } from 'lucide-react'
import axios from 'axios'
import VideoModal from './VideoModal'
import VideoCard from './VideoCard'

const CATEGORIES = ['All', 'Reels', 'Cinematic Edits', 'Short Films', 'Events', 'Highlights']

export default function Portfolio() {
  const [videos, setVideos] = useState([])
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/videos')
      .then(res => setVideos(res.data))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = active === 'All' ? videos : videos.filter(v => v.category === active)

  return (
    <section id="portfolio" className="section-pad" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      {/* Mandala background */}
      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Top ornate border */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), rgba(201,169,110,0.6), rgba(201,169,110,0.2), transparent)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1.25rem' }}>My Work</div>
          <h2 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 600, color: '#f0ece4', letterSpacing: '0.08em',
            marginBottom: '1rem'
          }}>Portfolio</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.5))' }} />
            <span style={{ color: '#c9a96e', fontSize: '1rem' }}>✦</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.5))' }} />
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}
        >
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} className="cat-btn" style={{
              padding: '0.5rem 1.4rem',
              border: `1px solid ${active === cat ? '#c9a96e' : 'rgba(201,169,110,0.2)'}`,
              background: active === cat
                ? 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.1))'
                : 'transparent',
              color: active === cat ? '#c9a96e' : '#5a5550',
              fontSize: '0.6rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', fontFamily: 'Cinzel, serif',
              cursor: 'pointer', transition: 'all 0.3s ease',
              boxShadow: active === cat ? '0 0 15px rgba(201,169,110,0.1)' : 'none'
            }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div style={{
              width: '40px', height: '40px',
              border: '1px solid rgba(201,169,110,0.3)',
              borderTopColor: '#c9a96e', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite', margin: '0 auto'
            }} />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '6rem 2rem', border: '1px solid rgba(201,169,110,0.1)', background: 'rgba(201,169,110,0.02)' }}
          >
            <Film size={48} color="rgba(201,169,110,0.2)" style={{ margin: '0 auto 1.5rem' }} />
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', fontWeight: 400, color: '#3a3530', marginBottom: '0.5rem' }}>Coming Soon</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#2a2a2a', letterSpacing: '0.1em' }}>Videos will appear here once uploaded</p>
          </motion.div>
        ) : (
          <div className="portfolio-grid">
            <AnimatePresence>
              {filtered.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} onClick={() => setSelected(video)} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom ornate border */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), rgba(201,169,110,0.6), rgba(201,169,110,0.2), transparent)'
      }} />

      {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
