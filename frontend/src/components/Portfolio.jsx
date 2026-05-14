import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film } from 'lucide-react'
import VideoModal from './VideoModal'
import VideoCard from './VideoCard'

const CATEGORIES = ['All', 'Reels', 'Cinematic Edits', 'Short Films', 'Events', 'Highlights']

const VIDEOS = [
  {
    id: '2fb85ddd-944a-429b-921b-4aa840c33031',
    title: 'MITK COLLEGE FEST',
    category: 'Reels',
    description: 'Energetic highlights reel from MITK college fest.',
    videoUrl: 'https://drive.google.com/file/d/1lb88g-TI4CEfuEozoadWyA7LkE_WZ5Fu/view',
    thumbnailUrl: null,
    youtubeUrl: null
  },
  {
    id: '488bd43d-070d-48b6-b416-0c8c6e03cff4',
    title: 'NAVARATRI 2025 TRAILER',
    category: 'Reels',
    description: 'Cinematic trailer for Navaratri 2025 celebrations.',
    videoUrl: 'https://drive.google.com/file/d/13kytvxtWtrJWyEg5KUSZ3ecuBHvPC9Pt/view',
    thumbnailUrl: null,
    youtubeUrl: null
  },
  {
    id: '8e45e42b-6c58-42b5-b5ac-b418efc11dfd',
    title: 'TARANA BAND HIGHLIGHTS',
    category: 'Cinematic Edits',
    description: 'Cinematic highlights of Tarana Band performance.',
    videoUrl: 'https://drive.google.com/file/d/11aqPIsP8J855_Txb-oDkHJs4a56dFqsn/view',
    thumbnailUrl: null,
    youtubeUrl: null
  }
]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = active === 'All' ? VIDEOS : VIDEOS.filter(v => v.category === active)

  return (
    <section id="portfolio" className="section-pad" style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div className="mandala-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

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

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', padding: '6rem 2rem', border: '1px solid rgba(201,169,110,0.1)', background: 'rgba(201,169,110,0.02)' }}
          >
            <Film size={48} color="rgba(201,169,110,0.2)" style={{ margin: '0 auto 1.5rem' }} />
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.2rem', fontWeight: 400, color: '#3a3530', marginBottom: '0.5rem' }}>No videos in this category</p>
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

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), rgba(201,169,110,0.6), rgba(201,169,110,0.2), transparent)'
      }} />

      {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
