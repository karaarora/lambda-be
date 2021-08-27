const callback = require('../callback');

const getMemesController = require('../controllers/getMemesController');
const saveMemeController = require('../controllers/saveMemeController');
// const detailsMemeController = require('../controllers/detailMemeController');
// const loginController = require('../controllers/login/Controller');
const pingController = require('../controllers/pingController');

module.exports = (app) => {
  app.get('/ping', callback(pingController));
  app.get('/listings', callback(getMemesController));
  app.get('/save', callback(saveMemeController));
  // app.get('/info', callback(detailsMemeController));
  // app.get('/login', callback(loginController));
};
