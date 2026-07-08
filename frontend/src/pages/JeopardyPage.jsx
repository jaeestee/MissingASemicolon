function JeopardyPage({ setPage }) {


    const categories = [
        "Science",
        "History",
        "Movies",
        "Sports",
        "Technology",
        "Random"
    ];


    const points = [
        200,
        400,
        600,
        800,
        1000
    ];


    return (

        <div>

            <h2>
                Jeopardy Board
            </h2>


            <table>

                <thead>

                    <tr>

                        {categories.map((category) => (

                            <th key={category}>
                                {category}
                            </th>

                        ))}

                    </tr>

                </thead>


                <tbody>

                    {points.map((point) => (

                        <tr key={point}>

                            {categories.map((category) => (

                                <td key={category + point}>

                                    <button
                                        onClick={() =>
                                            setPage("question")
                                        }
                                    >
                                        ${point}
                                    </button>

                                </td>

                            ))}

                        </tr>

                    ))}


                </tbody>


            </table>


            <button
                onClick={() => setPage("wheel")}
            >
                Return to Wheel
            </button>


        </div>

    );

}


export default JeopardyPage;