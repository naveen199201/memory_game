import { useEffect, useState, useRef, useMemo } from "react";
import "./Cards.css";
// import "./App.css";
import Card from "./Card";
import Countdown from "react-countdown";
import data from './data.json';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Header from './Header.js'
import ScoreBoard from "./ScoreBoard.js";

function App() {
  const uniqueCardsArray = data;
  const [cards, setCards] = useState(() =>
    shuffleCards(uniqueCardsArray.concat(uniqueCardsArray))
  );
  const [player1Name, setPlayer1Name] = useState("Player1");
  const [player2Name, setPlayer2Name] = useState("Player2");
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(null);
  const timeout = useRef(null);

  function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
      onStart();
    }
  };
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      const scoreToAdd = currentPlayer === 1 ? 1 : 1; // Adjust score based on player
      currentPlayer === 1
        ? setPlayer1Score((score) => score + scoreToAdd)
        : setPlayer2Score((score) => score + scoreToAdd);
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
    } else {
      timeout.current = setTimeout(() => {
        setOpenCards([]);
        switchPlayer();
      }, 500);
    }
  };
  const onStart = () => {
  }

  const switchPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1)); // Toggle player
    setTimer(20);
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setShouldDisableAllCards(false);
    setCurrentPlayer(1);
    setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
    setGameStarted(false);
  };
  const handleStartGame = (player1, player2, gamestart) => {
    setPlayer1Name(player1);
    setPlayer2Name(player2);
    setGameStarted(gamestart);
    setTimer(20)
  };

  return (
    <div className="App">
      <Grid container justifyContent={'center'}>
        <Header startGame={handleStartGame} />
      </Grid>
      <div className="bottom">
        <Grid container sm={6}xs={12} className="game-data" justifyContent={'center'}>
          <Grid item sm={4} xs={12} className="scorebaord-container">
            <ScoreBoard player1={player1Name} player2={player2Name} score1={player1Score} score2={player2Score} handleRestart={handleRestart} currentPlayer={currentPlayer} openCards={openCards} switchPlayer={switchPlayer} timer={timer} gameStarted={gameStarted}></ScoreBoard>
          </Grid>
          <Grid item sm={8}xs={12} justifyContent={'center'}>
            <div className="container">
              {cards.map((card, index) => {
                return (
                  <Card
                    key={index}
                    card={card}
                    index={index}
                    isDisabled={shouldDisableAllCards}
                    isInactive={checkIsInactive(card)}
                    isFlipped={checkIsFlipped(index)}
                    onClick={handleCardClick}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>

  );
}

export default App;