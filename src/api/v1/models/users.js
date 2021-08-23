const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line new-cap
module.exports = new model('User', userSchema);
