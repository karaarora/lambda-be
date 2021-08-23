const { Schema, model } = require('mongoose');

const memeSchema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  thumbnail_url: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line new-cap
module.exports = new model('Meme', memeSchema);
