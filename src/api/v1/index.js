const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser('secretcode'));

app.use(passport.initialize());
app.use(passport.session());

require('../../config/constants/passportConfig')(passport);

app.use(cors());

require('dotenv').config();

const db = require('./sevices/databaseService');
const logger = require('./sevices/loggingService');

db.connect();

require('./routes')(app, passport);

app.listen(process.env.PORT, () => {
  logger.info(`Server is up at PORT: ${process.env.PORT}`);
});
