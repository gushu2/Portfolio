const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');
const contactRoutes = require('./routes/contact');
const importRoutes = require('./routes/import');

const app = express();

const uploadsDir = path.join(__dirname, 'uploads');
const thumbnailsDir = path.join(__dirname, 'uploads/thumbnails');
const videosDir = path.join(__dirname, 'uploads/videos');
[uploadsDir, thumbnailsDir, videosDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginEmbedderPolicy: false
}));
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/uploads', (req, res, next) => {
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
}, express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1y',
  setHeaders: (res, filePath) => {
    const ext = filePath.toLowerCase();
    if (ext.endsWith('.mp4') || ext.endsWith('.mov') || ext.endsWith('.mkv') || ext.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/import', importRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Allow up to 2 hours for large video uploads (1hr video can be several GB)
server.timeout = 7200000;
server.keepAliveTimeout = 7200000;
server.headersTimeout = 7200100;
