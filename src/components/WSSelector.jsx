import React, { useState } from 'react';
import WSSettings from './WSSettings.jsx';

function WSSelector({ workspaces, setWorkspaces }) {
  //TO DO - STATE MGMT FOR WS DROPDOWN (FETCH DATA FROM USER?)
  const [addWorkspace, setAddWorkspace] = useState(false);

  const handleAdd = () => {
    setAddWorkspace(addWorkspace ? false : true);
  };

  return (
    <div>
      {/* User selects a ws -> clicks enter workspace -> send them to workspace/send data */}
      <form action='#' className='ws-container'>
        {/* <span className='ws-heading'>Select a workspace</span> */}
        <div className='ws-select'>
          {addWorkspace ? <WSSettings /> : null}
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
            name='ws'
            id='ws'
            defaultValue=''
          >
            <option className='ws-option' disabled hidden value=''>
              My Workspaces
            </option>
            {/* this needs to be populated with values from DB */}
            {/* <option value='Example'>Example</option> */}
            {/* propery reference el.workspace (currently a placeholder value) */}
            {workspaces.map((el) => {
              return (
                <option className='ws-option' value={el.id}>
                  {el.id}
                </option>
              );
            })}
          </select>
          {/* <input
              className='ws-btn'
              type='submit'
              value='Enter Workspace'
            ></input> */}
          <button value='Enter Workspace' className='ws-btn'>
            Enter
          </button>
          <button className='ws-btn'>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default WSSelector;
