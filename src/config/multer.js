const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const crypto = require('crypto');

const storageType = {
  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    cacheControl: 'max-age=31536000',
    acl: 'public-read',
    key: (req, file, cb) => {
      const copy = file;
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        copy.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
  // eslint-disable-next-line new-cap
  local: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'resized'),
    filename: (req, file, cb) => {
      const copy = file;
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        copy.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'resized'),
  storage: storageType.s3,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const mimetype = allowedExtensions.test(file.mimetype);
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());

    return mimetype && extName ? cb(null, true) : cb('Error: extension not allowed', false);
  },
};
