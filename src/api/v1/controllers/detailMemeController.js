const statusCodes = require('../../../config/constants/statusCodes');
const Meme = require('../models/memes');

module.exports = async (request) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    return {
      headers,
      statusCode: statusCodes.SUCCESS_OK,
      body: await Meme.findOne({ _id: request.query.id }),
    };
  } catch (e) {
    return {
      headers,
      statusCode: statusCodes.ERROR_INTERNAL,
      body: {
        error: e.message,
      },
    };
  }
};
