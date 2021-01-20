const { User } = require('../db.js');
const bcrypt = require('bcrypt');
const keys = require('./keys');
const Strategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function (passport) {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function (email, password, done) {
        User.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            if (!user) {
              return;
            }
            if (!user.email) {
              return done(null, false);
            }
            console.log('USER_PASS', user.password);
            bcrypt.compare(password, user.password, (err, match) => {
              if (err) throw err;
              console.log('match', match);
              if (match) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  /*  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '568788320463-mlqm33k2h8nuschcdbstk7gnrs7covt7.apps.googleusercontent.com',
        clientSecret: '5yI1989tYGCzzauOrZZr7a3T',
        callbackURL: '/auth/google/callback',
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        //crear el usuario en la base de datos
        console.log('Disparando el callback');
        console.log(
          profile.id,
          profile.email,
          profile.given_name,
          profile.family_name,
          profile.locale
        );

        User.findOrCreate({
          where: { google_id: profile.id },
          defaults: {
            google_id: profile.id,
            email: profile.email,
            first_name: profile.given_name,
            last_name: profile.family_name,
            country: 'def',
            city: 'def',
            shipping_address: 'def',
            password: 'def',
          },
        })
        .then((user) => {
          console.log('user', user);
          return done(null, user);
        });
      }
    )
  );
 */
  //serialize the user

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findByPk(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  });
};
