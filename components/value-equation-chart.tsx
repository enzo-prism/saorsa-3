import Link from "next/link"
import Reveal from "./reveal"

type TimePoint = {
  month: number
  label: string
}

type SeriesPoint = {
  month: number
  value: number
}

type Scenario = {
  id: string
  title: string
  subtitle: string
  feeLabel: string
  valueLabel: string
  fee: SeriesPoint[]
  value: SeriesPoint[]
  annotation: {
    month: number
    text: string
  }
}

const timePoints: TimePoint[] = [
  { month: 0, label: "Start" },
  { month: 3, label: "3 mo" },
  { month: 6, label: "6 mo" },
  { month: 12, label: "12 mo" },
]

const consultant: Scenario = {
  id: "consultant",
  title: "Traditional Consultant",
  subtitle:
    "Traditional consultants charge hourly or by scope. You define the problems, manage the work, and outcomes scale linearly with time spent, which caps impact and creates ongoing dependency.",
  feeLabel: "Fee (hourly / scoped)",
  valueLabel: "Value created (capped)",
  fee: [
    { month: 0, value: 12 },
    { month: 3, value: 16 },
    { month: 6, value: 20 },
    { month: 12, value: 28 },
  ],
  value: [
    { month: 0, value: 18 },
    { month: 3, value: 22 },
    { month: 6, value: 26 },
    { month: 12, value: 34 },
  ],
  annotation: { month: 6, text: "Results are capped by hours" },
}

const saorsa: Scenario = {
  id: "saorsa",
  title: "Saorsa",
  subtitle:
    "Saorsa operates as an embedded partner on a fixed retainer. We proactively identify and execute the highest-leverage opportunities across growth, operations, and profitability. Like a true equity partner, we focus on compounding improvements, our model works when your business grows faster, runs cleaner, and becomes meaningfully more profitable over time.",
  feeLabel: "Fee (fixed retainer)",
  valueLabel: "Value created (compounding)",
  fee: [
    { month: 0, value: 12 },
    { month: 3, value: 16 },
    { month: 6, value: 22 },
    { month: 12, value: 36 },
  ],
  value: [
    { month: 0, value: 18 },
    { month: 3, value: 24 },
    { month: 6, value: 34 },
    { month: 9, value: 56 },
    { month: 12, value: 100 },
  ],
  annotation: { month: 6, text: "Compounds as systems take hold" },
}

const dims = {
  width: 420,
  height: 272,
  padding: { top: 22, right: 18, bottom: 34, left: 38 },
}

const colors = {
  grid: "var(--color-foreground)",
  tick: "var(--color-foreground)",
  consultantValue: "var(--color-secondary)",
  consultantFee: "var(--color-foreground)",
  saorsaValue: "var(--color-primary)",
  saorsaFee: "var(--color-foreground)",
  annotation: "var(--color-foreground)",
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function polylinePath(points: { x: number; y: number }[]) {
  return points.reduce((acc, point, index) => (index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`), "")
}

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const n = points.length
  const delta: number[] = []
  const slopes: number[] = new Array(n).fill(0)

  for (let i = 0; i < n - 1; i += 1) {
    const dx = xs[i + 1] - xs[i]
    delta[i] = dx === 0 ? 0 : (ys[i + 1] - ys[i]) / dx
  }

  slopes[0] = delta[0] ?? 0
  slopes[n - 1] = delta[n - 2] ?? 0

  for (let i = 1; i < n - 1; i += 1) {
    slopes[i] = (delta[i - 1] + delta[i]) / 2
  }

  // Monotone cubic interpolation to avoid overshoot and point-to-point wiggles.
  for (let i = 0; i < n - 1; i += 1) {
    if (delta[i] === 0) {
      slopes[i] = 0
      slopes[i + 1] = 0
      continue
    }

    const a = slopes[i] / delta[i]
    const b = slopes[i + 1] / delta[i]

    if (a < 0 || b < 0) {
      slopes[i] = 0
      slopes[i + 1] = 0
      continue
    }

    const sum = a * a + b * b
    if (sum > 9) {
      const scale = 3 / Math.sqrt(sum)
      slopes[i] = scale * a * delta[i]
      slopes[i + 1] = scale * b * delta[i]
    }
  }

  let path = `M ${xs[0]} ${ys[0]}`

  for (let i = 0; i < n - 1; i += 1) {
    const dx = xs[i + 1] - xs[i]
    const cpx1 = xs[i] + dx / 3
    const cpy1 = ys[i] + (slopes[i] * dx) / 3
    const cpx2 = xs[i + 1] - dx / 3
    const cpy2 = ys[i + 1] - (slopes[i + 1] * dx) / 3
    path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${xs[i + 1]} ${ys[i + 1]}`
  }

  return path
}

function seriesToPoints(series: SeriesPoint[], minMonth: number, maxMonth: number, minValue: number, maxValue: number) {
  const chartWidth = dims.width - dims.padding.left - dims.padding.right
  const chartHeight = dims.height - dims.padding.top - dims.padding.bottom

  return series.map(({ month, value }) => {
    const monthProgress = (month - minMonth) / (maxMonth - minMonth)
    const valueProgress = (value - minValue) / (maxValue - minValue)
    return {
      month,
      value,
      x: dims.padding.left + monthProgress * chartWidth,
      y: dims.padding.top + chartHeight - valueProgress * chartHeight,
    }
  })
}

function netAreaPath(valueLine: { x: number; y: number }[], feeLine: { x: number; y: number }[]) {
  if (valueLine.length === 0 || feeLine.length === 0) return ""

  const chartHeight = dims.height - dims.padding.top - dims.padding.bottom
  const bottomY = dims.padding.top + chartHeight

  const valueShape = `${polylinePath(valueLine)} L ${valueLine[valueLine.length - 1].x} ${bottomY} L ${valueLine[0].x} ${bottomY} Z`
  const feeShape = `${polylinePath(feeLine)} L ${feeLine[feeLine.length - 1].x} ${bottomY} L ${feeLine[0].x} ${bottomY} Z`
  return `${valueShape} ${feeShape}`
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const minMonth = timePoints[0].month
  const maxMonth = timePoints[timePoints.length - 1].month
  const minValue = 0
  const maxValue = 100

  const feePoints = seriesToPoints(scenario.fee, minMonth, maxMonth, minValue, maxValue)
  const valuePoints = seriesToPoints(scenario.value, minMonth, maxMonth, minValue, maxValue)

  const ticks = [0, 25, 50, 75, 100]
  const chartWidth = dims.width - dims.padding.left - dims.padding.right
  const chartHeight = dims.height - dims.padding.top - dims.padding.bottom

  const isSaorsa = scenario.id === "saorsa"
  const valueStroke = isSaorsa ? colors.saorsaValue : colors.consultantValue
  const feeStroke = isSaorsa ? colors.saorsaFee : colors.consultantFee
  const fill = isSaorsa ? colors.saorsaValue : colors.consultantValue

  const descId = `value-equation-${scenario.id}-desc`

  const labelSafeTop = 14
  const labelSafeBottom = dims.height - dims.padding.bottom - 6
  const lastValue = valuePoints[valuePoints.length - 1]
  const lastFee = feePoints[feePoints.length - 1]

  const annotationPoint = valuePoints.reduce(
    (closest, point) => {
      if (!closest) return point
      return Math.abs(point.month - scenario.annotation.month) < Math.abs(closest.month - scenario.annotation.month) ? point : closest
    },
    null as null | (typeof valuePoints)[number]
  )
  const annotationOffsets = isSaorsa
    ? { lineX: 42, lineY: -34, textX: 46, textY: -38, textAnchor: "start" }
    : { lineX: -42, lineY: -34, textX: -46, textY: -38, textAnchor: "end" }

  return (
    <Reveal
      className={`relative bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm overflow-hidden ${
        isSaorsa ? "ring-1 ring-primary/10" : ""
      }`}
    >
      {isSaorsa && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>
      )}

      <div className="relative">
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-foreground">{scenario.title}</h3>
          <p className="text-sm text-foreground/70">{scenario.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-medium text-foreground/80">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1">
            <span className="h-2 w-2 rounded-full" style={{ background: valueStroke }} />
            {scenario.valueLabel}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-foreground/50" />
            {scenario.feeLabel}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${dims.width} ${dims.height}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${scenario.title}: fee versus value over time`}
          aria-describedby={descId}
        >
          <desc id={descId}>
            Conceptual, indexed chart. Dashed line shows fees over time. Solid line shows cumulative value created over time. The shaded area is the gap
            between value and fee.
          </desc>

          {/* Grid + ticks */}
          {ticks.map((tick) => {
            const y = dims.padding.top + chartHeight - (tick / 100) * chartHeight
            return (
              <g key={tick}>
                <line
                  x1={dims.padding.left}
                  y1={y}
                  x2={dims.width - dims.padding.right}
                  y2={y}
                  stroke={colors.grid}
                  strokeOpacity={0.12}
                  strokeWidth={1}
                />
                <text
                  x={dims.padding.left - 10}
                  y={y + 3}
                  textAnchor="end"
                  fontSize={11}
                  fill={colors.tick}
                  fillOpacity={0.55}
                  style={{ fontWeight: 500 }}
                >
                  {tick}
                </text>
              </g>
            )
          })}

          {/* X-axis labels */}
          {timePoints.map((tp) => {
            const x = dims.padding.left + ((tp.month - minMonth) / (maxMonth - minMonth)) * chartWidth
            return (
              <text
                key={tp.month}
                x={x}
                y={dims.height - 12}
                textAnchor="middle"
                fontSize={11}
                fill={colors.tick}
                fillOpacity={0.55}
                style={{ fontWeight: 500 }}
              >
                {tp.label}
              </text>
            )
          })}

          {/* Y-axis label */}
          <text x={dims.padding.left} y={dims.padding.top - 8} fontSize={11} fill={colors.tick} fillOpacity={0.65} style={{ fontWeight: 600 }}>
            Impact index
          </text>

          {/* Net value area (value - fee) */}
          <path d={netAreaPath(valuePoints, feePoints)} fill={fill} fillOpacity={isSaorsa ? 0.14 : 0.1} fillRule="evenodd" />

          {/* Fee line */}
          <path
            d={polylinePath(feePoints)}
            fill="none"
            stroke={feeStroke}
            strokeOpacity={0.6}
            strokeWidth={2}
            strokeDasharray="6 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Value line */}
          <path d={smoothPath(valuePoints)} fill="none" stroke={valueStroke} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

          {/* End markers */}
          <circle cx={lastFee.x} cy={lastFee.y} r={4} fill="var(--color-card)" stroke={feeStroke} strokeOpacity={0.75} strokeWidth={2} />
          <circle cx={lastValue.x} cy={lastValue.y} r={5} fill="var(--color-card)" stroke={valueStroke} strokeWidth={2.5} />

          {/* Direct labels (outlined for readability) */}
          <text
            x={lastValue.x - 8}
            y={clamp(lastValue.y - 10, labelSafeTop, labelSafeBottom)}
            textAnchor="end"
            fontSize={12}
            fill={valueStroke}
            stroke="var(--color-card)"
            strokeWidth={4}
            paintOrder="stroke"
            style={{ fontWeight: 700 }}
          >
            Value
          </text>
          <text
            x={lastFee.x - 8}
            y={clamp(lastFee.y + 16, labelSafeTop, labelSafeBottom)}
            textAnchor="end"
            fontSize={12}
            fill={feeStroke}
            fillOpacity={0.8}
            stroke="var(--color-card)"
            strokeWidth={4}
            paintOrder="stroke"
            style={{ fontWeight: 700 }}
          >
            Fee
          </text>

          {/* Annotation */}
          {annotationPoint && (
            <>
              <line
                x1={annotationPoint.x}
                y1={annotationPoint.y}
                x2={annotationPoint.x + annotationOffsets.lineX}
                y2={annotationPoint.y + annotationOffsets.lineY}
                stroke={colors.annotation}
                strokeOpacity={0.35}
                strokeWidth={1.5}
              />
              <text
                x={annotationPoint.x + annotationOffsets.textX}
                y={annotationPoint.y + annotationOffsets.textY}
                fontSize={11}
                fill={colors.annotation}
                fillOpacity={0.85}
                stroke="var(--color-card)"
                strokeWidth={4}
                paintOrder="stroke"
                textAnchor={annotationOffsets.textAnchor}
                style={{ fontWeight: 600 }}
              >
                {scenario.annotation.text}
              </text>
            </>
          )}
        </svg>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-foreground/70">
          <div>
            <p className="font-medium text-foreground/80">Cost</p>
            <p>{isSaorsa ? "Fixed retainer (pre-agreed step-ups)" : "Hourly / scoped fees"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground/80">Value</p>
            <p>{isSaorsa ? "Compounds over time" : "Grows linearly"}</p>
          </div>
          <div>
            <p className="font-medium text-foreground/80">Takeaway</p>
            <p>{isSaorsa ? "The gap widens" : "The gap stays small"}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function ValueEquationChart() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Value Equation</h2>
          <p className="text-foreground/70">
            A flat fee can buy hours from a consultant—or compounding results from an embedded partner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScenarioCard scenario={consultant} />
          <ScenarioCard scenario={saorsa} />
        </div>

        <Reveal className="mt-8 bg-muted/30 border border-border rounded-xl p-5 md:p-6">
          <p className="text-sm md:text-base text-foreground/80">
            <span className="font-semibold text-foreground">Takeaway:</span> predictable fees, radically different outcomes—because value compounds when
            Saorsa works shoulder to shoulder with you.
          </p>
          <p className="mt-3 text-sm md:text-base text-foreground/80">
            <span className="font-semibold text-foreground">Example:</span> When growth slows due to unclear ownership and capital decisions driven by
            instinct, we step in. By anchoring accountability and experimentation to the finance function, we improve
            capital efficiency and focus the business on the metrics that drive real value, both today and at exit.
          </p>
          <p className="mt-4 text-sm md:text-base text-foreground/75">
            See how this model plays out in real engagements—clear scope, faster decisions, and measurable compounding
            outcomes.
          </p>
          <div className="mt-3">
            <Link
              href="/partners#case-studies"
              className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              Explore case studies
            </Link>
          </div>
          <p className="text-xs text-foreground/60 mt-4">
            *Illustrative, indexed visualization. Outcomes vary by business, timing, and execution.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
