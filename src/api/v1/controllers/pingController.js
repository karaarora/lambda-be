const statusCodes = require('../../../config/constants/statusCodes');

module.exports = async () => ({
  statusCode: statusCodes.SUCCESS_OK,
  body: 'pong',
});
