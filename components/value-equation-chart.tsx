"use client"

import { useState } from "react"

interface DataPoint {
  month: string
  value: number
  label: string
}

const dataPoints: DataPoint[] = [
  { month: "Month 1", value: 5, label: "5%" },
  { month: "Month 3", value: 25, label: "25%" },
  { month: "Month 6", value: 45, label: "45%" },
  { month: "Month 9", value: 65, label: "75%" },
  { month: "Month 12", value: 82, label: "85%" },
  { month: "Year 2", value: 100, label: "100%" },
]

export default function ValueEquationChart() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  // Calculate SVG path for the curve
  const width = 800
  const height = 300
  const padding = { top: 40, right: 40, bottom: 60, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

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
  const baselineY = padding.top + chartHeight - (20 / 100) * chartHeight

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Value Equation</h2>
          <p className="text-foreground/70">Visualizing our retainer philosophy: Value vs. Time</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {/* Legend */}
          <div className="flex flex-wrap gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-3 bg-accent rounded-sm" />
              <span className="text-foreground">Value Added (Strategic Partnership)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 border-t-2 border-dashed border-foreground/40" />
              <span className="text-foreground/70">Time/Cost (Traditional Consulting)</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
              {/* Y-axis label */}
              <text
                x={20}
                y={height / 2}
                textAnchor="middle"
                transform={`rotate(-90, 20, ${height / 2})`}
                className="fill-foreground/60 text-xs"
              >
                Business Impact & Asset Value
              </text>

              {/* Filled area under curve */}
              <path d={areaD} className="fill-accent/10" />

              {/* Traditional consulting baseline (dashed) */}
              <line
                x1={padding.left}
                y1={baselineY}
                x2={width - padding.right}
                y2={baselineY}
                strokeDasharray="8 4"
                className="stroke-foreground/30"
                strokeWidth={2}
              />

              {/* Value curve */}
              <path d={pathD} fill="none" className="stroke-accent" strokeWidth={3} />

              {/* Data points */}
              {points.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hoveredPoint === i ? 8 : 6}
                    className="fill-background stroke-accent"
                    strokeWidth={3}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: "pointer" }}
                  />

                  {/* Tooltip */}
                  {hoveredPoint === i && (
                    <g>
                      <rect
                        x={point.x - 80}
                        y={point.y - 70}
                        width={160}
                        height={55}
                        rx={6}
                        className="fill-foreground"
                      />
                      <text x={point.x} y={point.y - 48} textAnchor="middle" className="fill-background text-sm font-semibold">
                        {point.month}
                      </text>
                      <text x={point.x - 60} y={point.y - 28} className="fill-background/80 text-xs">
                        <tspan className="fill-accent">■</tspan> Impact: {point.label} (Cumulative Value)
                      </text>
                      <polygon
                        points={`${point.x - 6},${point.y - 15} ${point.x + 6},${point.y - 15} ${point.x},${point.y - 5}`}
                        className="fill-foreground"
                      />
                    </g>
                  )}

                  {/* X-axis labels */}
                  <text
                    x={point.x}
                    y={height - 20}
                    textAnchor="middle"
                    className="fill-foreground/60 text-xs"
                  >
                    {point.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-foreground/50 mt-6 text-center italic">
            *Conceptual illustration of our value-add methodology compared to traditional time-based consulting.
          </p>
        </div>
      </div>
    </section>
  )
}
