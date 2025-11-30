import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  color?: string
}

export function StatsCard({ title, value, subtitle, icon, color = "bg-primary" }: StatsCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 shadow-sm ${color}`}>
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${color} shadow-md`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
