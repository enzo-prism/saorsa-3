"use client"

import { useState } from "react"

interface DataPoint {
  month: string
  value: number
  label: string
}

const dataPoints: DataPoint[] = [
  { month: "Month 1", value: 10, label: "10%" },
  { month: "Month 3", value: 28, label: "28%" },
  { month: "Month 6", value: 50, label: "50%" },
  { month: "Month 9", value: 72, label: "75%" },
  { month: "Month 12", value: 88, label: "90%" },
  { month: "Year 2", value: 100, label: "100%" },
]

export default function ValueEquationChart() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const accentColor = "var(--color-accent)"
  const baselineColor = "rgba(99, 108, 121, 0.6)"
  const gridColor = "rgba(15, 23, 42, 0.08)"
  const tooltipBg = "rgba(17, 24, 39, 0.92)"
  const tooltipText = "rgba(255, 255, 255, 0.92)"

  // Chart geometry
  const width = 880
  const height = 380
  const padding = { top: 48, right: 60, bottom: 80, left: 90 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const baselineValue = 22

  const points = dataPoints.map((d, i) => ({
    x: padding.left + (i / (dataPoints.length - 1)) * chartWidth,
    y: padding.top + chartHeight - (d.value / 100) * chartHeight,
    ...d,
  }))

  // Create smooth curve path
  const pathD = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const cpx1 = prev.x + (point.x - prev.x) / 3
    const cpx2 = prev.x + (2 * (point.x - prev.x)) / 3
    return `${acc} C ${cpx1} ${prev.y}, ${cpx2} ${point.y}, ${point.x} ${point.y}`
  }, "")

  // Create filled area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${padding.left} ${padding.top + chartHeight} Z`

  // Baseline (traditional consulting) y position
  const baselineY = padding.top + chartHeight - (baselineValue / 100) * chartHeight

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Value Equation</h2>
          <p className="text-foreground/70">Visualizing our retainer philosophy: Value vs. Time</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-6 mb-6 text-sm font-medium text-foreground/80">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-7 rounded-sm bg-background"
                style={{ border: `2px solid ${accentColor}` }}
                aria-hidden
              />
              <span>Value Added (Strategic Partnership)</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-0.5 w-9 border-t-2 border-dashed"
                style={{ borderColor: baselineColor }}
                aria-hidden
              />
              <span className="text-foreground/70">Time/Cost (Traditional Consulting)</span>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[520px]" role="img">
              <title>The Value Equation chart</title>
              <desc>Illustrates cumulative value versus time compared to traditional consulting baseline.</desc>

              {/* Y-axis label */}
              <text
                x={30}
                y={height / 2}
                textAnchor="middle"
                transform={`rotate(-90, 30, ${height / 2})`}
                className="fill-foreground/60 text-xs font-medium"
              >
                Business Impact & Asset Value
              </text>

              {/* Horizontal grid lines */}
              {[20, 40, 60, 80, 100].map((tick) => {
                const y = padding.top + chartHeight - (tick / 100) * chartHeight
                return (
                  <line
                    key={tick}
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke={gridColor}
                    strokeWidth={1}
                  />
                )
              })}

              {/* Vertical grid lines */}
              {points.map((point, idx) => (
                <line
                  key={`v-${idx}`}
                  x1={point.x}
                  y1={padding.top}
                  x2={point.x}
                  y2={padding.top + chartHeight}
                  stroke={gridColor}
                  strokeWidth={0.75}
                />
              ))}

              {/* Filled area under curve */}
              <path d={areaD} style={{ fill: accentColor, opacity: 0.12 }} />

              {/* Baseline */}
              <line
                x1={padding.left}
                y1={baselineY}
                x2={width - padding.right}
                y2={baselineY}
                stroke={baselineColor}
                strokeWidth={2}
                strokeDasharray="7 6"
              />

              {/* Value curve */}
              <path d={pathD} fill="none" stroke={accentColor} strokeWidth={3} strokeLinejoin="round" />

              {/* Data points + labels */}
              {points.map((point, i) => {
                const tooltipWidth = 230
                const tooltipHeight = 90
                const tooltipX = Math.min(
                  Math.max(point.x - tooltipWidth / 2, padding.left),
                  width - padding.right - tooltipWidth
                )
                const tooltipY = Math.max(point.y - tooltipHeight - 18, padding.top + 8)

                return (
                  <g key={i}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={hoveredPoint === i ? 8 : 7}
                      fill="var(--color-card)"
                      stroke={accentColor}
                      strokeWidth={3}
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{ cursor: "pointer" }}
                    />

                    {hoveredPoint === i && (
                      <g>
                        <rect
                          x={tooltipX}
                          y={tooltipY}
                          width={tooltipWidth}
                          height={tooltipHeight}
                          rx={10}
                          fill={tooltipBg}
                          stroke="rgba(0,0,0,0.3)"
                          strokeWidth={1}
                        />
                        <text
                          x={tooltipX + 16}
                          y={tooltipY + 24}
                          className="text-sm font-semibold"
                          fill={tooltipText}
                        >
                          {point.month}
                        </text>
                        <g transform={`translate(${tooltipX + 16}, ${tooltipY + 44})`}>
                          <rect width={10} height={10} rx={2} fill={accentColor} stroke="rgba(255,255,255,0.3)" />
                          <text x={16} y={9} className="text-xs" fill={tooltipText}>
                            Impact: {point.label} (Cumulative Value)
                          </text>
                        </g>
                        <g transform={`translate(${tooltipX + 16}, ${tooltipY + 62})`}>
                          <rect width={10} height={10} rx={2} fill="rgba(255,255,255,0.65)" stroke={baselineColor} />
                          <text x={16} y={9} className="text-xs" fill={tooltipText}>
                            Input: Constant Hourly Billing
                          </text>
                        </g>
                        <polygon
                          points={`${point.x - 7},${tooltipY + tooltipHeight} ${point.x + 7},${tooltipY + tooltipHeight} ${point.x},${tooltipY + tooltipHeight + 10}`}
                          fill={tooltipBg}
                          stroke="rgba(0,0,0,0.3)"
                          strokeWidth={1}
                        />
                      </g>
                    )}

                    {/* X-axis labels */}
                    <text
                      x={point.x}
                      y={height - 22}
                      textAnchor="middle"
                      className="fill-foreground/60 text-xs"
                    >
                      {point.month}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          <p className="text-xs text-foreground/60 mt-6 text-center italic">
            *Conceptual illustration of our value-add methodology compared to traditional time-based consulting.
          </p>
        </div>
      </div>
    </section>
  )
}
