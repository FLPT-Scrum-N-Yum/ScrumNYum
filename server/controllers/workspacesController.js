const db = require('../models/models.js');

const workspacesController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `workspacesController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err
      }`,
    message: {
      err: `workspacesController.${method}: Incorrect data received`,
    },
  };
};

// query to find workspace ID and set a workspace cookie to identify which workspace you are working in
workspacesController.findWorkspaceID = (req, res, next) => {
  // grab user id
  // workspace name

  console.log('in findWSID, body:', req.body);
  
  // grabbing parameters from request
  // const { userID, workspacename } = req.body
  const { wsName } = req.body;
  const userID = req.cookies.ssid;

  // added returning id to query
  const query = `SELECT id FROM workspace
WHERE workspace_name = $1 AND user_id = $2;`;

  // find the workspace ID based on USER ID and workspace name params
  db.query(query, [wsName, userID])
    .then((key) => {
      console.log('key is: ', key);
      res.cookie('workspace', key.rows[0].id, { httpOnly: true })
      res.locals.wsid = key.rows[0].id;
      return next()
    })

  // then store workspaceID in res.locals
}
// adding workspace to workspace table but not returning anything
// post request to api/workspaces without returning any data - WORKS
workspacesController.addWorkspace = (req, res, next) => {
  // console.log('in workspacesController.addWorkspace');
  const { wsName } = req.body;
  const userId = req.cookies.ssid;
  // console.log('req:', req)
  // console.log('ws name is: ', wsName);
  // console.log('req cookies:', req.cookies)
  const query = `
    INSERT INTO workspace (workspace_name, user_id) 
    VALUES ($1, $2) `;
  // ON CONFLICT DO WE WANT TO ALERT THE USER THAT IT'S A DUPE?
  // console.log('request body', req.body)

  // to do - check to see if this matches front end req.body
  // REMIND JAVI/AUTUMN THAT WS-NAME NEEDS TO BE WS_NAME
  db.query(query, [wsName, userId])
    .then(() => { return next() })
    .catch((err) => {
      return next(
        createErr({
          method: 'addWorkspace',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// deleting workspace from workspace table but not returning anything
// delete request to api/workspaces without returning any data - WORKS
workspacesController.deleteWorkspace = (req, res, next) => {
  console.log('in workspacesController.deleteWorkspace');

  // get current workspaceID from workspaces cookie
  const workspaceID = req.cookies.workspace;
  console.log('workspace id: ',workspaceID);

  const query = `DELETE FROM stickies WHERE workspace_id = $1;`;
  db.query(query, [workspaceID])
  .then(() => {
    const query2 = `DELETE FROM workspace WHERE id = $1;`;
    db.query(query2, [workspaceID])
    .then(() => {
      console.log('in query');
      res.clearCookie('workspace');
      return next();
    })
  })

    // .catch((err) => {
    //   return next(
    //     createErr({
    //       method: 'deleteWorkspace',
    //       type: 'middleware error',
    //       err: err,
    //     })
    //   );
    // });
}

// getting workspace from workspace table and returning it
// get request to api/workspaces and returning data - WORKS
workspacesController.getWorkspaces = (req, res, next) => {

  // query to select all workspaces that are created by user
  const query = 'SELECT id, workspace_name as wsName FROM workspace WHERE user_id=$1;';
  db.query(query, [req.cookies.ssid])
    .then((data) => {
      // console.log('here is the data: ', data)
      // saves all workspaces in res locals so we can send back to frontend to populate dropdown menu
      res.locals.workspaces = data.rows;
      return next();
    })
    .catch((err) => {
      return next(
        createErr({
          method: 'getWorkspaces',
          type: 'middleware error',
          err: err,
        })
      );
    });
}

// update workspace in workspace table but not returning anything
// workspacesController.updateWorkspace = (req, res, next) => {

// }

module.exports = workspacesController;
