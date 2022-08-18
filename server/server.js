const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
// turned off a lot of controllers. if we have time go back and make edits

// import controllers
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const stickiesController = require('./controllers/stickiesController.js');

const PORT = 3000;
const app = express();
app.use(express.json()); // recognize incoming request as Json Object
app.use(express.urlencoded({ extended: true })); // parse incoming string or array request
app.use(cookieParser()); // allow parsing of req.cookies

// require routers
const apiRouter = require('./routes/api.js');
// const accountRouter = require('./routes/account');


// serve static assets
app.use('/src', express.static(path.resolve(__dirname, '../src')));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));


// Router
app.use('/api', apiRouter);

// get routes
app.get(['/', '/signup'], (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
});

app.get(['/scrum', '/settings'],
  // sessionController.isLoggedIn, 
  (req, res) => {
    // if (res.locals.signedIn) {
    console.log('user is signed in');
    res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'));
    // } else {
    //   console.log('user not logged in');
    //   res.redirect('/');
    // }
  });

// create stickies route


// login to sign up
app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    console.log('login route complete');
    res.redirect('/scrum');
  }
);

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    console.log('signup route complete');
    res.redirect('/scrum');
  }
);

// local error handler
app.use('*', (req, res) => {
  return res.status(404).send('Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error hath occured!' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).send(errorObj.msg);
});

// handle parsing request body
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
