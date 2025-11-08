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
import { protect, admin } from '../middleware/authMiddleware.js';
import { 
  validatePost, 
  validateObjectId, 
  validateUserId, 
  validatePagination 
} from '../middleware/validators.js';

const router = express.Router();

router.route('/').get(validatePagination, getPosts).post(protect, validatePost, createPost);
router.route('/myposts').get(protect, getMyPosts);

router.route('/:id')
  .get(validateObjectId, getPostById)
  .put(protect, validateObjectId, validatePost, updatePostDetails)
  .delete(protect, validateObjectId, deletePost);

router.route('/user/:userId').get(validateUserId, getPostsByUser);
router.route('/:id/like').put(protect, validateObjectId, likePost);
router.route('/:id/unlike').put(protect, validateObjectId, unlikePost);

export default router;