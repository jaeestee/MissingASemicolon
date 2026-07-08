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


  return (
    <div>

      {page === "title" &&
        <TitleScreen setPage={setPage}/>
      }

      {page === "rules" &&
        <RulesPage setPage={setPage}/>
      }

      {page === "customize" &&
        <CustomizationPage setPage={setPage}/>
      }

      {page === "wheel" &&
        <WheelPage setPage={setPage} setTurn={setTurn} />
      }

      {page === "jeopardy" &&
        <JeopardyPage setPage={setPage}/>
      }

      {page === "question" &&
        <QuestionPage setPage={setPage} turn={turn} />
      }

      {page === "congrats" &&
        <CongratsPage/>
      }

    </div>
  )
}

export default App;