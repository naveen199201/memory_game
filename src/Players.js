import React, { useState } from 'react'
import './Card.css'

const Players = () => {
    const [player1Name, setPlayer1Name] = useState("Player1");
    const [player2Name, setPlayer2Name] = useState("Player2");
    const [gameStarted, setGameStarted] = useState(false);
    const handleStartGame = () => {
        if (player1Name && player2Name) {
            setGameStarted(true);
        }
    };
    return (
        <div>
            <h3>Memory Game</h3>
            <div className="player">
                <span className="player-input">
                    <label className='player-name'>
                        Enter Player 1 Name:
                        <input
                            type="text"
                            value={player1Name}
                            onChange={(e) => setPlayer1Name(e.target.value)}
                        />
                    </label>
                </span >
                <span className="player-input">
                    <label classname="player-name">
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

        </div>
    )
}

export default Players