const db = require('../models/models.js');

const stickiesController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `stickiesController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err
      }`,
    message: {
      err: `stickiesController.${method}: Incorrect data received`,
    },
  };
};

// creates a new stickie and returns it to appear in the start column on frontend (?)
// post request to api/stickies - WORKS
stickiesController.createStickies = (req, res, next) => {
  console.log('In stickiesContr create stickies middleware function');

  console.log(req.body);

  console.log('workspace cookies is: ', req.cookies.workspace);

  const { title, description } = req.body;
  // NOTE: workspace_ID is hard-coded as 1 for now
  const values = [title, description, req.cookies.workspace, 'board-1'];

  // const values = [task-title, task-desc, snack]
  console.log('stickies values: ', values);

  const query = `
    INSERT INTO stickies (id, title, description, workspace_id, position) 
    VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id;`;

  // console.log('this my req body', req.body);

  db.query(query, values)
    .then((id) => {
      console.log('exited query');
      // console.log('returning??', id.rows[0]);
      res.locals.id = id.rows[0].id;
      // res.locals.newStickie = data.rows[0];
      return next()
    })
    .catch((err) => {
      return next(
        createErr({
          method: 'createStickies',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// get all stickies and return that data
// get request to api/stickies and returning data - WORKS
stickiesController.getStickies = (req, res, next) => {
  const query = 'SELECT * FROM stickies';
  db.query(query)
    .then((data) => {
      res.locals.stickies = data.rows;
      return next();
    })
    .catch((err) => {
      return next(
        createErr({
          method: 'getWorkspace',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

stickiesController.getStickies2 = (req, res, next) => {
  console.log('INSIDE GET STICKIES 2')
  console.log(res.locals.wsid)
  const query = 'SELECT * FROM stickies WHERE workspace_id=$1;';
  db.query(query, [res.locals.wsid])
    .then((data) => {
      res.locals.stickies = data.rows;
      return next();
    })
    .catch((err) => {
      return next(
        createErr({
          method: 'getWorkspace',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// update a stickie and return that data
// NOT WORKING - LET'S REVISIT LATER
stickiesController.updateStickies = (req, res, next) => {
  console.log('In stickiesContr update stickies middleware function');

  // User clicks edit on sticky with an id of 4 and it's the title and description
  // User clicks update button, which sends a patch request to stickies endpoint
  // in the req.body, we'll have the sticky_id, new title, and new description
  // execute a query to update that sticky


  // const values = [req.body.stickie_id, req.body.id, req.body.description, req.body.snack_id, req.body.assigned_id, req.body.workspace_id];

  const values = [req.body.title, req.body.description];
  // const values = [req.body.description, req.body.stickie_id];

  console.log('values', values);

  const query = `
    UPDATE stickies SET
    ${((req.body.id) ? ' id = $2' : '') +
    ((req.body.description) ? ', description = $3' : '') +
    ((req.body.snack_id) ? ', snack_id = $4' : '') +
    ((req.body.assigned_id) ? ', assigned_id = $5' : '') +
    ((req.body.workspace_id) ? ', workspace_id = $6' : '')} 
     WHERE stickie_id = $1`


  // const query = `UPDATE stickies SET description = $1 WHERE stickie_id = $2`

  // const fields = ['stickie_id', 'id', 'description', 'snack_id', 'assigned_id', 'workspace_id'];
  // const values = [];

  // for (const field of fields) { 
  //   if (Object.prototype.hasOwnProperty.call(req.body, field)) {values.push(req.body[field]);}
  //   else values.push('');
  // }

  // const sql = `UPDATE stickies SET 
  //   stickie_id, id, description, snack_id, assigned_id, workspace_id)
  //   VALUES ($1, $2, $3, $4, $5, $6)
  //   RETURNING *;`;

  db.query(query, values)
    .then((data) => {
      console.log('exited query');
      res.locals.updatedStickie = data.rows;
      return next()
    })
    .catch((err) => {
      return next(
        createErr({
          method: 'updateStickies',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// delete a stickie but not returning anything
// delete request to api/stickies without returning any data - WORKS
stickiesController.deleteStickies = (req, res, next) => {
  const query = 'DELETE FROM stickies WHERE stickies.id = $1';
  db.query(query, [req.body.stickie_id])
    .then(() => { return next() })
    .catch((err) => {
      return next(
        createErr({
          method: 'deleteStickies',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

module.exports = stickiesController;