"use client"

import type { Player } from "@/lib/game"
import { cn } from "@/lib/utils"

export function PlayerStatus({ players, current }: { players: Player[]; current: number }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {players.map((p, i) => (
        <div
          key={i}
          className={cn(
            "rounded-lg border p-3",
            i === current ? "border-primary bg-primary/5" : "border-border bg-card",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="truncate text-sm font-semibold">{p.name}</span>
            {i === current && (
              <span className="text-[10px] font-bold uppercase text-primary">Turn</span>
            )}
          </div>
          <div className="mt-1 text-2xl font-bold tabular-nums">{p.score}</div>
          <div className="text-xs text-muted-foreground">
            {p.tokens} free {p.tokens === 1 ? "spin" : "spins"}
          </div>
        </div>
      ))}
    </div>
  )
}
