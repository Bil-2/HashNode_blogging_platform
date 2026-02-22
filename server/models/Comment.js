import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Add index to optimize fetching comments for a specific post and sorting by date
commentSchema.index({ post: 1, createdAt: -1 });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;