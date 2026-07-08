import { useState } from "react";
import { submitAnswer } from "../api/gameEngineAPI";

function QuestionPage({ setPage, turn }) {
    const [feedback, setFeedback] = useState("");

    if (!turn) {
        return <div>No question available.</div>;
    }

    async function handleAnswer(choice) {
        try {
            const result = await submitAnswer("Player 1", choice, turn.correct_choice);
            setFeedback(result.message);
        } catch (error) {
            console.error("Unable to submit answer:", error);
        }
    }

    return (
        <div>
            <h2>Question Page</h2>
            <p>Category: {turn.category}</p>
            <p>{turn.question}</p>

            {turn.choices.map((choice) => (
                <button key={choice} onClick={() => handleAnswer(choice)}>
                    {choice}
                </button>
            ))}

            <p>{feedback}</p>
            <br />
            <button onClick={() => setPage("wheel")}>Back to Wheel</button>
        </div>
    )
}

export default QuestionPage;