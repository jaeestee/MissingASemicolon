"use client"

import { Button } from "@/components/ui/button"

export function TitleScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Proof of Concept
      </p>
      <h1 className="text-balance text-5xl font-bold tracking-tight">Trivia Wheel</h1>
      <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
        Spin the wheel, answer questions across 6 categories, and score the most points to win.
      </p>
      <Button size="lg" onClick={onStart}>
        Start Game
      </Button>
    </div>
  )
}
