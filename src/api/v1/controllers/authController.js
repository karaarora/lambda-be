const bcrypt = require('bcryptjs');
const User = require('../models/users');
const statusCodes = require('../../../config/constants/statusCodes');

module.exports = {
  login: (passport) => (req, res) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      return passport.authenticate('local', (err, user) => {
        if (err) {
          throw new Error();
        }
        if (user) {
          req.logIn(user, (error) => {
            if (error) {
              throw new Error();
            }
            req.send({
              headers,
              statusCode: statusCodes.SUCCESS_OK,
              body: 'User logged in successfully',
            });
          });
        }
        throw new Error();
      });
    } catch (e) {
      req.send({
        headers,
        statusCode: statusCodes.ERROR_INTERNAL,
        body: 'Some error occued in Login.',
      });
    }
  },
  register: async (request) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const doc = await User.findOne({ username: request.body.username });
      if (doc) {
        return {
          headers,
          statusCode: statusCodes.SUCCESS_OK,
          body: 'User already exists',
        };
      }
      const newUser = new User({
        username: request.body.username,
        password: await bcrypt.hash(request.body.password, 10),
      });
      await newUser.save();
      return {
        headers,
        statusCode: statusCodes.SUCCESS_OK,
        body: 'User registered',
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
