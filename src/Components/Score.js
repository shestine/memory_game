import React from "react";
//importing bootstrap button component
import Button from 'react-bootstrap/Button'; 


const Score = props => (
    //using bootstrap nav classes to display game name and scores in a navbar style element
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="mr-3 float-left">

            <h3>Star Wars Memory Game</h3>

        </li>
        <li>
            {/*display help icon, on click and alert is shown with game instructions */}
            <img className="helpIcon mr-5 " src="/img/help.png" alt="Help icon" 
            onClick={() => alert("Test your memory, match the 8 pairs of Star Wars characters to win! But you only have 12 guesses.")}></img>
        </li>
       
        <li className="nav-item ml-5 mr-5">
          {/*props set in App.js, wins and losses will be displayed based on calculations done */}
            <div>Wins: {props.wins} </div>         
            <div>Losses: {props.losses} </div>
          
        </li>
        <li className="nav-item ml-5 mr-5">
            {/*props set in App.js, score and wrongGuesses will be displayed based on calculations done */}
            <div>Characters Found: {props.score}/8</div>

            <div>Incorrect Guesses: {props.wrongGuesses}/12</div>
        </li>
        <li className="nav-item ml-5">
            {/*props set in App.js, onClick the newGame method is called. All values are set back to zero */}
            <Button variant="dark" onClick={() => props.newGame()}>Restart Game</Button>

        </li>
      </ul>
    </div>
    
);

//export allows for the component to be accessible
export default Score;