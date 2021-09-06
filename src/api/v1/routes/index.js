const callback = require('../callback');

const getMemesController = require('../controllers/getMemesController');
const saveMemeController = require('../controllers/saveMemeController');
const authController = require('../controllers/authController');
const detailsMemeController = require('../controllers/detailMemeController');
const pingController = require('../controllers/pingController');

module.exports = (app, passport) => {
  app.post('/register', callback(authController.register));
  app.get('/login', callback(authController.login(passport)));
  app.get('/ping', callback(pingController));
  app.get('/listings', callback(getMemesController));
  app.post('/save', callback(saveMemeController));
  app.get('/info', callback(detailsMemeController));
};
