import React, { useState } from "react";
import "./Cards.css";
import { Button, Grid } from "@mui/material";

const Header = ({ startGame }) => {
    const [player1Name, setPlayer1Name] = useState("Player1");
    const [player2Name, setPlayer2Name] = useState("Player2");
    
    const handleStartGame = () => {
        if (player1Name && player2Name)
            startGame(player1Name, player2Name, true);
    };

    return (
        <div className="header">
            <h3>Memory Game</h3>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid  xs={5} item>
                    <label className="player-name">
                        Enter Player 1 Name : 
                        <input
                            type="text"
                            value={player1Name}
                            onChange={(e) => setPlayer1Name(e.target.value)}
                            className="player-input"
                        />
                    </label>
                </Grid>
                <Grid item>
                    <label className="player-name">
                        Enter Player 2 Name :
                        <input
                            type="text"
                            value={player2Name}
                            onChange={(e) => setPlayer2Name(e.target.value)}
                            className="player-input"
                        />
                    </label>
                </Grid>
                <Grid item>
                    <Button onClick={handleStartGame} variant="contained" className="game-button">Start Game</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Header;
