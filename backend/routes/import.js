const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/videos.json');
const VIDEOS_DIR = path.join(__dirname, '../uploads/videos');
const THUMBS_DIR = path.join(__dirname, '../uploads/thumbnails');

const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v', '.mts', '.m2ts'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

const readVideos = () => {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
};
const writeVideos = (v) => fs.writeFileSync(DATA_FILE, JSON.stringify(v, null, 2));

router.get('/scan', authenticateAdmin, (req, res) => {
  if (!fs.existsSync(VIDEOS_DIR)) return res.json({ files: [] });

  const registered = readVideos().map(v => v.videoUrl?.split('/').pop()).filter(Boolean);

  const files = fs.readdirSync(VIDEOS_DIR)
    .filter(f => VIDEO_EXTS.includes(path.extname(f).toLowerCase()))
    .map(f => {
      const stat = fs.statSync(path.join(VIDEOS_DIR, f));
      const sizeGB = (stat.size / (1024 ** 3)).toFixed(2);
      const sizeMB = (stat.size / (1024 ** 2)).toFixed(1);
      return {
        filename: f,
        size: stat.size > 1024 ** 3 ? `${sizeGB} GB` : `${sizeMB} MB`,
        alreadyImported: registered.includes(f)
      };
    });

  const thumbFiles = fs.existsSync(THUMBS_DIR)
    ? fs.readdirSync(THUMBS_DIR).filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    : [];

  res.json({ files, thumbFiles });
});

router.post('/register', authenticateAdmin, (req, res) => {
  const { filename, title, category, description, thumbnailFilename } = req.body;

  if (!filename || !title || !category) {
    return res.status(400).json({ message: 'filename, title and category are required' });
  }

  const filePath = path.join(VIDEOS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: `File not found: ${filename}` });
  }

  const videos = readVideos();
  const alreadyExists = videos.find(v => v.videoUrl === `/uploads/videos/${filename}`);
  if (alreadyExists) {
    return res.status(409).json({ message: 'This file is already registered' });
  }

  const newVideo = {
    id: uuidv4(),
    title,
    category,
    description: description || '',
    videoUrl: `/uploads/videos/${filename}`,
    thumbnailUrl: thumbnailFilename ? `/uploads/thumbnails/${thumbnailFilename}` : null,
    youtubeUrl: null,
    order: videos.length,
    createdAt: new Date().toISOString()
  };

  videos.push(newVideo);
  writeVideos(videos);
  res.status(201).json(newVideo);
});

module.exports = router;
