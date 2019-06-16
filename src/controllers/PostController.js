/* eslint-disable consistent-return */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  index: async (req, res) => {
    const feed = await Post.find().sort('-createdAt');
    return res.json(feed);
  },
  show: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        return res.status(200).json(post);
      }
      res.status(404).end();
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
    const { filename: image } = req.file;

    try {
      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', image));

      fs.unlinkSync(req.file.path);

      const post = await Post.create({
        image,
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
        .send({ error: err })
        .end();
    }
  },
  like: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
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
