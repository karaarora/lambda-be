const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

require('dotenv').config();

const db = require('./sevices/databaseService');
const logger = require('./sevices/loggingService');

const memesController = require('./controllers/memesController');
const statusCode = require('../../config/constants/statusCodes');

db.connect();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/listings', async (req, res) => {
  const memes = await memesController.getAllMemes(req.body.filters);
  res.send({
    status: statusCode.SUCCESS_OK,
    data: {
      filters: req.body.filters && {
        query: req.body.filters.query,
      },
      memes,
    },
  });
});

app.get('/save', async (req, res) => {
  try {
    await memesController.saveMeme();
    res.send({
      status: statusCode.SUCCESS_OK,
      message: 'Meme saved',
    });
  } catch (e) {
    res.send({
      status: statusCode.ERROR_INTERNAL,
      message: e,
    });
  }
});

app.listen(process.env.PORT, () => {
  logger.info(`Server is up at PORT: ${process.env.PORT}`);
});
