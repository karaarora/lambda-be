const statusCodes = require('../../../config/constants/statusCodes');
const sortOptionsMap = require('../../../config/constants/sortOptions');
const statusOptionsMap = require('../../../config/constants/statusOptions');
const Meme = require('../models/memes');

function getSortOrder(sort) {
  const sortFilter = {};
  if (sort === 'latest') {
    sortFilter.created = -1;
  } else if (sort === 'earliest') {
    sortFilter.created = 1;
  }
  return sortFilter;
}

module.exports = async (request) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const {
      query,
      page,
      type,
    } = request.query;
    let { sort, status } = request.query;
    const newFilters = {};
    if (query) {
      newFilters.heading = { $regex: query, $options: 'i' };
    }

    if (!sort) sort = (sortOptionsMap.find((option) => option.isDefault) || {}).key;
    if (!status) status = (statusOptionsMap.find((option) => option.isDefault) || {}).key;

    const sortOptions = {
      title: 'Sort By',
      options: sortOptionsMap.map(({ displayText, key }) => ({
        displayText,
        key,
        isSelected: key === sort,
      })),
    };

    const statusOptions = {
      title: 'Your Memes',
      options: statusOptionsMap.map(({ displayText, key }) => ({
        displayText,
        key,
        isSelected: key === status,
      })),
    };
    if (status) {
      newFilters.status = status;
    }
    if (type) {
      newFilters.type = type;
    }
    return {
      headers,
      statusCode: statusCodes.SUCCESS_OK,
      body: {
        filters: {
          sortOptions,
          statusOptions,
          query,
          page,
        },
        total: await Meme.countDocuments(newFilters),
        listings: await Meme.find(newFilters).skip(((page || 1) - 1) * 10)
          .limit(20)
          .sort(getSortOrder(sort)),
      },
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
