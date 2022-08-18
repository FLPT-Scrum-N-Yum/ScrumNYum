const db = require('../models/models.js');

const userController = {};

// verifyUser - Obtain username and password from the request body, locate the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.

userController.createUser = (req, res, next) => {
  console.log('in userController.createUser');
  const { username, password } = req.body;

  // console.log(req.body);
  // console.log([username, password]);

  const query = `
  INSERT INTO public.user (id, username, password)  
  VALUES
  (DEFAULT, $1, $2) RETURNING id;`;

  // check if username already exists in db, if not create user or else return to signup page
  db.query(query, [username, password])
    .then((response) => {
      
      // fix signup to route to signup page
      res.locals.id = response.rows[0].id;
      return next()
      // const query2 = `SELECT id FROM public.user
      // WHERE username = $1 AND password = $2;`;
      // db.query(query2, [username, password])
      //   .then((response) => {
      //     // console.log('user ID is: ', response.rows[0].id);
      //     res.locals.id = response.rows[0].id;
      //     console.log('query success');
      //     return next();
      //   })
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {
          err: 'error in userController.createUser - issue with user creation',
        },
      });
    });
};

userController.verifyUser = (req, res, next) => {
  console.log('in userController.verifyUser');

  console.log('req body is: ', req.body);

  const { username, password } = req.body;

  const query = `
  SELECT * 
  FROM public.user
  WHERE username = $1  `;

  console.log('username array: ', [username]);

  // id appears to be the username
  db.query(query, [username])
    .then((result) => {
      if (result.rows.length === 0) {
        console.log('no user in DB');
        res.redirect('/signup');
      } else {
        console.log('check password');
        if (result.rows[0].password === password) {
          // console.log('result rows: ', result.rows);
          res.locals.id = result.rows[0].id;
          return next();
        } else {
          res.redirect('/signup');
        }
      }
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: {
          err: 'error in userController.verifyUser - login credentials incorrect',
        },
      });
    });
};

module.exports = userController;
