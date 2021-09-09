const statusCodes = require('../../../config/constants/statusCodes');
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
      sort,
      status,
    } = request.query;
    const newFilters = {};
    if (query) {
      newFilters.heading = { $regex: query, $options: 'i' };
    }
    const sortOptions = {
      title: 'Sort By',
      options: [
        {
          displayText: 'Most viewed',
          key: 'VIEWED',
        },
        {
          displayText: 'Trending',
          key: 'TRENDING',
        },
        {
          displayText: 'Latest',
          key: 'LATEST',
        },
        {
          displayText: 'Earliest',
          key: 'EARLIEST',
        },
      ],
    };
    const statusOptions = {
      title: 'Your memes',
      options: [
        {
          displayText: 'Saved',
          key: 'SAVED',
        },
        {
          displayText: 'Most viewed',
          key: 'PUBLISHED',
        },
      ],
    };
    if (status) {
      newFilters.status = status;
    }
    sortOptions.options.forEach((option) => {
      if (option.key === sort) {
        option.isSelected = true;
      } else {
        option.isSelected = false;
      }
    });
    statusOptions.options.forEach((option) => {
      if (option.key === status) {
        option.isSelected = true;
      } else {
        option.isSelected = false;
      }
    });
    return {
      headers,
      statusCode: statusCodes.SUCCESS_OK,
      body: {
        filters: {
          sortOptions,
          statusOptions,
          query,
        },
        total: await Meme.countDocuments({}),
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
