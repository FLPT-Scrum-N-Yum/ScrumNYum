import React from 'react';

function Board(props) {
  const drop = (event) => {
    event.preventDefault();
    const card_id = event.dataTransfer.getData('card_id');
    //data transfer during dragg n ddrop opteration

    const card = document.getElementById(card_id);
    card.style.display = 'block';

    event.target.appendChild(card);
  };

  const dragOver = (event) => {
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
