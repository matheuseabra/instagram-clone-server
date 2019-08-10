/* eslint-disable no-console */
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const { DB_PROD, DB_LOCAL } = process.env;

const settings = {
  useNewUrlParser: true,
  useFindAndModify: true,
};

mongoose.connect(DB_PROD || DB_LOCAL, settings);
mongoose.connection.on('connected', () => console.log('Connected to the database'));
mongoose.connection.on('error', () => console.error('Error connecting to DB'));

module.exports = mongoose;
