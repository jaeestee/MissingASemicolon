"use client"

import type { Dispatch } from "react"
import { type Action, type GameState, QUESTIONS } from "@/lib/game"
import { Button } from "@/components/ui/button"
import { Wheel } from "@/components/wheel"
import { PlayerStatus } from "@/components/player-status"
import { CategoryPicker } from "@/components/category-picker"
import { QuestionSelect } from "@/components/question-select"
import { QuestionScreen } from "@/components/question-screen"

export function GameBoard({
  state,
  dispatch,
}: {
  state: GameState
  dispatch: Dispatch<Action>
}) {
  const current = state.players[state.current]
  const activeQuestion = QUESTIONS.find((q) => q.id === state.activeQuestionId)

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <PlayerStatus players={state.players} current={state.current} />

      <div className="min-h-14 rounded-lg border border-border bg-muted/50 px-4 py-3 text-center text-sm font-medium">
        {state.message}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        {(state.phase === "idle" || state.phase === "spinning") && (
          <div className="flex flex-col items-center gap-6">
            <Wheel
              spinning={state.phase === "spinning"}
              target={state.wheelTarget}
              onSpinEnd={() => dispatch({ type: "RESOLVE_SPIN" })}
            />
            <Button
              size="lg"
              disabled={state.phase === "spinning"}
              onClick={() => dispatch({ type: "SPIN" })}
            >
              {state.phase === "spinning" ? "Spinning..." : `${current.name}, Spin!`}
            </Button>
          </div>
        )}

        {state.phase === "chooseCategory" && (
          <CategoryPicker
            used={state.used}
            title={
              state.chooser === "opponent"
                ? `Opponents: pick a category for ${current.name}`
                : `${current.name}: pick any category`
            }
            onPick={(category) => dispatch({ type: "CHOOSE_CATEGORY", category })}
          />
        )}

        {state.phase === "selectQuestion" && state.activeCategory && (
          <QuestionSelect
            category={state.activeCategory}
            used={state.used}
            onSelect={(id) => dispatch({ type: "SELECT_QUESTION", id })}
          />
        )}

        {(state.phase === "question" || state.phase === "result") && activeQuestion && (
          <div className="flex flex-col gap-6">
            <QuestionScreen
              question={activeQuestion}
              showResult={state.phase === "result"}
              onAnswer={(index) => dispatch({ type: "ANSWER", index })}
            />
            {state.phase === "result" && (
              <Button size="lg" onClick={() => dispatch({ type: "NEXT" })}>
                Continue
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
