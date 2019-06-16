const routes = require('express').Router();
const multer = require('multer');
const uploadConfig = require('./config/multer');

const upload = multer(uploadConfig);

const PostController = require('./controllers/PostController');

routes.get('/', (req, res) => res.json({ message: 'API up and running' }));
routes.get('/feed', PostController.index);
routes.get('/post/:id', PostController.show);
routes.post('/post', upload.single('image'), PostController.create);
routes.get('/post/:id/like', PostController.like);

module.exports = routes;
