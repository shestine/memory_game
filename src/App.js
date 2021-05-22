import React, { useState, useEffect } from 'react'
import './App.css';
//importing custom stylesheet
import './custom.css'
//importing bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

//importing children Components
import Board from './Components/Board';
import Score from './Components/Score';
import initializeDeck from './Components/Deck';

export default function App() {
   //setting states used in child components
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [dimension, setDimension] = useState();
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [wins, setWins] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [losses, setLosses] = useState(0);

  //board is resized based on the size of the viewport and cards are set up (shuffled in Deck.js)
  useEffect(() => {
    resizeBoard()
    setCards(initializeDeck())
  }, [])

  //on click of a card checks if flipped array has any items, if no items the clicks card is added. Once another card is clicked, the type is checked to see
  //if its a match. If its a match the solved array is updated and the scores are updated. The spread operator is used to amend new matches to the solved array.
  const handleClick = (id) => {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id])
      setDisabled(false)
    }
    else {
      if (sameCardClicked(id)) return
      setFlipped([flipped[0],id])
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
        updateScore(score, checkScore);
      } else {
        noMatch();
      }
    }
  }

  //if cards don't match the score is updated, and checks how many guesses are left. Cards are flipped back.
  const noMatch = () => {
    updateGuesses(wrongGuesses, checkGuesses);
    setTimeout(resetCards, 2000);
  }

  //increments the  score value shown (number of characters found)
  function updateScore(score, callback) {
    var newScore = score + 1;
    setScore(score + 1);
    callback(newScore);
  }

  //increments the wrong guesses value shown
  function updateGuesses(wrongGuesses, callback) {
    var newGuesses = wrongGuesses + 1;
    setWrongGuesses(wrongGuesses + 1);
    callback(newGuesses);
  }

  //checks number of characters found, increments loss total and calls gameLost method
  const checkScore = (score) => {
    if (score>7) {
      setWins(wins + 1);
      setTimeout(gameWon, 1000);
    }
  }

  //checks number of incorrect guesses, increments loss total and calls gameLost method
  const checkGuesses = (wrongGuesses) => {
    if (wrongGuesses>11) {
      setLosses(losses + 1);
      setTimeout(gameLost, 1000);
    }
  }

  //once a user has matched all the characters this method is called, scores are reset, deck is reshuffled and an alert is shown to the user
  const gameWon = () => {
    setSolved([]);
    setCards(initializeDeck());
    setWrongGuesses(0);
    setScore(0);
    alert("You win this round. Great, kid, don’t get cocky.");
  }

  //once a user has guessed incorrectly 12 times this method is called, scores are reset, deck is reshuffled and an alert is shown to the user
  const gameLost = () => {
    setSolved([]);
    setCards(initializeDeck());
    setWrongGuesses(0);
    setScore(0);
    alert("You lost this round. Your eyes can deceive you; don’t trust them.");
  }

  //this method clears all values and reshuffles the cards
  const newGame = () => {
    setSolved([]);
    setCards(initializeDeck());
    setWrongGuesses(0);
    setScore(0);
    setWins(0);
    setLosses(0);
  }

  const resetCards = () => {
    //clears flipped array (cards go back to showing back.jpeg) and enables the card
    setFlipped([]);
    setDisabled(false);
  }

  //includes checks whether the id of the flipped card matches the value of an id in the array
  const sameCardClicked = (id) => flipped.includes(id);

  const isMatch = (id) => {
    //finds the id of the selected card in the array
    const clickedCard = cards.find((card)=> card.id ===id);
    const flippedCard = cards.find((card) => flipped[0]===card.id);
    //the card id is used to find the image name. checks if the flipped and clicked card has the same image name e.g. yoda
    return flippedCard.type ===clickedCard.type;
  }

  //sets dimensions based on the size of the viewport
  const resizeBoard = () => {
    setDimension(Math.min(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    ))
  }

  return (
    <div>
      {/*calling Components and passing props that were calculated/set in the methods*/}
      <Score 
        wins={wins}
        losses={losses}
        score={score}
        wrongGuesses={wrongGuesses}
        newGame={newGame}
      />
      <Board 
        dimension={dimension}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  )
}

//ACKNOWLEDGEMENTS
//With help from https://github.com/marjika/React-Card-Memory-Game