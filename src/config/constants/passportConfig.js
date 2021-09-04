const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../../api/v1/models/users');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ usermame: username }, (err, user) => {
        if (err) throw err;
        if (!user) done(null, false);
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) throw err;
          if (result) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }),
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser((id, callback) => {
    User.findOne({ _id: id }, (err, user) => {
      callback(err, user);
    });
  });
};
