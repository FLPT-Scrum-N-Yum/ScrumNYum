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
  const dummyCard = [];

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
    fetch('/api/stickies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskObj),
    }).then((res) => {});
    // .then(() => {
    //   console.log(taskObj);
    // })
    //form is submitted w/ K/V pairs
    event.target.reset();
    //resets the form to blank inputs
    setCards([...cards, taskObj]);
    // console.log('task obj is: ', taskObj);
    // send get request to DB with task info in body
  };

  // WORKSPACES

  const onDelete = (event) => {
    event.preventDefault();
    const wsName = document.getElementById('ws-name').value;
    // send this to backend to delete
    //NOT SET UP W/ BACKEND
  };
  const dummyWs = { 
    id: '1',
    wsName: 'The JitHub Zone'
   }
  
   // hook to populate workspaces based on userID in dropdown menu
  const [workspaces, setWorkspaces] = useState([]);

  // get workspaces list from database when page loads
  useEffect(() => {
    fetch('api/workspaces/load')
      .then((response) => response.json())
      .then((data) => {
        console.log('this is data: ', data)
        // setWorkspaces(...dummyWs, data.workspaces);
        setWorkspaces(data);
      })
  }, []);

  return (
    <div className='scrum-container'>
      <Nav />
      {/* Form element for post it creation */}
      <main className='scrum-main position-relative'>
        <div className='ws-search'>
          <button className='task-btn' onClick={handleNewTask}>
            Add Task
          </button>
          {/* <h2 className='text-light'>Select Workspace:</h2> */}
          <WSSelector workspaces={workspaces} setWorkspaces={setWorkspaces} cards={cards} setCards={setCards} />
          {/* <WSSettings workspaces={workspaces} setWorkspaces={setWorkspaces} /> */}
        </div>
        {openModal ? (
          <div className='overlay-container'>
            <div className='overlay'></div>
            <form className='add-task' id='task_form' onSubmit={taskSubmit}>
              <input
                className='add-input'
                required
                type='text'
                name='title'
                id='title'
                placeholder='Title'
              ></input>
              <textarea
                placeholder='Description'
                className='add-input'
                form='task_form'
                id='description'
                name='description'
                rows='10'
                cols='30'
              ></textarea>
              {/* <label htmlFor='snack'>Snack:</label> */}
              <input
                required
                type='text'
                name='snack'
                className='add-input'
                id='snack'
                placeholder='Snack'
              ></input>
              {/* Add a clear button to clean form */}
              <div className='add-task-btns'>
                <button type='submit' value='Submit' className='ws-btn'>
                  Submit
                </button>
                <button className='ws-btn' onClick={handleNewTask}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}
        {/* 4 columns for our post its (w/ drag and drop ability) */}
        <div className='board-area'>
          {/* create board component BOARD.JSX */}
          {/* each BOARD will map out cards from database, IF stickies.position === board index */}
          {/* each board will have a TITLE that is an array in state, [Not started, In Progress, ] */}

          <Board id='board-1' className='board' title='New'>
            {/* <Card id='card-1' className='card' draggable='true' >
            </Card> */}
            {cards.map((card, index) => {
              return (
                <Card id={'card-' + index} className='card' draggable='true'>
                  <p>{card['title']}</p>
                  <p>Description: {card['description']}</p>
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
