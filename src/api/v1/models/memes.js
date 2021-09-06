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
  type: {
    type: String,
  },
  created: {
    type: Date,
    required: true,
  },
  view_count: {
    type: [String],
    get: (v) => v.length,
  },
  state: {
    type: String,
  },
  status: {
    type: String,
  },
}, {
  toObject: { getters: true, setters: true },
  toJSON: { getters: true, setters: true },
  runSettersOnQuery: true,
});

// eslint-disable-next-line new-cap
module.exports = new model('Meme', memeSchema);
