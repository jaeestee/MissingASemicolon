const GAME_ENGINE = "http://localhost:8000";


export async function spinWheel(){

    const response = await fetch(
        `${GAME_ENGINE}/spin-wheel`,
        {
            method:"POST"
        }
    );


    return response.json();

}



export async function startGame(players){

    const response = await fetch(
        `${GAME_ENGINE}/start-game`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                players
            })
        }
    );


    return response.json();

}