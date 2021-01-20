var GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const { User } = require('../db.js');

module.exports = function (passport) {
    //serialize the user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
        
    });
  
    passport.use(new GitHubStrategy({
        clientID: 'e1a322b291531d0954b5',
        clientSecret: 'f3ce90bd8c982bedea710d88b00f8fbae6207a35',
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
        function (request, accessToken, refreshToken, profile, done) {
            //crear el usuario en la base de datos
            console.log("profile ------------------------", profile)
            User.findOrCreate({
                where: { email: profile.username +'@gmail.com' },
                defaults: {
                    email: profile.username + '@gmail.com',
                    first_name: profile.username,
                    last_name: profile.username,
                    country: 'def',
                    city: 'def',
                    shipping_address: 'def',
                    password: 'def',
                },
            }).then((user) => {
                return done(null, user);
            });
        }
    ));
    
};