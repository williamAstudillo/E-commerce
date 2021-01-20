const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');
var Strategy = require('passport-local').Strategy;

server.put('/promote/:id', (req, res) => {
  const { id } = req.params;

  User.findAll({
    where: {
      id: id,
    },
  }).then((result) => {
    result[0].role = 'admin';
    result[0].save();
    res.send(`Hooray, you've become an admin!`);
  });
});

//  server.post('/login',
//      passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//       res.redirect('http://localhost:3001/products');
//   });

// Routes
server.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(req.user);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(req.user);
      });
    }
  })(req, res, next);
});


server.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
  );
  
  server.get(
    '/google/callback',
    passport.authenticate('google'),
    function (req, res) {
      // console.log('R E Q U E S T ', req.user[0].dataValues);
    res.redirect('http://localhost:3001/myorders');
    // res.json(req.user);
  }
);
server.get('/github',
  passport.authenticate('github', { scope: ['email', 'profile'] }));

server.get('/github/callback',
  passport.authenticate('github'),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("req.user-----------------github",req.user)
    // res.json(req.user);

    res.redirect('http://localhost:3001/myorders');
   
  });
//--------- isAuthentiacted + proteccion de rutas

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('http://localhost:3001/login');
  }
}
//----------Ruta Protegida
// si quiero entrar a profile sin estar autenticado me va a redirigir a login
server.get(
  '/me',
  isAuthenticated, // esto aqui es un middleware que me defini con la funcion
  function (req, res) {
    console.log("req.isAut /me",req.isAuthenticated());
    res.json(req.user);
  }
  );
  //logout
  // passport nos da una funcion que si hago req.logout destruyo la sesion que genere
  server.get('/logout', function (req, res) {
    req.logout();
    console.log('req.isAuthenticated------------------', req.isAuthenticated());
    console.log('req.session------------------', req.user);
    res.send(req.user);
  });
  
// server.get(
//   '/me',
//   isAuthenticated, // esto aqui es un middleware que me defini con la funcion
//   function (req, res) {
//     res.json(req.user);
//   }
// );

module.exports = server; //sino exporto es como dificil que me coja la ruta en el index
