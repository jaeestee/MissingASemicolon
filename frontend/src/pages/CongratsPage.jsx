function CongratsPage({ winner, scores = {}, players = [] }) {


    const winnerName = winner || players[0] || "Player 1";
    const winnerScore = scores[winnerName] || 0;


    return (

        <div>

            <h1>
                Congratulations!
            </h1>


            <h2>
                Winner: {winnerName}
            </h2>

            <p>
                Final score: {winnerScore}
            </p>

            <p>
                Thanks for playing Wheel of Jeopardy!
            </p>


            <button
                onClick={() => window.location.reload()}
            >
                Play Again
            </button>


        </div>

    );

}


export default CongratsPage;