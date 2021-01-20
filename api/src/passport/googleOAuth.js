var GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const { User } = require('../db.js');

module.exports = function (passport) {
  //serialize the user
  passport.serializeUser(function (user, done) {
    done(null, user[0].id);
    // done(null, user[0]);
  });
  // passport.deserializeUser(function (id, done) {
  //   console.log('entre serialize google');

  //   User.findByPk(id)
  //     .then((user) => {
  //       done(null, user);
  //     })
  //     .catch((err) => {
  //       return done(err);
  //     });
  // });
  passport.use(
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
        console.log("profile ------------------------",profile)
        User.findOrCreate({
          where: { email: profile.email },
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
        }).then((user) => {
          return done(null, user);
        });
      }
    )
  );
};
