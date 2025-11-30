"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Clock, Calendar, ChevronRight, FileX } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { getTestResults, type TestResult } from "@/lib/test-data"

export default function ResultsPage() {
  const [results, setResults] = useState<TestResult[]>([])

  useEffect(() => {
    setResults(getTestResults())
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("uz-UZ", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-500/20"
    if (score >= 60) return "text-yellow-400 bg-yellow-500/20"
    return "text-red-400 bg-red-500/20"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 pb-nav">
        <h1 className="mb-4 text-xl font-bold text-foreground">Natijalar</h1>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((result) => (
              <Link key={result.id} href={`/results/${result.id}`}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all active:bg-muted">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${getScoreColor(result.score)}`}
                  >
                    <span className="text-lg font-bold">{result.score}%</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-foreground">{result.testTitle}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        {result.correctAnswers}/{result.totalQuestions}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(result.timeTaken)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(result.completedAt)}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FileX className="mb-4 h-14 w-14 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium text-foreground">Natijalar yo'q</p>
            <p className="mb-4 text-sm text-muted-foreground">Birinchi testingizni yeching!</p>
            <Link href="/tests">
              <button className="touch-target rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground active:bg-primary/90">
                Testlarni ko'rish
              </button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
