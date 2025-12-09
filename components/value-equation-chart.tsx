"use client"

import { useMemo, useState } from "react"
import Reveal from "./reveal"
import { useEffect } from "react"

type DataPoint = {
  month: string
  value: number
  label: string
  note?: string
}

const dataPoints: DataPoint[] = [
  { month: "Month 1", value: 10, label: "10%", note: "Early proof points" },
  { month: "Month 3", value: 28, label: "28%" },
  { month: "Month 6", value: 50, label: "50%" },
  { month: "Month 9", value: 72, label: "75%", note: "Momentum inflection" },
  { month: "Month 12", value: 88, label: "90%" },
  { month: "Year 2", value: 100, label: "100%", note: "Asset realized" },
]

export default function ValueEquationChart() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const colors = {
    curve: "var(--color-primary)",
    baseline: "rgba(26,28,23,0.6)",
    grid: "rgba(26,28,23,0.08)",
    tooltipBg: "rgba(26,28,23,0.95)",
    tooltipText: "rgba(231,217,203,0.95)",
  }

  const dims = isMobile
    ? {
        width: 520,
        height: 360,
        padding: { top: 40, right: 44, bottom: 72, left: 72 },
        tooltip: { w: 200, h: 88, offsetY: 12 },
        baselineValue: 20,
      }
    : {
        width: 920,
        height: 420,
        padding: { top: 48, right: 72, bottom: 84, left: 96 },
        tooltip: { w: 220, h: 92, offsetY: 14 },
        baselineValue: 20,
      }

  const chartWidth = dims.width - dims.padding.left - dims.padding.right
  const chartHeight = dims.height - dims.padding.top - dims.padding.bottom
  const baselineY = dims.padding.top + chartHeight - (dims.baselineValue / 100) * chartHeight

  const points = useMemo(
    () =>
      dataPoints.map((d, i) => ({
        x: dims.padding.left + (i / (dataPoints.length - 1)) * chartWidth,
        y: dims.padding.top + chartHeight - (d.value / 100) * chartHeight,
        ...d,
      })),
    [chartHeight, chartWidth, dims.padding.left, dims.padding.top]
  )

  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const cpx1 = prev.x + (point.x - prev.x) / 3
    const cpx2 = prev.x + (2 * (point.x - prev.x)) / 3
    return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${point.y}, ${point.x} ${point.y}`
  }, "")

  const areaD = `${pathD} L ${points[points.length - 1].x} ${dims.padding.top + chartHeight} L ${dims.padding.left} ${
    dims.padding.top + chartHeight
  } Z`

  const getTooltipPos = (x: number, y: number) => {
    const tx = Math.min(Math.max(x - dims.tooltip.w / 2, dims.padding.left), dims.width - dims.padding.right - dims.tooltip.w)
    const ty = Math.max(y - dims.tooltip.h - dims.tooltip.offsetY, dims.padding.top + 6)
    return { x: tx, y: ty }
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Value Equation</h2>
          <p className="text-foreground/70">Visualizing our retainer philosophy: Value vs. Time</p>
        </div>

        <Reveal className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-medium text-foreground/80">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border-2 border-primary text-primary bg-card">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Value Added
              </span>
              <span className="text-foreground/60">(Strategic Partnership)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-foreground/40 text-foreground/70">
                <span className="h-2 w-2 rounded-full bg-foreground/50" />
                Time/Cost
              </span>
              <span className="text-foreground/60">(Traditional Consulting)</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative overflow-x-auto">
            <svg
              viewBox={`0 0 ${dims.width} ${dims.height}`}
              className="w-full h-auto min-w-[320px]"
              role="img"
              aria-label="The Value Equation chart comparing value added over time versus traditional consulting baseline."
            >
              <desc>Illustrates cumulative value versus time compared to traditional consulting baseline.</desc>

              {/* Y-axis label */}
              <text
                x={32}
                y={dims.height / 2}
                textAnchor="middle"
                transform={`rotate(-90, 32, ${dims.height / 2})`}
                className="fill-foreground/60 text-xs font-medium"
              >
                Business Impact & Asset Value
              </text>

              {/* Horizontal grid lines */}
              {[20, 40, 60, 80, 100].map((tick) => {
                const y = dims.padding.top + chartHeight - (tick / 100) * chartHeight
                return (
                  <g key={tick}>
                    <line x1={dims.padding.left} y1={y} x2={dims.width - dims.padding.right} y2={y} stroke={colors.grid} strokeWidth={1} />
                    <text x={dims.padding.left - 12} y={y + 4} textAnchor="end" className="fill-foreground/40 text-[11px]">
                      {tick}%
                    </text>
                  </g>
                )
              })}

              {/* Vertical grid lines */}
              {points.map((point, idx) => (
                <line
                  key={`v-${idx}`}
                  x1={point.x}
                  y1={dims.padding.top}
                  x2={point.x}
                  y2={dims.padding.top + chartHeight}
                  stroke={colors.grid}
                  strokeWidth={0.75}
                />
              ))}

              {/* Filled area under curve */}
              <path d={areaD} style={{ fill: colors.curve, opacity: 0.12 }} />

              {/* Baseline */}
              <line
                x1={dims.padding.left}
                y1={baselineY}
                x2={dims.width - dims.padding.right}
                y2={baselineY}
                stroke={colors.baseline}
                strokeWidth={2}
                strokeDasharray="6 6"
              />

              {/* Value curve */}
              <path d={pathD} fill="none" stroke={colors.curve} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />

              {/* Data points + labels */}
              {points.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hovered === i ? 10 : 8}
                    fill="var(--color-card)"
                    stroke={colors.curve}
                    strokeWidth={3}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: "pointer" }}
                    filter={hovered === i ? "drop-shadow(0 2px 6px rgba(61,68,53,0.35))" : "none"}
                  />
                  <text x={point.x} y={dims.height - 24} textAnchor="middle" className="fill-foreground/70 text-[11px]">
                    {point.month}
                  </text>
                </g>
              ))}

              {/* Single tooltip layer to ensure it stays above markers */}
              {hovered !== null && points[hovered] && (
                <g style={{ pointerEvents: "none" }}>
                  {(() => {
                    const point = points[hovered]
                    const { x: tx, y: ty } = getTooltipPos(point.x, point.y)
                    return (
                      <>
                        <rect x={tx} y={ty} width={dims.tooltip.w} height={dims.tooltip.h} rx={12} fill={colors.tooltipBg} />
                        <text x={tx + 14} y={ty + 22} className="text-sm font-semibold" fill={colors.tooltipText}>
                          {point.month}
                        </text>
                        <g transform={`translate(${tx + 14}, ${ty + 40})`}>
                          <rect width={9} height={9} rx={2} fill={colors.curve} />
                          <text x={14} y={8} className="text-xs" fill={colors.tooltipText}>
                            Impact: {point.label} (Cumulative)
                          </text>
                        </g>
                        <g transform={`translate(${tx + 14}, ${ty + 58})`}>
                          <rect width={9} height={9} rx={2} fill="rgba(255,255,255,0.7)" stroke={colors.baseline} />
                          <text x={14} y={8} className="text-xs" fill={colors.tooltipText}>
                            Input: Constant Hourly Billing
                          </text>
                        </g>
                        {point.note && (
                          <text x={tx + 14} y={ty + 78} className="text-[11px]" fill="rgba(231,217,203,0.7)">
                            {point.note}
                          </text>
                        )}
                      </>
                    )
                  })()}
                </g>
              )}
            </svg>
          </div>

          <p className="text-xs text-foreground/65 mt-6 text-center italic">
            *Conceptual illustration of our value-add methodology compared to traditional time-based consulting.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
