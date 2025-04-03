import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
 
}, {
  strict:false,
  collection: 'posts',
  timestamps: true 
});

export const Post = mongoose.model('Post', postSchema);
