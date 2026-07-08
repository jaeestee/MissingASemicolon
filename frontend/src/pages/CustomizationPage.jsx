import { useState } from "react";
import { startGame as startGameAPI } from "../api/gameEngineAPI";


function CustomizationPage({ setPage }) {

    const [players, setPlayers] = useState([
        "",
        ""
    ]);


    function updatePlayer(index, value) {

        const updatedPlayers = [...players];
        updatedPlayers[index] = value;
        setPlayers(updatedPlayers);

    }


    async function startGame() {
        const filteredPlayers = players.filter((player) => player.trim() !== "");

        try {
            const result = await startGameAPI(filteredPlayers);
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


            {players.map((player, index) => (

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