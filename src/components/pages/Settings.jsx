import React, { useState, useEffect } from 'react';
import UserSettings from '../UserSettings.jsx';
import WSSelector from '../WSSelector.jsx';
import WSSettings from '../WSSettings.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Nav from './Nav.jsx';

function Settings() {
  // state for workspaces
  const dummyWs = { id: 'The JitHub Zone' }
  const [workspaces, setWorkspaces] = useState([dummyWs]);

  // get workspaces list from database when page loads
  useEffect(() => {
    fetch('api/workspaces')
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setWorkspaces(data.workspaces);
      });
  }, []);

  return (
    <div className='settings-container'>
      <Nav />
      <header className='settings-header'>
        <h1>Settings</h1>
        <nav className='settings-nav'>
        <Link to='/scrum' className='scrum-buttons'>
            Back to Scrum
          </Link>
        </nav>
      </header>
      <main className='settings-main'>
        {/* Workpsace Selector - Select a WS */}
        <WSSelector workspaces={workspaces} setWorkspaces={setWorkspaces} />
        {/* Workspace Settings - Create a WS */}
        <WSSettings workspaces={workspaces} setWorkspaces={setWorkspaces} />
        {/* User Settings - Join/Leave*/}
        <UserSettings />
      </main>
    </div>
  );
}

export default Settings;
