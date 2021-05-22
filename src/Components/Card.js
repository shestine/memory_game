import React from 'react';
//importing prop-types for validation
import PropTypes from 'prop-types';

//states passed from Board.js
export default function Card({ 
    handleClick, 
    id, 
    type, 
    flipped, 
    solved,
    height, 
    width, 
    disabled
}) {
    return <div
        //adding class if card has been flipped
        className={`flip-container ${flipped ? 'flipped' : ''}`}
        style={{
            //passed from Board.js, size of the card
            width, height
        }}
        //checks if card is disabled, if not handleClick is called
        onClick={()=> disabled ? null : handleClick(id)}
        >
        <div className="flipper">
            <img
                style={{
                    //setting size of image, passed as props from Board.js
                    height, width
                }}
                //checks if card has been flipped and adds the relavant class
                className={flipped ? 'front' : 'back'}
                //checks if card is flipped or solved to determine which image is displayed
                src={flipped || solved ? `/img/${type}.png` : '/img/back.jpeg' }
                //alt set to name of image
                alt={type}
            />
        </div>
    </div>
}

//propTypes are set for each value to ensure valid data is passed to the Component from Board.js
Card.propTypes = {
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    flipped: PropTypes.bool.isRequired,
    solved: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired, 
    disabled: PropTypes.bool.isRequired
}