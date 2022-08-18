import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WSSettings from './WSSettings.jsx';

function WSSelector({ workspaces, setWorkspaces, cards, setCards }) {
  //TO DO - STATE MGMT FOR WS DROPDOWN (FETCH DATA FROM USER?)
  const [addWorkspace, setAddWorkspace] = useState(false);

  const handleAdd = () => {
    setAddWorkspace(addWorkspace ? false : true);
  };
  const [wsName, selectWSName] = useState('');

  const setWSName = (e) => {
    console.log('this is taarget value', e.target.value);
    const wsname = e.target.value;
    selectWSName(wsname);
  };

  const changeWorkspace = (e) => {
    e.preventDefault();
    console.log(wsName);
    fetch('/api/selectworkspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wsName }),
    })
      .then((response) => response.json())
      .then((stickies) => {
        console.log('setting cards');
        console.log(stickies);
        setCards(stickies);
        console.log('this is cards state ', cards);
      });
  };

  const onDelete = (event) => {
    event.preventDefault();
    fetch('/api/workspaces', {
      method: 'DELETE',
    });
  };

  return (
    <div>
      {/* User selects a ws -> clicks enter workspace -> send them to workspace/send data */}
      <form action='#' className='ws-container'>
        {/* <span className='ws-heading'>Select a workspace</span> */}
        <div className='ws-select'>
          {addWorkspace ? (
            <WSSettings
              addWorkspace={addWorkspace}
              setAddWorkspace={setAddWorkspace}
            />
          ) : null}
          <div className='ws-icon'>
            <svg
              onClick={handleAdd}
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='#264653'
              className='bi bi-plus-square'
              viewBox='0 0 16 16'
            >
              <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
              <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
            </svg>
          </div>
          <select
            className='ws-dropdown ws-option'
            name='wsname'
            id='wsname'
            // defaultValue=''
            onChange={setWSName}
          >
            <option className='ws-option' disabled hidden value=''>
              My Workspaces
            </option>
            {/* this needs to be populated with values from DB */}
            {/* <option value='Example'>Example</option> */}
            {/* propery reference el.workspace (currently a placeholder value) */}
            {workspaces.map((el, i) => {
              return (
                <option
                  key={`${el} ${i}`}
                  className='ws-option'
                  value={el.wsname}
                >
                  {el.wsname}
                </option>
              );
            })}
          </select>
          {/* <input
              className='ws-btn'
              type='submit'
              value='Enter Workspace'
            ></input> */}
          <button
            value='Enter Workspace'
            className='ws-btn'
            onClick={changeWorkspace}
          >
            Enter
          </button>
          <button className='ws-btn' onClick={onDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default WSSelector;
