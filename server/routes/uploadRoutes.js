import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Check if Cloudinary is configured
const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
  process.env.CLOUDINARY_API_KEY !== 'your_api_key';

let upload;

if (isCloudinaryConfigured) {
  // Use Cloudinary if configured
  const { storage } = await import('../utils/cloudinary.js');
  upload = multer({ storage: storage });
} else {
  // Use local storage as fallback
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  upload = multer({ 
    storage: localStorage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'));
      }
    }
  });
}

router.post('/', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = isCloudinaryConfigured 
      ? req.file.path 
      : `http://localhost:${process.env.PORT || 5001}/uploads/${req.file.filename}`;
    
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: imageUrl, 
    });
  } else {
    res.status(400).send({ message: 'No image file provided or invalid file type' });
  }
});

export default router;
