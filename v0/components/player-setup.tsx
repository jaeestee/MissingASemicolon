"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function PlayerSetup({ onStart }: { onStart: (names: string[]) => void }) {
  const [names, setNames] = useState<string[]>(["", ""])

  function update(i: number, value: string) {
    setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)))
  }

  const filled = names.map((n) => n.trim()).filter(Boolean)
  const canStart = filled.length >= 2

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Players</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter 2 to 4 player names.</p>
      </div>

      <div className="flex flex-col gap-3">
        {names.map((name, i) => (
          <input
            key={i}
            value={name}
            onChange={(e) => update(i, e.target.value)}
            placeholder={`Player ${i + 1}`}
            className="rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {names.length < 4 && (
          <Button variant="outline" onClick={() => setNames((p) => [...p, ""])}>
            Add Player
          </Button>
        )}
        <Button disabled={!canStart} onClick={() => onStart(filled)}>
          {canStart ? "Start Game" : "Enter at least 2 names"}
        </Button>
      </div>
    </div>
  )
}
