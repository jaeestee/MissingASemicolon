"use client"

import { availableInCategory } from "@/lib/game"
import { Button } from "@/components/ui/button"

export function QuestionSelect({
  category,
  used,
  onSelect,
}: {
  category: string
  used: Record<string, boolean>
  onSelect: (id: string) => void
}) {
  const available = availableInCategory(used, category).sort((a, b) => a.value - b.value)

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-lg font-semibold">{category} — pick a value</h3>
      <div className="grid grid-cols-3 gap-2">
        {available.map((q) => (
          <Button key={q.id} className="h-16 text-lg font-bold" onClick={() => onSelect(q.id)}>
            {q.value}
          </Button>
        ))}
      </div>
    </div>
  )
}
