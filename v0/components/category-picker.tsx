"use client"

import { CATEGORIES, availableInCategory } from "@/lib/game"
import { Button } from "@/components/ui/button"

export function CategoryPicker({
  used,
  onPick,
  title,
}: {
  used: Record<string, boolean>
  onPick: (category: string) => void
  title: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map((c) => {
          const count = availableInCategory(used, c).length
          return (
            <Button
              key={c}
              variant="outline"
              className="h-auto flex-col gap-1 py-3"
              disabled={count === 0}
              onClick={() => onPick(c)}
            >
              <span>{c}</span>
              <span className="text-xs text-muted-foreground">{count} left</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
