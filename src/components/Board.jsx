import React from 'react';

function Board(props) {
  const drop = (event) => {
    event.preventDefault();
    const card_id = event.dataTransfer.getData('card_id');
    //data transfer during dragg n ddrop opteration

    const card = document.getElementById(card_id);
    card.style.display = 'block';

    // When the sticky is dropped, update the position value for that sticky in the database
    console.log('target: ', event.target);



    event.target.appendChild(card);
  };

  const dragOver = (event) => {
    // console.log('this is an event: ', event)
    event.preventDefault();
  };

  return (
    <div
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      className={props.className}
    >
      {/* props.children represents our cards */}
      <h3 className='board-title'>{props.title}</h3>
      {props.children}
    </div>
  );
}

export default Board;
