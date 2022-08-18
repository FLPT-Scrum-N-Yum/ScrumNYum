// import e from 'express';
import React from 'react';

function WSSettings({ workspaces, setWorkspaces }) {
  //TO DO
  //depending on btn, create request on backend to post or delete
  //this should also cause update to our WS Selector list
  const onCreate = (event) => {
    event.preventDefault();
    const wsName = document.getElementById('ws-name').value;
    // check what wsName
    console.log('workspacename', wsName);
    // const wsPassword = 'password';
    document.getElementById('ws-name').reset();
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
    })
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

  const onDelete = (event) => {
    event.preventDefault();
    const wsName = document.getElementById('ws-name').value;
    // send this to backend to delete
    //NOT SET UP W/ BACKEND
    
  };

  return (
    // User types in ws name -> clicks create ws -> ws added to their ws/teams
    // User types in ws name -> clicks delete ws -> ws removed from their ws/teams (and db?)
    <div className='ws-settings-container'>
      <form id='ws_settings'>
        <input
          required
          placeholder='Workspace Name'
          type='text'
          id='ws-name'
          className='ws-name-text-box'
          name='ws-name'
        ></input>
        <button onClick={onCreate}>Create Workspace</button>
        <button onClick={onDelete}>Delete Workspace</button>
      </form>
    </div>
  );
}

export default WSSettings;
