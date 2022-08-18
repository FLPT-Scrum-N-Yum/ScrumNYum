import React from 'react';

function Card(props) {
  console.log(props.cards);
  const dragStart = (event) => {
    const target = event.target;

    event.dataTransfer.setData('card_id', target.id);
  };

  const dragOver = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className='stickie'
      id={props.id}
      onDragStart={dragStart}
      onDragOver={dragOver}
      draggable='true'
    >
      {/* generic label that don't know children ahead of time */}
      {props.children}
      <div className="dropdown">
        <button type='button' className='btn btn-warning dropdown-toggle data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"'>setting</button>
        <div className="dropdown-menu">
          <a className='dropdown-item' href='#'>View details</a>
          <a className='dropdown-item' href='#'>Edit</a>
          <a className='dropdown-item' href='#'>delete</a>
        </div>
        {/* displays the map prop drilled from scrum?? (card) */}
      </div>
    </div>
  );
}

export default Card;
