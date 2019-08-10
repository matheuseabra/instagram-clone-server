// const resizer = require('node-image-resizer');
// const path = require('path');
const PostService = require('../services/PostService');

module.exports = {
  index: async (req, res) => {
    try {
      const feed = await PostService.feed();
      return res.status(200).json(feed);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  show: async (req, res) => {
    try {
      const post = await PostService.findById(req.params.id);
      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(400)
        .send({ error: err })
        .end();
    }
  },
  create: async (req, res) => {
    const {
      author, place, legend, hashtags,
    } = req.body;
    const { location, filename } = req.file;

    try {
      const post = await PostService.create({
        image: location || filename,
        author,
        place,
        legend,
        hashtags,
      });

      const { io } = req;
      io.emit('post', post);

      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(400)
        .send({ error: err });
    }
  },
  like: async (req, res) => {
    try {
      const post = await PostService.findById(req.params.id);
      post.likes += 1;
      await post.save();
      const { io } = req;
      io.emit('like', post);

      return res.status(200).json(post);
    } catch (err) {
      return res
        .status(400)
        .send({ error: err })
        .end();
    }
  },
};
