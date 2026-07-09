import { useState } from "react";
import { startGame as startGameAPI } from "../api/gameEngineAPI";


function CustomizationPage({ setPage, setPlayers, setScores, setFreeSpins }) {

    const [playerNames, setPlayerNames] = useState([
        "",
        ""
    ]);
    const [statusMessage, setStatusMessage] = useState("");


    function updatePlayer(index, value) {

        const updatedPlayers = [...playerNames];
        updatedPlayers[index] = value;
        setPlayerNames(updatedPlayers);

    }


    async function startGame() {
        const filteredPlayers = playerNames
            .map((player) => player.trim())
            .filter(Boolean);

        if (filteredPlayers.length < 1) {
            setStatusMessage("Please enter at least one player name.");
            return;
        }

        try {
            setStatusMessage("Starting game...");
            const result = await startGameAPI(filteredPlayers);
            const initialScores = Object.fromEntries(filteredPlayers.map((player) => [player, 0]));
            const initialFreeSpins = Object.fromEntries(filteredPlayers.map((player) => [player, 0]));
            setPlayers(filteredPlayers);
            setScores(initialScores);
            setFreeSpins(initialFreeSpins);
            console.log("Game started:", result);
            setStatusMessage(`Game started for ${filteredPlayers.join(", ")}.`);
            setPage("wheel");
        } catch (error) {
            console.error("Unable to start game:", error);
            setStatusMessage("Could not start the game. Please try again.");
        }
    }


    return (

        <div>

            <h2>
                Customize Players
            </h2>


            <p>
                Enter player names:
            </p>


            {playerNames.map((player, index) => (

                <input
                    key={index}
                    type="text"
                    placeholder={`Player ${index + 1}`}
                    value={player}
                    onChange={(e) =>
                        updatePlayer(index, e.target.value)
                    }
                />

            ))}


            <br />


            <button
                onClick={startGame}
            >
                Start Game
            </button>

            {statusMessage && <p>{statusMessage}</p>}


            <button
                onClick={() => setPage("title")}
            >
                Back
            </button>


        </div>

    );

}


export default CustomizationPage;