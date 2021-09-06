const statusCodes = require('../../../config/constants/statusCodes');
const Meme = require('../models/memes');

module.exports = async (request) => {
  try {
    const memeData = {
      heading: request.body.heading,
      user_id: request.body.user_id,
      thumbnail_url: request.body.thumbnail_url,
      image_url: request.body.image_url,
      created: new Date(),
      view_count: [],
      state: request.body.state,
      status: request.body.status,
    };
    const newMeme = new Meme(memeData);
    await newMeme.save();
    return {
      statusCode: statusCodes.SUCCESS_OK,
      body: {
        message: 'Meme saved',
        data: memeData,
      },
    };
  } catch (e) {
    return {
      statusCode: statusCodes.ERROR_INTERNAL,
      body: {
        error: e.message,
      },
    };
  }
};
