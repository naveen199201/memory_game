import React, { useMemo } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Countdown from "react-countdown";

const ScoreBoard = ({ player1, player2, score1, score2, handleRestart, currentPlayer, openCards, switchPlayer, timer, gameStarted }) => {

    const restart = () => {
        handleRestart()
    };
    const Timer = useMemo(() => {
        return (
            <Box>
                {gameStarted && openCards.length !== 2 && (
                    <Countdown
                        key={currentPlayer}
                        date={Date.now() + timer * 1000}
                        renderer={({ seconds }) => seconds}
                        onComplete={switchPlayer}
                    />
                )}
            </Box>
        );
    }, [gameStarted, currentPlayer]);

    return (
        <div className="player-data">
            <Stack className='player-data-box' justifyContent="space-between">
                <Box
                    sx={{
                        p: 2,
                        pb: 8,
                        border: '1px dashed grey',
                        textAlign: 'center',
                        bgcolor: currentPlayer === 1 ? 'lightgreen' : 'transparent',
                        width: { xs: '50%', md: 'auto' },
                    }}
                >
                    {player1}<br /> Score: {score1}
                </Box>
                <Box
                    sx={{
                        p: 2,
                        pb: 8,
                        border: '1px dashed grey',
                        textAlign: 'center',
                        width: { xs: '50%', md: 'auto' }, // Adjust the width for different screen sizes
                    }}
                >
                    Timer: {Timer}
                </Box>
                <Box
                    sx={{
                        p: 2,
                        pb: 8,
                        border: '1px dashed grey',
                        textAlign: 'center',
                        bgcolor: currentPlayer === 2 ? 'lightgreen' : 'transparent',
                        width: { xs: '50%', md: 'auto' }, // Adjust the width for different screen sizes
                    }}
                >
                    {player2} <br />Score: {score2}
                </Box>
                <div className="container1 "  >
                    <Button className='reset-button' variant="contained" onClick={restart} color="primary" >
                        Reset
                    </Button>
                </div>
            </Stack>
        </div>
    )
}

export default ScoreBoard