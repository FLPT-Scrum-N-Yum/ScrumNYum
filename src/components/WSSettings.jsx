// import e from 'express';
import React from 'react';

function WSSettings({
  workspaces,
  setWorkspaces,
  addWorkspace,
  setAddWorkspace,
}) {
  //TO DO
  //depending on btn, create request on backend to post or delete
  //this should also cause update to our WS Selector list
  const onCreate = (event) => {
    event.preventDefault();
    const wsName = document.getElementById('ws-name').value;
    // check what wsName
    console.log('workspacename', wsName);
    // const wsPassword = 'password';
    document.getElementById('ws-name').value = '';
    //created the new workspace
    fetch('/api/workspaces', {
      method: 'POST',
      body: JSON.stringify({
        wsName: wsName,
        // ws_pw: wsPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setAddWorkspace(false);
    // Workspace should be clean and no stickies on the view
    // Automatically set their workspace as the one they just created or the one you choose
    // how do we know which workspace user is clicking on?

    // .then((res) => {
    //   // pull a new list of workspaces
    //   fetch('/api/workspaces')
    //     .then((result) => result.json())
    //     .then((data) => {
    //       console.log(data);
    //       setWorkspaces(data.workspaces);
    //     });
    // });
    // send this to backend to post
  };

  // const onDelete = (event) => {
  //   event.preventDefault();
  //   fetch('/api/workspaces', {
  //     method: 'DELETE'
  //   });
  // };

  return (
    // User types in ws name -> clicks create ws -> ws added to their ws/teams
    // User types in ws name -> clicks delete ws -> ws removed from their ws/teams (and db?)
    <div>
      <form id='ws_settings' className='ws-add'>
        <input
          required
          placeholder='Workspace Name'
          type='text'
          id='ws-name'
          name='ws-name'
        ></input>
        <button className='ws-btn' onClick={onCreate}>
          Create Workspace
        </button>
        {/* <button>Delete Workspace</button> */}
      </form>
    </div>
  );
}

export default WSSettings;
