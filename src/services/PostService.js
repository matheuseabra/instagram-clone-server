const Post = require('../models/Post');
const errorHandler = require('../middlewares/errorHandler');

module.exports = {
  feed: async () => {
    try {
      const newsFeed = await Post.find().sort('-createdAt');
      return newsFeed;
    } catch (err) {
      return errorHandler(err);
    }
  },
  findById: async (postId) => {
    try {
      const singlePost = await Post.findById(postId);
      return singlePost;
    } catch (err) {
      return errorHandler(err);
    }
  },
  create: async (postData) => {
    try {
      const newPost = await Post.create({ ...postData });
      return newPost;
    } catch (err) {
      return errorHandler(err);
    }
  },
};
