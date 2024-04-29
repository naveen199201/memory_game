
import { useEffect, useState, useRef } from "react";
import "./Cards.css";
// import "./App.css";
import Card from "./Card";
import Countdown from "react-countdown";
import data from './data.json';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { blue } from "@mui/material/colors";

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
  const [timer, setTimer] = useState(20);
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
      const scoreToAdd = currentPlayer === 1 ? 1 : 10; // Adjust score based on player
      currentPlayer === 1
        ? setPlayer1Score((score) => score + scoreToAdd)
        : setPlayer2Score((score) => score + scoreToAdd);
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
    } else {
      timeout.current = setTimeout(() => {
        setOpenCards([]);
        switchPlayer(); // Switch player if cards don't match
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

  const renderCountdown = () => {
    if (gameStarted && openCards.length !== 2) {
      return (
        <Countdown
          key={currentPlayer}
          date={Date.now() + timer * 1000}
          renderer={({ seconds }) => seconds}
          onComplete={switchPlayer}
          controlled={false}
        />
      );
    }
    return null;
  };
  const handleStartGame = () => {
    if (player1Name && player2Name) {
      setGameStarted(true);
    }
  };

  return (
    <div className="App">
      <header>
        <h3>Memory Game</h3>
        <div className="player">
          <span className="player-input">
            <label>
              Enter Player 1 Name:
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
            </label>
          </span >
          <span className="player-input">
            <label>
              Enter Player 2 Name:
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            </label>
          </span>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      </header>
      <Grid container className="game-data" justifyContent={"center"}>
        <div className="player-data">
          <Stack direction="column" spacing={2} justifyContent="space-around">
            <Box
              component="section"
              sx={{
                p: 2,
                border: '1px dashed grey',
                bgcolor: currentPlayer === 1 ? 'lightgreen' : 'transparent',
                width: { xs: '50%', md: 'auto' }, // Adjust the width for different screen sizes
              }}
              className="box-container"
            >
              {player1Name}<br /> Score: {player1Score}
            </Box>
            <Box
              component="section"
              sx={{
                p: 2,
                border: '1px dashed grey',
                width: { xs: '50%', md: 'auto' }, // Adjust the width for different screen sizes
              }}
            >
              Timer: {renderCountdown()}
            </Box>
            <Box
              component="section"
              sx={{
                p: 2,
                border: '1px dashed grey',
                bgcolor: currentPlayer === 2 ? 'lightgreen' : 'transparent',
                width: { xs: '50%', md: 'auto' }, // Adjust the width for different screen sizes
              }}
            >
              Player 2 <br />Score: {player2Score}
            </Box>
            <div className="container1 "  >
            <Button className="button" variant="contained" onClick={handleRestart} color="primary">
              Reset
            </Button>
          </div>
          </Stack>
        </div>

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
    </div>

  );
}

export default App;


















