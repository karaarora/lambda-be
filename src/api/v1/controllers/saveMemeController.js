const statusCodes = require('../../../config/constants/statusCodes');
const Meme = require('../models/memes');

module.exports = async (request) => {
  try {
    const newMeme = new Meme({
      heading: request.body.heading,
      user_id: request.body.user_id,
      thumbnail_url: request.body.thumbnail_url,
      created: new Date(),
      view_count: [],
      state: request.body.state,
      status: request.body.status,
    });
    await newMeme.save();
    return {
      statusCode: statusCodes.SUCCESS_OK,
      body: {
        message: 'Meme saved',
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
