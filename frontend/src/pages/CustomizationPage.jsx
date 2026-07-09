import { useState } from "react";
import { startGame as startGameAPI } from "../api/gameEngineAPI";


function CustomizationPage({ setPage, setPlayers, setScores, setFreeSpins }) {

    const [playerNames, setPlayerNames] = useState([
        "",
        ""
    ]);


    function updatePlayer(index, value) {

        const updatedPlayers = [...playerNames];
        updatedPlayers[index] = value;
        setPlayerNames(updatedPlayers);

    }


    async function startGame() {
        const filteredPlayers = playerNames.filter((player) => player.trim() !== "");

        try {
            const result = await startGameAPI(filteredPlayers);
            const initialScores = Object.fromEntries(filteredPlayers.map((player) => [player, 0]));
            const initialFreeSpins = Object.fromEntries(filteredPlayers.map((player) => [player, 0]));
            setPlayers(filteredPlayers);
            setScores(initialScores);
            setFreeSpins(initialFreeSpins);
            console.log("Game started:", result);
            setPage("wheel");
        } catch (error) {
            console.error("Unable to start game:", error);
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


            <button
                onClick={() => setPage("title")}
            >
                Back
            </button>


        </div>

    );

}


export default CustomizationPage;