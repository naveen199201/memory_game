import React, {useState } from "react";
import "./Cards.css";


const Header = ( {startGame}) => {
    const [player1Name, setPlayer1Name] = useState("Player1");
    const [player2Name, setPlayer2Name] = useState("Player2");
    const handleStartGame = ()=>{
        if(player1Name && player2Name)
            startGame(player1Name,player2Name, true);
    }
   
  return (
    <>
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
  </>
  )
}

export default Header