"use client"

import { useEffect, useRef, useState } from "react"
import { SECTORS } from "@/lib/game"

const SIZE = 300
const R = SIZE / 2
const N = SECTORS.length
const SEG = 360 / N

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function sectorPath(index: number) {
  const start = index * SEG
  const end = start + SEG
  const p1 = polar(R, R, R, start)
  const p2 = polar(R, R, R, end)
  return `M ${R} ${R} L ${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y} Z`
}

export function Wheel({
  spinning,
  target,
  onSpinEnd,
}: {
  spinning: boolean
  target: number
  onSpinEnd: () => void
}) {
  const [rotation, setRotation] = useState(0)
  const spins = useRef(0)

  useEffect(() => {
    if (!spinning) return
    // Land so the middle of the target sector sits under the pointer (top).
    const targetCenter = target * SEG + SEG / 2
    spins.current += 1
    const full = 360 * (4 + spins.current)
    const final = full + (360 - targetCenter)
    setRotation(final)
  }, [spinning, target])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* pointer */}
        <div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
          aria-hidden="true"
        >
          <div className="h-0 w-0 border-x-8 border-t-[16px] border-x-transparent border-t-foreground" />
        </div>

        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label="Prize wheel"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 3.5s cubic-bezier(0.17, 0.67, 0.2, 1)" : "none",
          }}
          onTransitionEnd={() => {
            if (spinning) onSpinEnd()
          }}
        >
          <circle cx={R} cy={R} r={R} fill="var(--muted)" />
          {SECTORS.map((s, i) => {
            const mid = i * SEG + SEG / 2
            const labelPos = polar(R, R, R * 0.62, mid)
            return (
              <g key={i}>
                <path d={sectorPath(i)} fill={s.color} stroke="white" strokeWidth={1.5} />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="white"
                  fontSize={9}
                  fontWeight={700}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${mid}, ${labelPos.x}, ${labelPos.y})`}
                >
                  {s.label}
                </text>
              </g>
            )
          })}
          <circle cx={R} cy={R} r={16} fill="var(--foreground)" />
        </svg>
      </div>
    </div>
  )
}
