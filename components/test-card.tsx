import Link from "next/link"
import { Clock, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Test } from "@/lib/test-data"

interface TestCardProps {
  test: Test
}

export function TestCard({ test }: TestCardProps) {
  const difficultyColors = {
    easy: "bg-green-500/20 text-green-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    hard: "bg-red-500/20 text-red-400",
  }

  const difficultyLabels = {
    easy: "Oson",
    medium: "O'rtacha",
    hard: "Qiyin",
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-4 transition-all active:bg-muted">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground">{test.title}</h3>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColors[test.difficulty]}`}>
          {difficultyLabels[test.difficulty]}
        </span>
      </div>

      <p className="mb-3 flex-1 text-xs text-muted-foreground">{test.description}</p>

      <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>{test.questionCount} savol</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{test.duration} daq</span>
        </div>
      </div>

      <Link href={`/quiz/${test.id}`} className="w-full">
        <Button className="h-10 w-full touch-target bg-primary text-primary-foreground active:bg-primary/90">
          Boshlash
        </Button>
      </Link>
    </div>
  )
}
