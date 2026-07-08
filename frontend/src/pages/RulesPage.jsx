function RulesPage({setPage}) {

return (

<div>

<h2>Rules</h2>

<p>
Spin the wheel, answer questions,
and earn the highest score.
</p>


<button onClick={() => setPage("title")}>
Back
</button>

</div>

)

}

export default RulesPage;