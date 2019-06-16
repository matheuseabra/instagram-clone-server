const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  legend: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  hashtags: {
    type: String,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
