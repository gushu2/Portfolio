const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/videos.json');

const readVideos = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
};

const writeVideos = (videos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(videos, null, 2));
};

// Multer storage config - preserve original quality
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.mimetype.startsWith('video/')
      ? path.join(__dirname, '../uploads/videos')
      : path.join(__dirname, '../uploads/thumbnails');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const upload = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'video') {
      const allowed = /mp4|mov|avi|mkv|webm|m4v|mts|m2ts|hevc|h264|prores/i;
      if (allowed.test(path.extname(file.originalname))) return cb(null, true);
      return cb(new Error('Only video files allowed'));
    }
    if (file.fieldname === 'thumbnail') {
      const allowed = /jpg|jpeg|png|webp|heic/i;
      if (allowed.test(path.extname(file.originalname))) return cb(null, true);
      return cb(new Error('Only image files allowed for thumbnail'));
    }
    cb(null, true);
  }
});

// Public: get all videos
router.get('/', (req, res) => {
  const videos = readVideos();
  const { category } = req.query;
  const result = category ? videos.filter(v => v.category === category) : videos;
  res.json(result.sort((a, b) => a.order - b.order));
});

// Public: get single video
router.get('/:id', (req, res) => {
  const videos = readVideos();
  const video = videos.find(v => v.id === req.params.id);
  if (!video) return res.status(404).json({ message: 'Video not found' });
  res.json(video);
});

// Admin: upload video
router.post('/', authenticateAdmin, upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category) {
    return res.status(400).json({ message: 'Title and category are required.' });
  }

  const videos = readVideos();
  const newVideo = {
    id: uuidv4(),
    title,
    category,
    description: description || '',
    videoUrl: req.files?.video ? `/uploads/videos/${req.files.video[0].filename}` : null,
    thumbnailUrl: req.files?.thumbnail ? `/uploads/thumbnails/${req.files.thumbnail[0].filename}` : null,
    youtubeUrl: req.body.youtubeUrl || null,
    order: videos.length,
    createdAt: new Date().toISOString()
  };

  videos.push(newVideo);
  writeVideos(videos);
  res.status(201).json(newVideo);
});

// Admin: update video metadata
router.put('/:id', authenticateAdmin, upload.fields([
  { name: 'thumbnail', maxCount: 1 }
]), (req, res) => {
  const videos = readVideos();
  const idx = videos.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Video not found' });

  const { title, category, description, youtubeUrl } = req.body;
  videos[idx] = {
    ...videos[idx],
    title: title || videos[idx].title,
    category: category || videos[idx].category,
    description: description !== undefined ? description : videos[idx].description,
    youtubeUrl: youtubeUrl !== undefined ? youtubeUrl : videos[idx].youtubeUrl,
    thumbnailUrl: req.files?.thumbnail
      ? `/uploads/thumbnails/${req.files.thumbnail[0].filename}`
      : videos[idx].thumbnailUrl,
    updatedAt: new Date().toISOString()
  };

  writeVideos(videos);
  res.json(videos[idx]);
});

// Admin: reorder videos
router.put('/reorder/batch', authenticateAdmin, (req, res) => {
  const { order } = req.body; // array of { id, order }
  if (!Array.isArray(order)) return res.status(400).json({ message: 'Order array required' });

  const videos = readVideos();
  order.forEach(({ id, order: newOrder }) => {
    const v = videos.find(v => v.id === id);
    if (v) v.order = newOrder;
  });

  writeVideos(videos);
  res.json({ message: 'Reordered successfully' });
});

// Admin: delete video
router.delete('/:id', authenticateAdmin, (req, res) => {
  const videos = readVideos();
  const idx = videos.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Video not found' });

  const video = videos[idx];

  // Delete files from disk
  if (video.videoUrl) {
    const filePath = path.join(__dirname, '..', video.videoUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  if (video.thumbnailUrl) {
    const filePath = path.join(__dirname, '..', video.thumbnailUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  videos.splice(idx, 1);
  writeVideos(videos);
  res.json({ message: 'Video deleted successfully' });
});

module.exports = router;
