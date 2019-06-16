const Post = require('../models/Post');
const errorHandler = require('../middlewares/errorHandler');

module.exports = {
  feed: async () => {
    try {
      return await Post.find().sort('-createdAt');
    } catch (err) {
      return errorHandler(err);
    }
  },
  findById: async (postId) => {
    try {
      return await Post.findById(postId);
    } catch (err) {
      return errorHandler(err);
    }
  },
  create: async (postData) => {
    try {
      return await Post.create({ ...postData });
    } catch (err) {
      return errorHandler(err);
    }
  },
};
