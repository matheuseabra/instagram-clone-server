/* eslint-disable no-console */
const mongoose = require('mongoose');

const { DB_PROD } = process.env;

const settings = {
  useNewUrlParser: true,
  useFindAndModify: true,
};

mongoose.connect(DB_PROD, settings);
mongoose.connection.on('connected', () => console.log('Connected to the database'));
mongoose.connection.on('error', () => console.error('Error connecting to DB'));

module.exports = mongoose;
