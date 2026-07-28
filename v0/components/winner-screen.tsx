"use client"

import type { Player } from "@/lib/game"
import { Button } from "@/components/ui/button"

export function WinnerScreen({ players, onRestart }: { players: Player[]; onRestart: () => void }) {
  const ranked = [...players].sort((a, b) => b.score - a.score)
  const top = ranked[0].score
  const winners = ranked.filter((p) => p.score === top)

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Game Over
      </p>
      <h2 className="text-balance text-4xl font-bold">
        {winners.length > 1 ? "It's a tie!" : `${winners[0].name} wins!`}
      </h2>

      <div className="w-full max-w-xs space-y-2">
        {ranked.map((p, i) => (
          <div
            key={p.name}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2"
          >
            <span className="font-medium">
              {i + 1}. {p.name}
            </span>
            <span className="font-bold tabular-nums">{p.score}</span>
          </div>
        ))}
      </div>

      <Button size="lg" onClick={onRestart}>
        Play Again
      </Button>
    </div>
  )
}
