import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface CategoryCardProps {
  id: string
  name: string
  icon: string
  color: string
  testCount: number
}

export function CategoryCard({ id, name, icon, color, testCount }: CategoryCardProps) {
  return (
    <Link href={`/tests?category=${id}`}>
      <div className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all active:bg-muted">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${color} text-xl`}>{icon}</div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground">{testCount} ta test</p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
