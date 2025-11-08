import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String, 
      required: true,
    },
    
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'], 
      default: 'published', 
    },
    publishedAt: {
      type: Date,
      default: Date.now, 
    },
    
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true, 
  }
);

// Indexes for better query performance
postSchema.index({ author: 1, publishedAt: -1 });
postSchema.index({ category: 1, publishedAt: -1 });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ title: 'text', content: 'text' }); // For text search

const Post = mongoose.model('Post', postSchema);
export default Post;