function TitleScreen({setPage}) {

    return (
        <div>

            <h1>
                Wheel of Jeopardy
            </h1>


            <button
                onClick={() => setPage("customize")}
            >
                Play
            </button>


            <button
                onClick={() => setPage("rules")}
            >
                Rules
            </button>


        </div>
    )

}


export default TitleScreen;