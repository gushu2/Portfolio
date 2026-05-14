import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  Plus, Trash2, Edit3, LogOut, Upload, X, GripVertical, Film, FolderOpen, Check, RefreshCw
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['Reels', 'Cinematic Edits', 'Short Films', 'Events', 'Highlights']

export default function AdminDashboard() {
  const { logout, getToken } = useAuth()
  const navigate = useNavigate()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [editVideo, setEditVideo] = useState(null)

  const fetchVideos = async () => {
    try {
      const res = await axios.get('/api/videos')
      setVideos(res.data)
    } catch {
      toast.error('Failed to load videos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVideos() }, [])

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video? This cannot be undone.')) return
    try {
      await axios.delete(`/api/videos/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      toast.success('Video deleted')
      fetchVideos()
    } catch {
      toast.error('Failed to delete video')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#f0ece4' }}>
      <div style={{
        borderBottom: '1px solid #1a1a1a', padding: '1.25rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(12px)', zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/gushu-logo.png" alt="GUSHU_BHAT" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.2em', color: '#5a5550',
            textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
            borderLeft: '1px solid #2a2a2a', paddingLeft: '1rem'
          }}>Admin Dashboard</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/')} style={linkBtnStyle}>View Site</button>
          <button onClick={handleLogout} style={{ ...linkBtnStyle, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '2.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1px', background: '#1a1a1a', marginBottom: '2.5rem'
        }}>
          {[{ label: 'Total Videos', value: videos.length },
            ...CATEGORIES.map(cat => ({ label: cat, value: videos.filter(v => v.category === cat).length }))
          ].map(({ label, value }) => (
            <div key={label} style={{ background: '#0a0a0a', padding: '1.25rem 1.5rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#c9a96e', lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: '#5a5550', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginTop: '0.25rem' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300 }}>Manage Videos</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => setShowImport(true)} style={{ ...addBtnStyle, background: '#1a1a1a', color: '#c9a96e', border: '1px solid #c9a96e' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#000' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#c9a96e' }}
            >
              <FolderOpen size={14} /> Import from Folder
            </button>
            <button onClick={() => setShowUpload(true)} style={addBtnStyle}
              onMouseEnter={e => e.currentTarget.style.background = '#e8c98a'}
              onMouseLeave={e => e.currentTarget.style.background = '#c9a96e'}
            >
              <Plus size={14} /> Upload Video
            </button>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ width: '32px', height: '32px', border: '1px solid #c9a96e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          </div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', border: '1px dashed #2a2a2a', color: '#5a5550' }}>
            <Film size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>No videos yet. Upload your first project.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1a1a1a' }}>
            {videos.map(video => (
              <VideoRow key={video.id} video={video}
                onEdit={() => setEditVideo(video)}
                onDelete={() => handleDelete(video.id)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showUpload && <UploadModal onClose={() => setShowUpload(false)} onSuccess={() => { setShowUpload(false); fetchVideos() }} getToken={getToken} />}
        {showImport && <ImportModal onClose={() => setShowImport(false)} onSuccess={() => { setShowImport(false); fetchVideos() }} getToken={getToken} />}
        {editVideo && <EditModal video={editVideo} onClose={() => setEditVideo(null)} onSuccess={() => { setEditVideo(null); fetchVideos() }} getToken={getToken} />}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const linkBtnStyle = {
  fontSize: '0.7rem', letterSpacing: '0.15em', color: '#5a5550',
  textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
  background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s'
}

const addBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '0.5rem',
  padding: '0.7rem 1.5rem', background: '#c9a96e', color: '#000',
  border: 'none', cursor: 'pointer', fontSize: '0.7rem',
  letterSpacing: '0.15em', textTransform: 'uppercase',
  fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'background 0.2s'
}

function VideoRow({ video, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: hovered ? '#111' : '#0a0a0a', transition: 'background 0.2s' }}>
      <GripVertical size={14} color="#2a2a2a" style={{ flexShrink: 0 }} />
      <div style={{ width: '80px', height: '45px', background: '#111', flexShrink: 0, overflow: 'hidden' }}>
        {video.thumbnailUrl
          ? <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Film size={14} color="#2a2a2a" /></div>
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#f0ece4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{video.title}</p>
        <p style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: '#c9a96e', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginTop: '0.2rem' }}>{video.category}</p>
      </div>
      <p style={{ fontSize: '0.7rem', color: '#5a5550', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
        {new Date(video.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        <IconBtn onClick={onEdit} hoverColor="#c9a96e"><Edit3 size={13} /></IconBtn>
        <IconBtn onClick={onDelete} hoverColor="#ff4444"><Trash2 size={13} /></IconBtn>
      </div>
    </div>
  )
}

function IconBtn({ onClick, hoverColor, children }) {
  const [h, setH] = useState(false)
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: '32px', height: '32px', border: `1px solid ${h ? hoverColor : '#2a2a2a'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: h ? hoverColor : '#5a5550', background: 'none', cursor: 'pointer', transition: 'all 0.2s'
      }}>
      {children}
    </button>
  )
}

function ModalWrapper({ onClose, title, children }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '560px', background: '#0a0a0a', border: '1px solid #1a1a1a', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #1a1a1a' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#f0ece4' }}>{title}</h3>
          <button onClick={onClose} style={{ color: '#5a5550', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f0ece4'}
            onMouseLeave={e => e.currentTarget.style.color = '#5a5550'}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

function UploadModal({ onClose, onSuccess, getToken }) {
  const [form, setForm] = useState({ title: '', category: '', description: '', youtubeUrl: '' })
  const [videoFile, setVideoFile] = useState(null)
  const [thumbFile, setThumbFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const videoRef = useRef()
  const thumbRef = useRef()

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.category) return toast.error('Title and category are required')
    if (!videoFile && !form.youtubeUrl) return toast.error('Provide a video file or YouTube URL')

    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    if (videoFile) data.append('video', videoFile)
    if (thumbFile) data.append('thumbnail', thumbFile)

    setUploading(true)
    try {
      await axios.post('/api/videos', data, {
        headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' },
        onUploadProgress: e => setProgress(Math.round((e.loaded * 100) / e.total))
      })
      toast.success('Video uploaded successfully')
      onSuccess()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
      setUploading(false)
    }
  }

  return (
    <ModalWrapper onClose={onClose} title="Upload New Video">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormInput label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Cinematic Reel 2024" />
        <FormSelect label="Category *" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={CATEGORIES} />
        <FormTextarea label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Brief description of the project..." />
        <FormInput label="YouTube URL (optional)" value={form.youtubeUrl} onChange={v => setForm(f => ({ ...f, youtubeUrl: v }))} placeholder="https://youtube.com/watch?v=..." />

        {/* Video file */}
        <div>
          <label style={labelStyle}>Video File (optional if YouTube URL provided)</label>
          <div onClick={() => videoRef.current.click()}
            style={{ border: '1px dashed #2a2a2a', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
            <Upload size={20} color="#5a5550" style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ fontSize: '0.8rem', color: '#5a5550', fontFamily: 'Inter, sans-serif' }}>
              {videoFile ? videoFile.name : 'Click to select video (MP4, MOV, MKV, WebM — No size limit, full quality preserved)'}
            </p>
          </div>
          <input ref={videoRef} type="file" accept="video/*" style={{ display: 'none' }}
            onChange={e => setVideoFile(e.target.files[0])} />
        </div>

        {/* Thumbnail */}
        <div>
          <label style={labelStyle}>Thumbnail Image</label>
          <div onClick={() => thumbRef.current.click()}
            style={{ border: '1px dashed #2a2a2a', padding: '1rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
            <p style={{ fontSize: '0.8rem', color: '#5a5550', fontFamily: 'Inter, sans-serif' }}>
              {thumbFile ? thumbFile.name : 'Click to select thumbnail (JPG, PNG, WebP)'}
            </p>
          </div>
          <input ref={thumbRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => setThumbFile(e.target.files[0])} />
        </div>

        {/* Progress bar */}
        {uploading && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#5a5550', fontFamily: 'Inter, sans-serif' }}>Uploading...</span>
              <span style={{ fontSize: '0.7rem', color: '#c9a96e', fontFamily: 'Inter, sans-serif' }}>{progress}%</span>
            </div>
            <div style={{ height: '2px', background: '#1a1a1a', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#c9a96e', width: `${progress}%`, transition: 'width 0.3s ease' }} />
            </div>
          </div>
        )}

        <button type="submit" disabled={uploading} style={{
          padding: '0.85rem', background: uploading ? '#2a2a2a' : '#c9a96e',
          color: '#000', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer',
          fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', fontWeight: 500, marginTop: '0.5rem',
          transition: 'background 0.2s'
        }}>
          {uploading ? `Uploading ${progress}%...` : 'Upload Video'}
        </button>
      </form>
    </ModalWrapper>
  )
}

function EditModal({ video, onClose, onSuccess, getToken }) {
  const [form, setForm] = useState({
    title: video.title, category: video.category,
    description: video.description || '', youtubeUrl: video.youtubeUrl || ''
  })
  const [thumbFile, setThumbFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const thumbRef = useRef()

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    const data = new FormData()
    Object.entries(form).forEach(([k, v]) => data.append(k, v))
    if (thumbFile) data.append('thumbnail', thumbFile)
    try {
      await axios.put(`/api/videos/${video.id}`, data, {
        headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Video updated')
      onSuccess()
    } catch {
      toast.error('Update failed')
      setSaving(false)
    }
  }

  return (
    <ModalWrapper onClose={onClose} title="Edit Video">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <FormInput label="Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
        <FormSelect label="Category" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={CATEGORIES} />
        <FormTextarea label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />
        <FormInput label="YouTube URL" value={form.youtubeUrl} onChange={v => setForm(f => ({ ...f, youtubeUrl: v }))} placeholder="https://youtube.com/watch?v=..." />
        <div>
          <label style={labelStyle}>Replace Thumbnail</label>
          <div onClick={() => thumbRef.current.click()}
            style={{ border: '1px dashed #2a2a2a', padding: '1rem', textAlign: 'center', cursor: 'pointer' }}>
            <p style={{ fontSize: '0.8rem', color: '#5a5550', fontFamily: 'Inter, sans-serif' }}>
              {thumbFile ? thumbFile.name : 'Click to replace thumbnail'}
            </p>
          </div>
          <input ref={thumbRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => setThumbFile(e.target.files[0])} />
        </div>
        <button type="submit" disabled={saving} style={{
          padding: '0.85rem', background: saving ? '#2a2a2a' : '#c9a96e',
          color: '#000', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
          fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'background 0.2s'
        }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </ModalWrapper>
  )
}

// Shared form components
const labelStyle = {
  display: 'block', fontSize: '0.65rem', letterSpacing: '0.15em',
  color: '#5a5550', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
  marginBottom: '0.4rem'
}

const fieldStyle = {
  width: '100%', padding: '0.8rem 1rem', background: '#111',
  border: '1px solid #2a2a2a', color: '#f0ece4',
  fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', outline: 'none'
}

function FormInput({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} style={fieldStyle}
        onFocus={e => e.target.style.borderColor = '#c9a96e'}
        onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
    </div>
  )
}

function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ ...fieldStyle, color: value ? '#f0ece4' : '#5a5550' }}
        onFocus={e => e.target.style.borderColor = '#c9a96e'}
        onBlur={e => e.target.style.borderColor = '#2a2a2a'}>
        <option value="">Select category</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function FormTextarea({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea value={value} placeholder={placeholder} rows={3}
        onChange={e => onChange(e.target.value)}
        style={{ ...fieldStyle, resize: 'vertical', minHeight: '80px' }}
        onFocus={e => e.target.style.borderColor = '#c9a96e'}
        onBlur={e => e.target.style.borderColor = '#2a2a2a'} />
    </div>
  )
}

function ImportModal({ onClose, onSuccess, getToken }) {
  const [files, setFiles] = useState([])
  const [thumbFiles, setThumbFiles] = useState([])
  const [scanning, setScanning] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ title: '', category: '', description: '', thumbnailFilename: '' })
  const [saving, setSaving] = useState(false)

  const scan = async () => {
    setScanning(true)
    try {
      const res = await axios.get('/api/import/scan', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      setFiles(res.data.files)
      setThumbFiles(res.data.thumbFiles)
    } catch {
      toast.error('Scan failed')
    } finally {
      setScanning(false)
    }
  }

  useEffect(() => { scan() }, [])

  const handleSelect = (file) => {
    setSelected(file)
    const nameWithoutExt = file.filename.replace(/\.[^.]+$/, '')
    setForm({ title: nameWithoutExt.replace(/[-_]/g, ' '), category: '', description: '', thumbnailFilename: '' })
  }

  const handleRegister = async e => {
    e.preventDefault()
    if (!form.title || !form.category) return toast.error('Title and category required')
    setSaving(true)
    try {
      await axios.post('/api/import/register', {
        filename: selected.filename,
        title: form.title,
        category: form.category,
        description: form.description,
        thumbnailFilename: form.thumbnailFilename || undefined
      }, { headers: { Authorization: `Bearer ${getToken()}` } })
      toast.success(`"${form.title}" added to portfolio`)
      setSelected(null)
      scan()
      onSuccess()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register')
      setSaving(false)
    }
  }

  const folderPath = 'videography-portfolio\\backend\\uploads\\videos\\'

  return (
    <ModalWrapper onClose={onClose} title="Import from Folder">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: '1rem 1.25rem', borderLeft: '2px solid #c9a96e' }}>
          <p style={{ fontSize: '0.7rem', color: '#c9a96e', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Step 1 — Copy your video files here:
          </p>
          <p style={{ fontSize: '0.8rem', color: '#f0ece4', fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {folderPath}
          </p>
          <p style={{ fontSize: '0.72rem', color: '#5a5550', fontFamily: 'Inter, sans-serif', marginTop: '0.4rem' }}>
            Supports: MP4, MOV, MKV, WebM, AVI — any size, up to 1 hour+
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: '#5a5550', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Step 2 — Select a file to add
          </p>
          <button onClick={scan} disabled={scanning} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.65rem', color: '#c9a96e', background: 'none',
            border: '1px solid #2a2a2a', padding: '0.4rem 0.8rem',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em'
          }}>
            <RefreshCw size={11} style={{ animation: scanning ? 'spin 0.8s linear infinite' : 'none' }} />
            Rescan
          </button>
        </div>

        {scanning ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '24px', height: '24px', border: '1px solid #c9a96e', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          </div>
        ) : files.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', border: '1px dashed #1a1a1a', color: '#3a3530' }}>
            <FolderOpen size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.3 }} />
            <p style={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>No video files found in the folder yet.</p>
            <p style={{ fontSize: '0.72rem', fontFamily: 'Inter, sans-serif', marginTop: '0.3rem', color: '#2a2a2a' }}>Copy your videos there, then click Rescan.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '220px', overflowY: 'auto' }}>
            {files.map(f => (
              <div key={f.filename}
                onClick={() => !f.alreadyImported && handleSelect(f)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  background: selected?.filename === f.filename ? '#1a1a1a' : '#0d0d0d',
                  border: selected?.filename === f.filename ? '1px solid #c9a96e' : '1px solid transparent',
                  cursor: f.alreadyImported ? 'default' : 'pointer',
                  opacity: f.alreadyImported ? 0.4 : 1,
                  transition: 'all 0.2s'
                }}>
                <Film size={14} color={f.alreadyImported ? '#2a2a2a' : '#c9a96e'} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.82rem', color: '#f0ece4', fontFamily: 'Inter, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.filename}
                  </p>
                  <p style={{ fontSize: '0.65rem', color: '#5a5550', fontFamily: 'Inter, sans-serif' }}>{f.size}</p>
                </div>
                {f.alreadyImported && (
                  <span style={{ fontSize: '0.6rem', color: '#5a5550', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}>
                    Already added
                  </span>
                )}
                {selected?.filename === f.filename && <Check size={14} color="#c9a96e" style={{ flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        )}

        {selected && (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', borderTop: '1px solid #1a1a1a', paddingTop: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#5a5550', fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Step 3 — Fill in details for: <span style={{ color: '#c9a96e' }}>{selected.filename}</span>
            </p>
            <FormInput label="Title *" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="e.g. Cinematic Reel 2024" />
            <FormSelect label="Category *" value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={CATEGORIES} />
            <FormTextarea label="Description" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Short description..." />
            {thumbFiles.length > 0 && (
              <div>
                <label style={labelStyle}>Thumbnail (optional — pick from thumbnails folder)</label>
                <select value={form.thumbnailFilename} onChange={e => setForm(f => ({ ...f, thumbnailFilename: e.target.value }))}
                  style={{ ...fieldStyle, color: form.thumbnailFilename ? '#f0ece4' : '#5a5550' }}>
                  <option value="">No thumbnail</option>
                  {thumbFiles.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
            <button type="submit" disabled={saving} style={{
              padding: '0.85rem', background: saving ? '#2a2a2a' : '#c9a96e',
              color: '#000', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'background 0.2s'
            }}>
              {saving ? 'Adding...' : 'Add to Portfolio'}
            </button>
          </form>
        )}
      </div>
    </ModalWrapper>
  )
}
