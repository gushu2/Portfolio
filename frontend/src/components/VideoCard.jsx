import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Film } from 'lucide-react'

export default function VideoCard({ video, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (video.thumbnailUrl || !video.videoUrl) return

    const vid = document.createElement('video')
    vid.crossOrigin = 'anonymous'
    vid.preload = 'metadata'
    vid.muted = true
    vid.src = video.videoUrl

    vid.addEventListener('loadeddata', () => {
      vid.currentTime = 2
    })

    vid.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = vid.videoWidth || 640
        canvas.height = vid.videoHeight || 360
        const ctx = canvas.getContext('2d')
        ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)
        setPreviewUrl(canvas.toDataURL('image/jpeg', 0.8))
      } catch {
        // canvas tainted or error — leave previewUrl null
      }
    })

    vid.load()
  }, [video.videoUrl, video.thumbnailUrl])

  const thumb = video.thumbnailUrl || previewUrl

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', aspectRatio: '16/9',
        overflow: 'hidden', background: '#111',
        cursor: 'pointer'
      }}
    >
      {thumb ? (
        <img
          src={thumb}
          alt={video.title}
          loading="lazy"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)'
          }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
        }}>
          <Film size={28} color="#2a2a2a" />
          <p style={{
            fontSize: '0.6rem', color: '#2a2a2a', fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.15em', textTransform: 'uppercase'
          }}>Loading preview...</p>
        </div>
      )}

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        opacity: hovered ? 1 : 0.6,
        transition: 'opacity 0.4s ease'
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s ease'
      }}>
        <div style={{
          width: '60px', height: '60px',
          border: `2px solid ${hovered ? '#c9a96e' : 'rgba(201,169,110,0.5)'}`,
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? 'rgba(201,169,110,0.15)' : 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.1)' : 'scale(1)'
        }}>
          <Play size={20} color="#c9a96e" fill="#c9a96e" style={{ marginLeft: '3px' }} />
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.25rem 1rem',
        transform: hovered ? 'translateY(0)' : 'translateY(4px)',
        transition: 'transform 0.3s ease'
      }}>
        <p style={{
          fontSize: '0.6rem', letterSpacing: '0.2em', color: '#c9a96e',
          textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '0.3rem'
        }}>{video.category}</p>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem',
          fontWeight: 400, color: '#f0ece4'
        }}>{video.title}</h3>
      </div>
    </motion.div>
  )
}
