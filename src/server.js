/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server);

const port = process.env.PORT || 3333;
require('dotenv').config();
require('./config/database');

// Middlewares
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'resized')));
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => console.log(`Instagram API listening at port ${port}`));
