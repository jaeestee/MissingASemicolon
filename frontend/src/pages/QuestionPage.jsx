import { useState } from "react";
import { submitAnswer } from "../api/gameEngineAPI";

function QuestionPage({ setPage, turn, players, currentPlayerIndex, scores, setScores, setCurrentPlayerIndex, freeSpins, setFreeSpins, setWinner }) {
    const [feedback, setFeedback] = useState("");

    if (!turn) {
        return <div>No question available.</div>;
    }

    async function handleAnswer(choice) {
        try {
            const currentPlayer = players[currentPlayerIndex] || "Player 1";
            const result = await submitAnswer(currentPlayer, choice, turn.correct_choice);
            if (result.correct) {
                const updatedScore = (scores[currentPlayer] || 0) + 100;
                const updatedScores = { ...scores, [currentPlayer]: updatedScore };
                setScores(updatedScores);
                if (updatedScore >= 500) {
                    setWinner(currentPlayer);
                    setPage("congrats");
                    return;
                }
            }
            const nextIndex = players.length > 1 ? (currentPlayerIndex + 1) % players.length : 0;
            setCurrentPlayerIndex(nextIndex);
            setFeedback(`${result.message} Next turn: ${players[nextIndex] || "Player 1"}`);
        } catch (error) {
            console.error("Unable to submit answer:", error);
        }
    }

    return (
        <div>
            <h2>Question Page</h2>
            <p>Current player: {players[currentPlayerIndex] || "Player 1"}</p>
            <p>Score: {scores[players[currentPlayerIndex] || "Player 1"] || 0}</p>
            <p>Category: {turn.category}</p>
            <p>{turn.question}</p>

            {turn.choices.map((choice) => (
                <button key={choice} onClick={() => handleAnswer(choice)}>
                    {choice}
                </button>
            ))}

            <p>{feedback}</p>
            <br />
            <button onClick={() => setPage("wheel")}>Continue to Wheel</button>
        </div>
    )
}

export default QuestionPage;