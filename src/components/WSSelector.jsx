import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function WSSelector({ workspaces, setWorkspaces, cards, setCards }) {
  //TO DO - STATE MGMT FOR WS DROPDOWN (FETCH DATA FROM USER?)
  // Make fetch request for all workspaces attached to user id
  
  // Create state to hold current selected workspace 
  // onClick for enter workspace, send workspace name to backend (possibly ID?)
  const [wsName, selectWSName] = useState('oogaboogabooga')

  const setWSName = (e) => {
    // console.log(e.target.value)
    const wsname = e.target.value;
    selectWSName(wsname)
  }

  const changeWorkspace = (e) => {
    e.preventDefault();
    console.log(wsName)
      fetch('/api/selectworkspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({wsName})
      })
      .then((response) => response.json())
      .then((stickies) => {
        console.log('setting cards')
        console.log(stickies)
        setCards(stickies)
        console.log('this is cards state ', cards)
      })
      // useRef hook to grab ws name? or may need to use state variable
      // const newCard = {
      //   title: 'test',
      //   description: 'test2',
      //   workspace_id: '1'
      // }
      // setCards([...cards, newCard])
  }
  return (
    <div className='ws-selector-container'>

      {/* User selects a ws -> clicks enter workspace -> send them to workspace/send data */}
      <form action='#'>
        <label htmlFor='ws-select'>Where will you be scrum-ing today?</label>
        <select className="ws-dropdown" name="ws" id="ws" defaultValue='' onChange={setWSName}>
          <option disabled hidden value=''>My Workspaces</option>
          {/* this needs to be populated with values from DB */}
          {/* <option value='Example'>Example</option> */}
          {/* propery reference el.workspace (currently a placeholder value) */}
          {workspaces.map((el) => {
            return (
              <option value={el.wsName} >{el.wsname}</option>
            )
          })}
        </select>
        <input type='submit' value='Enter Workspace' onClick={changeWorkspace}></input>
      </form>
    </div>
  )
}

export default WSSelector;