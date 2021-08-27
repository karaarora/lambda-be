const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./routes')(app);

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

require('dotenv').config();

const db = require('./sevices/databaseService');
const logger = require('./sevices/loggingService');

db.connect();

app.listen(process.env.PORT, () => {
  logger.info(`Server is up at PORT: ${process.env.PORT}`);
});
