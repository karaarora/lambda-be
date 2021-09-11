const bcrypt = require('bcryptjs');
const callback = require('../callback');

const getMemesController = require('../controllers/getMemesController');
const saveMemeController = require('../controllers/saveMemeController');
const authController = require('../controllers/authController');
const detailsMemeController = require('../controllers/detailMemeController');
const pingController = require('../controllers/pingController');

module.exports = (app, passport) => {
  app.post('/register', callback(authController.register));
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.send({
          body: 'No user found',
        });
      }

      return req.logIn(user, (error) => {
        if (error) {
          return next(err);
        }

        return res.send({
          token: bcrypt.hashSync(user.username, 10),
          username: user.username,
          id: user._id,
        });
      });
    })(req, res, next);
  });
  app.get('/ping', callback(pingController));
  app.get('/listings', callback(getMemesController));
  app.post('/save', callback(saveMemeController));
  app.get('/info', callback(detailsMemeController));
};
