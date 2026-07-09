import { useState } from "react";
import { createTurn, spinWheel } from "../api/gameEngineAPI";


function WheelPage({ setPage, setTurn: setAppTurn, players, currentPlayerIndex, scores, freeSpins, setCurrentPlayerIndex, setScores, setFreeSpins }) {
    const [spinResult, setSpinResult] = useState(null);
    const [turn, setTurnState] = useState(null);

    async function handleSpin() {
        try {
            const wheelResult = await spinWheel();
            setSpinResult(wheelResult);

            const turnResult = await createTurn("Science");
            if (turnResult?.question) {
                setTurnState(turnResult);
                setAppTurn(turnResult);
                setPage("question");
            } else {
                console.error("Turn was missing a question payload", turnResult);
            }
            console.log({ wheelResult, turnResult });
        } catch (error) {
            console.error("Unable to spin wheel:", error);
        }
    }


    return (
        <div>
            <h2>Wheel</h2>

            <button onClick={handleSpin}>Spin Wheel</button>

            {players.length > 0 && (
                <div>
                    <p>Current player: {players[currentPlayerIndex] || "Player 1"}</p>
                    <p>Scores: {players.map((player) => `${player}: ${scores[player] || 0}`).join(" | ")}</p>
                    <p>Free spins: {players.map((player) => `${player}: ${freeSpins[player] || 0}`).join(" | ")}</p>
                </div>
            )}

            {spinResult && (
                <p>Outcome: {spinResult.outcome}</p>
            )}

            {turn && (
                <div>
                    <p>Category: {turn.category}</p>
                    <p>Question: {turn.question}</p>
                    <button onClick={() => setPage("question")}>Answer Question</button>
                </div>
            )}
        </div>
    )
}


export default WheelPage;