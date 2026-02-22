import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import path from 'path';

const router = express.Router();

// On Vercel (serverless), local filesystem is read-only — always use Cloudinary
// Initialize storage lazily so module load doesn't fail if env vars aren't set yet
let upload = null;

const getUpload = async () => {
  if (upload) return upload;

  const isCloudinaryConfigured =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
    process.env.CLOUDINARY_API_KEY !== 'your_api_key';

  if (isCloudinaryConfigured) {
    // Lazy import Cloudinary storage — avoids top-level await that crashes Vercel
    const { storage } = await import('../utils/cloudinary.js');
    upload = multer({ storage });
  } else {
    // Memory storage fallback (no disk writes — safe for serverless)
    upload = multer({ storage: multer.memoryStorage() });
  }

  return upload;
};

router.post('/', protect, async (req, res, next) => {
  try {
    const uploadMiddleware = await getUpload();
    uploadMiddleware.single('image')(req, res, (err) => {
      if (err) return next(err);

      if (req.file) {
        // Cloudinary gives req.file.path; memory storage gives req.file.buffer
        const imageUrl = req.file.path || null;
        res.status(200).json({
          message: 'Image uploaded successfully',
          image: imageUrl,
        });
      } else {
        res.status(400).json({ message: 'No image file provided or invalid file type' });
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
