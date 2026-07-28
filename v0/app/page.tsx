"use client"

import { useReducer } from "react"
import { initialState, reducer } from "@/lib/game"
import { TitleScreen } from "@/components/title-screen"
import { PlayerSetup } from "@/components/player-setup"
import { GameBoard } from "@/components/game-board"
import { WinnerScreen } from "@/components/winner-screen"

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <main className="min-h-dvh px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {state.phase !== "title" && state.phase !== "setup" && state.phase !== "winner" && (
          <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">Trivia Wheel</h1>
        )}

        {state.phase === "title" && <TitleScreen onStart={() => dispatch({ type: "GO_SETUP" })} />}

        {state.phase === "setup" && (
          <PlayerSetup onStart={(names) => dispatch({ type: "START", names })} />
        )}

        {state.phase === "winner" && (
          <WinnerScreen players={state.players} onRestart={() => dispatch({ type: "RESTART" })} />
        )}

        {["idle", "spinning", "chooseCategory", "selectQuestion", "question", "result"].includes(
          state.phase,
        ) && <GameBoard state={state} dispatch={dispatch} />}
      </div>
    </main>
  )
}
