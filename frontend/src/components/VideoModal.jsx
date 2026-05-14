import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import { X } from 'lucide-react'

export default function VideoModal({ video, onClose }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!video) return null

  const isYoutube = video.youtubeUrl && video.youtubeUrl.trim() !== ''
  const isLocalFile = !isYoutube && video.videoUrl

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(0px, 2vw, 1rem)',
          overflowY: 'auto'
        }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={e => e.stopPropagation()}
          className="video-modal-inner"
          style={{
            background: '#0d0d0d', border: '1px solid #1a1a1a',
            overflow: 'hidden'
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.5rem', borderBottom: '1px solid #1a1a1a'
          }}>
            <div>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem',
                fontWeight: 400, color: '#f0ece4', letterSpacing: '0.02em'
              }}>{video.title}</h3>
              <span style={{
                fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#c9a96e', fontFamily: 'Inter, sans-serif'
              }}>{video.category}</span>
            </div>
            <button onClick={onClose}
              style={{
                color: '#5a5550', transition: 'color 0.2s',
                background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#f0ece4'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a5550'}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
            {isYoutube ? (
              <ReactPlayer
                url={video.youtubeUrl}
                width="100%" height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                controls
                playing
                config={{ youtube: { playerVars: { showinfo: 1 } } }}
              />
            ) : isLocalFile ? (
              <video
                ref={videoRef}
                src={video.videoUrl}
                controls
                autoPlay
                playsInline
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  background: '#000', outline: 'none'
                }}
                onError={(e) => {
                  console.error('Video error:', e.target.error)
                }}
              >
                <source src={video.videoUrl} type="video/mp4" />
                <source src={video.videoUrl} type="video/webm" />
                <source src={video.videoUrl} type="video/quicktime" />
              </video>
            ) : (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: '#5a5550', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem'
              }}>
                No video source available
              </div>
            )}
          </div>

          {video.description && (
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #1a1a1a' }}>
              <p style={{
                color: '#a09a8e', fontSize: '0.85rem', lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif'
              }}>{video.description}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
