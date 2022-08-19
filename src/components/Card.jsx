import React, { useState } from 'react';

function Card(props) {
  const [openSettings, setOpenSettings] = useState(false);

  console.log(props.cards);
  const dragStart = (event) => {
    const target = event.target;

    event.dataTransfer.setData('card_id', target.id);
  };

  const dragOver = (event) => {
    event.stopPropagation();
  };

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings ? true : false);
  };

  return (
    <div
      className='stickie'
      id={props.id}
      dbID = {props.dbID}
      onDragStart={dragStart}
      onDragOver={dragOver}
      draggable='true'
    >
      {/* generic label that don't know children ahead of time */}
      {props.children}
      <div className='dropdown'>
        <button
          type='button'
          className='elipses'
          onClick={handleOpenSettings}
          // className='btn btn-warning dropdown-toggle data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"'
        > 
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-three-dots'
            viewBox='0 0 16 16'
          >
            <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
          </svg>
        </button>
        {openSettings ? (
          <div className='settings-container'>
            <a className='dropdown-item' href='#'>
              View details
            </a>
            <a className='dropdown-item' href='#'>
              Edit
            </a>
            <a className='dropdown-item' href='#'>
              Delete
            </a>
          </div>
        ) : null}

        {/* displays the map prop drilled from scrum?? (card) */}
      </div>
    </div>
  );
}

export default Card;
