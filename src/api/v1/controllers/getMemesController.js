const statusCodes = require('../../../config/constants/statusCodes');
const Meme = require('../models/memes');
const objUtils = require('../utils/objUtils');

module.exports = async (request) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const filters = request.body && request.body.filters;
    if (objUtils.isEmpty(filters)) {
      return {
        headers,
        statusCode: statusCodes.SUCCESS_OK,
        body: await Meme.find(),
      };
    }
    const newFilters = {};
    if (filters.query) {
      newFilters.heading = { $regex: filters.query, $options: 'i' };
    }
    return {
      headers,
      statusCode: statusCodes.SUCCESS_OK,
      body: await Meme.find(newFilters),
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
