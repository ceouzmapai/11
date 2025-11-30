import Link from "next/link"
import { Clock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Test } from "@/lib/test-data"

interface TestCardProps {
  test: Test
}

export function TestCard({ test }: TestCardProps) {
  const difficultyColors = {
    easy: "bg-success/20 text-success border-success/30",
    medium: "bg-warning/20 text-warning border-warning/30",
    hard: "bg-destructive/20 text-destructive border-destructive/30",
  }

  const difficultyLabels = {
    easy: "Oson",
    medium: "O'rtacha",
    hard: "Qiyin",
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 transition-all active:scale-95">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-bold text-foreground text-base leading-snug">{test.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold border ${difficultyColors[test.difficulty]}`}
        >
          {difficultyLabels[test.difficulty]}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed">{test.description}</p>

      <div className="mb-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="h-4 w-4 text-primary" />
          <span>{test.questionCount} savol</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-accent" />
          <span>{test.duration} min</span>
        </div>
      </div>

      <Link href={`/quiz/${test.id}`} className="w-full">
        <Button className="h-11 w-full touch-target gradient-primary text-primary-foreground font-semibold active:opacity-90">
          Boshlash
        </Button>
      </Link>
    </div>
  )
}
