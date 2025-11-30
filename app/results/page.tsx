"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Clock, Calendar, ChevronRight, FileX, History } from "lucide-react"
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
    if (score >= 80) return "bg-success/20 text-success border-success/30"
    if (score >= 60) return "bg-warning/20 text-warning border-warning/30"
    return "bg-destructive/20 text-destructive border-destructive/30"
  }

  const getScoreBadgeBg = (score: number) => {
    if (score >= 80) return "bg-gradient-to-br from-success to-success/50"
    if (score >= 60) return "bg-gradient-to-br from-warning to-warning/50"
    return "bg-gradient-to-br from-destructive to-destructive/50"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 pb-nav">
        <div className="mb-6 flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Natijalar</h1>
        </div>

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((result) => (
              <Link key={result.id} href={`/results/${result.id}`}>
                <div
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all active:scale-95 ${getScoreColor(result.score)}`}
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${getScoreBadgeBg(result.score)} font-bold text-white shadow-md`}
                  >
                    <span className="text-lg">{result.score}%</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold text-foreground text-base">{result.testTitle}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" />
                        {result.correctAnswers}/{result.totalQuestions}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTime(result.timeTaken)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
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
          <div className="flex flex-col items-center justify-center py-20">
            <FileX className="mb-4 h-20 w-20 text-muted-foreground/40" />
            <p className="mb-2 text-lg font-bold text-foreground">Natijalar yo'q</p>
            <p className="mb-6 text-sm text-muted-foreground">Birinchi testingizni yeching!</p>
            <Link href="/tests">
              <button className="touch-target rounded-lg gradient-primary px-8 py-3 font-bold text-primary-foreground active:opacity-90">
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
