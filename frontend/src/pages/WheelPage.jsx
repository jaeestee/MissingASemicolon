import {spinWheel} from "../api/gameEngineAPI";


function WheelPage(){

async function handleSpin(){

    const result = await spinWheel();

    console.log(result);

}


return (

<div>

<h2>
Wheel
</h2>


<button onClick={handleSpin}>
Spin Wheel
</button>


</div>

)

}


export default WheelPage;