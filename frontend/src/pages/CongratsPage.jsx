function CongratsPage() {


    const winner = "Player 1";


    return (

        <div>

            <h1>
                Congratulations!
            </h1>


            <h2>
                Winner: {winner}
            </h2>


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