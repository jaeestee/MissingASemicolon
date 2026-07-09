import { useState } from "react";

import TitleScreen from "./pages/TitleScreen";
import RulesPage from "./pages/RulesPage";
import CustomizationPage from "./pages/CustomizationPage";
import WheelPage from "./pages/WheelPage";
import JeopardyPage from "./pages/JeopardyPage";
import QuestionPage from "./pages/QuestionPage";
import CongratsPage from "./pages/CongratsPage";


function App() {

  const [page, setPage] = useState("title");
  const [turn, setTurn] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [freeSpins, setFreeSpins] = useState({});
  const [winner, setWinner] = useState(null);


  return (
    <div>

      {page === "title" &&
        <TitleScreen setPage={setPage}/>
      }

      {page === "rules" &&
        <RulesPage setPage={setPage}/>
      }

      {page === "customize" &&
        <CustomizationPage setPage={setPage} setPlayers={setPlayers} setScores={setScores} setFreeSpins={setFreeSpins} />
      }

      {page === "wheel" &&
        <WheelPage
          setPage={setPage}
          setTurn={setTurn}
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          scores={scores}
          freeSpins={freeSpins}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
          setScores={setScores}
          setFreeSpins={setFreeSpins}
        />
      }

      {page === "jeopardy" &&
        <JeopardyPage setPage={setPage}/>
      }

      {page === "question" &&
        <QuestionPage
          setPage={setPage}
          turn={turn}
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          scores={scores}
          setScores={setScores}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
          freeSpins={freeSpins}
          setFreeSpins={setFreeSpins}
          setWinner={setWinner}
        />
      }

      {page === "congrats" &&
        <CongratsPage winner={winner} scores={scores} players={players} />
      }

    </div>
  )
}

export default App;