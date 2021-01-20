const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
var cookieSession = require('cookie-session');

require('./passport/passportConfig')(passport);
require('./passport/googleOAuth')(passport);
require('./passport/githubOAuth')(passport);

require('./db.js');

const server = express();

server.name = 'API';
server.use(
  cookieSession({
    maxAge: 3000,
    keys: ['secretcode'],
  })
);
server.use(passport.initialize());
server.use(passport.session()); // si habia algo guardado en la sesion lo recupero

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser('secretcode')); //secretcode viene de session
server.use(morgan('dev'));
server.use(
	cors({
		origin      : 'http://localhost:3001', // <-- location of the react app were connecting to
		credentials : true
	})
);
server.use(
  session({
    secret: 'secretcode', //lo que pongamos aqui en el secreto lo vamos a tener que usar en el cookie parser
    resave: true,
    saveUninitialized: true,
  })
);

// Inicializa Passport y recupera el estado de autenticación de la sesión.

server.use((req, res, next) => {
  // console.log('CREO QUE ES ESTEreq.session', req.session);
  // console.log('req.user', req.user);
  next();
});

server.use(
	multer({
		dest : path.join(__dirname, './public/uploads')
	}).single('image')
); 

server.use('/static', express.static(__dirname + '/public/uploads'));  
  
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
