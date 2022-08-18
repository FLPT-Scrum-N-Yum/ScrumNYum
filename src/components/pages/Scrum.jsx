import React, { useState, useEffect } from 'react';
import Board from '../Board.jsx';
import Card from '../Card.jsx';
import Nav from './Nav.jsx';
import WSSelector from '../WSSelector.jsx';
import WSSettings from '../WSSettings.jsx';
import { useLocation, Link } from 'react-router-dom';

function Scrum(props) {
  //TO DO
  // Do we need to refer to backend when clicking settings?
  // How to logout?
  // Associating user's stickes w/ their acct and populating them on ws entry

  // dummy card variable. this is for initial render, may want to remove
  const dummyCard = [
    {
      'task-title': 'Discuss Github Pronunciation',
      'task-desc': 'Is it github, or jithub?',
      snack: 'Trail-Mix',
    },
    {
      'task-title': 'Discuss Github Pronunciation',
      'task-desc': 'Is it github, or jithub?',
      snack: 'Trail-Mix',
    },
  ];

  // set state for cards. default to empty array as state and update state as tasks are submitted
  const [cards, setCards] = useState([...dummyCard]);
  const [openModal, setOpenModal] = useState(false);

  const handleNewTask = () => {
    setOpenModal(!openModal ? true : false);
  };

  // STRETCH FEATURE:
  // below const allows us to grab state passed from
  // WSSelector to populate our title
  // const location = useLocation();

  // Grabs data from each form field when submitting
  const taskSubmit = (event) => {
    event.preventDefault();
    const taskData = new FormData(event.target);
    // console.log('this is event target: ', event.target);
    // console.log('task data is: ', taskData);
    // console.log('taskdata.entries: ', taskData.entries());
    const taskObj = Object.fromEntries(taskData.entries());

    // HOW TO GET workspace ID?
    // taskObj.workspaceID =
    // console.log('task obj is:', taskObj);
    fetch('/stickies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskObj)
    })
    // .then(() => {
    //   console.log(taskObj);
    // })
    //form is submitted w/ K/V pairs 
    event.target.reset();
    //resets the form to blank inputs
    setCards([...cards, taskObj])
    // console.log('task obj is: ', taskObj);
    // send get request to DB with task info in body
  }

  // WORKSPACES

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
    <div className='scrum-container'>
      <Nav />
      {/* Form element for post it creation */}
      <main className='scrum-main position-relative'>
        <div className='d-flex'>
          <button className='bg-danger p-1 text-light' onClick={handleNewTask}>
            Add Task
          </button>
          <h2 className='text-light'>Select Workspace:</h2>
          <WSSelector workspaces={workspaces} setWorkspaces={setWorkspaces} />
          <WSSettings workspaces={workspaces} setWorkspaces={setWorkspaces} />
        </div>
        {openModal ? (
          <>
            <div className='bg-dark vw-100 vh-100 position-absolute top-0 start-0 opacity-50'>
              Test
            </div>
            <form
              className='position-absolute top-50 start-50 translate-middle-x bg-light p-4'
              id='task_form'
              onSubmit={taskSubmit}
            >
              <input
                required
                type='text'
                name='taskTitle'
                id='taskTitle'
                placeholder='Title'
              ></input>
              <textarea
                placeholder='Description'
                className='stickie-description'
                form='task_form'
                id='taskDesc'
                name='taskDesc'
                rows='10'
                cols='30'
              ></textarea>
              {/* <label htmlFor='snack'>Snack:</label> */}
              <input
                required
                type='text'
                name='snack'
                className='snack-text'
                id='snack'
                placeholder='Snack'
              ></input>
              {/* Add a clear button to clean form */}
              <input
                type='submit'
                value='Submit'
                className='scrum-description-button'
              ></input>
              <button onClick={handleNewTask}>Cancel</button>
            </form>
          </>
        ) : null}
        {/* 4 columns for our post its (w/ drag and drop ability) */}
        <div className='board-area'>
          <Board id='board-1' className='board' title='New Task'>
            {/* <Card id='card-1' className='card' draggable='true' >
            </Card> */}
            {cards.map((card, index) => {
              return (
                <Card id={'card-' + index} className='card' draggable='true'>
                  <p>{card['task-title']}</p>
                  <p>Description: {card['task-desc']}</p>
                  <p>Snack: {card.snack}</p>
                </Card>
              );
            })}
          </Board>
          <Board
            id='board-2'
            className='board overflow-auto'
            title='In Progress'
          ></Board>
          <Board id='board-3' className='board' title='Blocked'></Board>
          <Board id='board-4' className='board' title='In Review'></Board>
          <Board id='board-5' className='board' title='Complete'></Board>
        </div>
      </main>
    </div>
  );
}

export default Scrum;
