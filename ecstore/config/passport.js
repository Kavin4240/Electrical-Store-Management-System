const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load Admin model
const Admin = require('../models/adminlogin');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ AdminnameField: 'email' }, (email, password, done) => {
      // Match Admin
      Admin.findOne({
        email: email
      }).then(Admin => {
        if (!Admin) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, Admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, Admin);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeAdmin(function(Admin, done) {
    done(null, Admin.id);
  });

  passport.deserializeAdmin(function(id, done) {
    Admin.findById(id, function(err, Admin) {
      done(err, Admin);
    });
  });
};
