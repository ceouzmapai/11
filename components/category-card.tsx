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
      <div className="group flex items-center gap-4 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 transition-all active:scale-95 hover:border-primary/30">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${color} text-2xl shadow-md transition-transform group-hover:scale-110`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-foreground">{name}</h3>
          <p className="text-xs text-muted-foreground font-medium">{testCount} ta test</p>
        </div>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-active:translate-x-0" />
      </div>
    </Link>
  )
}
