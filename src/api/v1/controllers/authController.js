const bcrypt = require('bcryptjs');
const User = require('../models/users');
const statusCodes = require('../../../config/constants/statusCodes');

module.exports = {
  login: (passport) => (request) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    return new Promise((resolve) => {
      passport.authenticate('local', (err, user) => {
        if (user) {
          request.logIn(user, (error) => {
            if (error) {
              resolve({
                headers,
                statusCode: statusCodes.ERROR_INTERNAL,
                body: 'Some error occued in Login',
              });
            }
            resolve({
              headers,
              statusCode: statusCodes.SUCCESS_OK,
              body: 'User logged in successfully',
            });
          });
        }
        resolve({
          headers,
          statusCode: statusCodes.ERROR_INTERNAL,
          body: 'Some error occued in Login',
        });
      });
    });
  },
  register: async (request) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const doc = await User.findOne({ username: request.body.username })
      if (doc) {
        return {
          headers,
          statusCode: statusCodes.SUCCESS_OK,
          body: 'User already exists',
        };
      }
      const newUser = new User({
        email: request.body.email,
        username: request.body.username,
        password: await bcrypt.hash(request.body.password, 10),
      });
      await newUser.save();
      return {
        headers,
        statusCode: statusCodes.SUCCESS_OK,
        body: 'User regitered',
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
  },
};
