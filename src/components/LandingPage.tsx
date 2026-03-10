import { useId } from 'react'
import { Shield, Activity, FileSearch, Bell, Bot, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'

// ---------------------------------------------------------------------------
// Decorative mini-charts (pure SVG, no recharts dependency)
// ---------------------------------------------------------------------------

/** Sparkline area chart */
function MiniSparkline({ color, data }: { color: string; data: number[] }) {
  const id = useId()
  const max = Math.max(...data)
  const w = 200
  const h = 48
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - (v / max) * (h - 4) - 2
    return `${x},${y}`
  })
  const line = points.join(' ')
  const area = `0,${h} ${line} ${w},${h}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Mini bar chart */
function MiniBars({ color, data }: { color: string; data: number[] }) {
  const max = Math.max(...data)
  const w = 200
  const h = 48
  const barW = w / data.length - 2

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24" preserveAspectRatio="none">
      {data.map((v, i) => {
        const barH = (v / max) * (h - 4)
        const x = i * (w / data.length) + 1
        return (
          <rect
            key={i}
            x={x}
            y={h - barH}
            width={barW}
            height={barH}
            rx={1}
            fill={color}
            opacity={0.5 + (v / max) * 0.5}
          />
        )
      })}
    </svg>
  )
}

/** Mini donut ring */
function MiniDonut({ color, segments }: { color: string; segments: number[] }) {
  const total = segments.reduce((a, b) => a + b, 0)
  const r = 18
  const cx = 24
  const cy = 24
  const circumference = 2 * Math.PI * r
  let offset = 0

  return (
    <svg viewBox="0 0 48 48" className="h-24 w-24">
      {segments.map((seg, i) => {
        const dash = (seg / total) * circumference
        const gap = circumference - dash
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            opacity={0.3 + (i / segments.length) * 0.7}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )
        offset += dash
        return el
      })}
    </svg>
  )
}

/** Horizontal lines (log-like) */
function MiniLines({ color }: { color: string }) {
  const widths = [85, 60, 92, 45, 78, 55, 70]
  return (
    <svg viewBox="0 0 200 48" className="w-full h-24" preserveAspectRatio="none">
      {widths.map((w, i) => (
        <rect
          key={i}
          x={0}
          y={i * 7}
          width={`${w}%`}
          height={3}
          rx={1.5}
          fill={color}
          opacity={0.15 + (i % 3) * 0.12}
        />
      ))}
    </svg>
  )
}

/** Small network/node graph */
function MiniGraph({ color }: { color: string }) {
  const nodes = [
    { x: 24, y: 24 }, { x: 60, y: 12 }, { x: 60, y: 36 },
    { x: 96, y: 8 }, { x: 96, y: 24 }, { x: 96, y: 40 },
  ]
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]]

  return (
    <svg viewBox="0 0 120 48" className="w-48 h-24">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeWidth={1} opacity={0.25}
        />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={3} fill={color} opacity={0.5 + (i % 2) * 0.3} />
      ))}
    </svg>
  )
}

/** Code brackets decoration */
function MiniCode({ color }: { color: string }) {
  const lines = [
    { indent: 0, w: 70 },
    { indent: 12, w: 55 },
    { indent: 12, w: 40 },
    { indent: 24, w: 50 },
    { indent: 12, w: 30 },
    { indent: 0, w: 20 },
  ]
  return (
    <svg viewBox="0 0 120 48" className="w-48 h-24">
      {lines.map((l, i) => (
        <rect
          key={i}
          x={l.indent}
          y={i * 7 + 2}
          width={l.w}
          height={3}
          rx={1.5}
          fill={color}
          opacity={0.2 + (i % 2) * 0.15}
        />
      ))}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Feature data
// ---------------------------------------------------------------------------

const COLORS = {
  blue: 'hsl(221.2 83.2% 53.3%)',
  green: 'hsl(160 60% 45%)',
  amber: 'hsl(43 96% 56.3%)',
  red: 'hsl(0 72.2% 50.6%)',
  purple: 'hsl(262 83.3% 57.8%)',
  cyan: 'hsl(210 80% 55%)',
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  visual: React.ReactNode
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Threat Detection',
    description: 'Real-time correlation engine with customizable rules for identifying security threats across your infrastructure.',
    visual: <MiniSparkline color={COLORS.blue} data={[2, 5, 3, 8, 6, 12, 9, 15, 11, 18, 14, 20]} />,
  },
  {
    icon: Activity,
    title: 'Log Collection',
    description: 'Multi-source ingestion from syslog, SNMP, databases, APIs, and file monitoring at scale.',
    visual: <MiniBars color={COLORS.green} data={[6, 9, 4, 11, 8, 13, 7, 10, 14, 5, 12, 9]} />,
  },
  {
    icon: FileSearch,
    title: 'Forensic Investigation',
    description: 'ClickHouse-powered analytics for sub-second searches across billions of security events.',
    visual: <MiniLines color={COLORS.amber} />,
  },
  {
    icon: Bell,
    title: 'Incident Response',
    description: 'Automated workflows and alert management for security operations teams.',
    visual: <MiniDonut color={COLORS.red} segments={[35, 25, 20, 20]} />,
  },
  {
    icon: Bot,
    title: 'Agentic Features',
    description: 'AI-driven agents that autonomously triage alerts, enrich context, and recommend response actions.',
    visual: <MiniGraph color={COLORS.purple} />,
  },
  {
    icon: Code2,
    title: 'Security as Code',
    description: 'Define detection rules, policies, and pipelines in CUE with an integrated IDE and version control.',
    visual: <MiniCode color={COLORS.cyan} />,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface LandingPageProps {
  onCreateAccount?: () => void
}

export default function LandingPage({ onCreateAccount }: LandingPageProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Hero */}
      <div className="px-8 py-8 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              SIEM Platform
            </h1>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Enterprise security information and event management.
              Collect, correlate, detect, and respond — all in one platform.
            </p>
          </div>
          {onCreateAccount && (
            <Button onClick={onCreateAccount} size="sm">
              Create account
            </Button>
          )}
        </div>
      </div>

      {/* Feature grid — widget-style cards, no gaps, border-separated */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-0">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <div
              key={f.title}
              className="flex flex-col border-b border-border sm:border-r sm:last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-center justify-between px-8 pt-6 pb-2">
                <h3 className="text-sm text-muted-foreground">{f.title}</h3>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 px-8 pb-3 pt-2">
                <p className="text-sm text-foreground">{f.description}</p>
              </div>
              <div className="px-8 pb-6">
                {f.visual}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
