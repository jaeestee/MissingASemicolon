"use client"

import type { Question } from "@/lib/game"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function QuestionScreen({
  question,
  showResult,
  onAnswer,
}: {
  question: Question
  showResult: boolean
  onAnswer: (index: number) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {question.category} · {question.value} pts
        </span>
        <h3 className="mt-2 text-balance text-xl font-semibold leading-relaxed">
          {question.prompt}
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        {question.answers.map((answer, i) => {
          const isCorrect = i === question.correct
          return (
            <Button
              key={i}
              variant="outline"
              disabled={showResult}
              onClick={() => onAnswer(i)}
              className={cn(
                "h-auto justify-start py-3 text-left text-base",
                showResult && isCorrect && "border-2 border-green-600 text-green-700",
              )}
            >
              <span className="mr-2 font-bold">{String.fromCharCode(65 + i)}.</span>
              {answer}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
