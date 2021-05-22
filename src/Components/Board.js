import React from 'react';
//importing prop-types for validation
import PropTypes from 'prop-types';

//importing Card child component
import Card from './Card'

//states passed from App.js
export default function Board({ disabled, dimension, cards, flipped, solved, handleClick }) {
    return (
        <div className="board mt-4"
              style={{
                  //size of cards are adjusted based on the users viewport
                  width: dimension,
                  height: dimension
              }}>
            {/*array is mapped and populated with the values, passed as props.
            flipped and solved checks if the card id's match */}
            {cards.map((card) => (
                <Card 
                    key={card.id}    
                    id={card.id}
                    type={card.type}
                    width={dimension/4.5}
                    height={dimension/4.5}
                    flipped={flipped.includes(card.id)}
                    solved={solved.includes(card.id)}
                    handleClick={handleClick}
                    disabled={disabled || solved.includes(card.id)}
                />
            ))}
        </div>
    )
}

//propTypes are set for each value to ensure valid data is passed to the Component from App.js
Board.propTypes = {
    disabled: PropTypes.bool.isRequired,
    dimension: PropTypes.number,
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    solved: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick: PropTypes.func.isRequired
}