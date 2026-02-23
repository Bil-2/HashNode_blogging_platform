import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePostDetails,
  deletePost,
  getPostsByUser,
  likePost,
  unlikePost,
  getMyPosts,
} from '../controllers/postController.js';
import { protect, admin, optionalAuth } from '../middleware/authMiddleware.js';
import {
  validatePost,
  validateObjectId,
  validateUserId,
  validatePagination
} from '../middleware/validators.js';
import cacheMiddleware from '../middleware/cacheMiddleware.js';

const router = express.Router();

// Cache public GET routes for 5 minutes to reduce database load
router.route('/').get(optionalAuth, cacheMiddleware(5 * 60 * 1000), validatePagination, getPosts).post(protect, validatePost, createPost);
router.route('/myposts').get(protect, getMyPosts);

router.route('/:id')
  .get(optionalAuth, cacheMiddleware(5 * 60 * 1000), validateObjectId, getPostById)
  .put(protect, validateObjectId, validatePost, updatePostDetails)
  .delete(protect, validateObjectId, deletePost);

router.route('/user/:userId').get(cacheMiddleware(5 * 60 * 1000), validateUserId, getPostsByUser);
router.route('/:id/like').put(protect, validateObjectId, likePost);
router.route('/:id/unlike').put(protect, validateObjectId, unlikePost);

export default router;