"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Trophy, Target, Clock, Star, ChevronRight, Trash2, Info } from "lucide-react"
import { getTestResults, clearTestResults, type TestResult } from "@/lib/test-data"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [showClearModal, setShowClearModal] = useState(false)

  useEffect(() => {
    setResults(getTestResults())
  }, [])

  const totalTests = results.length
  const averageScore = totalTests > 0 ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / totalTests) : 0
  const totalTime = results.reduce((acc, r) => acc + r.timeTaken, 0)
  const totalMinutes = Math.round(totalTime / 60)
  const bestScore = totalTests > 0 ? Math.max(...results.map((r) => r.score)) : 0

  const handleClearResults = () => {
    clearTestResults()
    setResults([])
    setShowClearModal(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 pb-nav">
        {/* Profile Header */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <span className="text-3xl font-bold text-primary-foreground">{totalTests > 0 ? averageScore : "?"}</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Foydalanuvchi</h1>
          <p className="text-sm text-muted-foreground">
            {totalTests > 0 ? `${totalTests} ta test yechilgan` : "Hali test yechilmagan"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalTests}</p>
            <p className="text-xs text-muted-foreground">Jami testlar</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <Trophy className="h-5 w-5 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
            <p className="text-xs text-muted-foreground">O'rtacha ball</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{totalMinutes}</p>
            <p className="text-xs text-muted-foreground">Daqiqa sarflangan</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-foreground">{bestScore}%</p>
            <p className="text-xs text-muted-foreground">Eng yaxshi natija</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors active:bg-muted">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Ilova haqida</p>
              <p className="text-xs text-muted-foreground">Versiya 1.0.0</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowClearModal(true)}
            className="flex w-full items-center gap-3 rounded-xl border border-destructive/30 bg-card p-4 text-left transition-colors active:bg-destructive/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/20">
              <Trash2 className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-destructive">Ma'lumotlarni tozalash</p>
              <p className="text-xs text-muted-foreground">Barcha natijalarni o'chirish</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </main>

      <BottomNav />

      {/* Clear Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5">
            <h3 className="mb-2 text-lg font-semibold text-foreground">Ma'lumotlarni o'chirish</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Barcha test natijalari o'chiriladi. Bu amalni qaytarib bo'lmaydi.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowClearModal(false)} className="flex-1">
                Bekor qilish
              </Button>
              <Button variant="destructive" onClick={handleClearResults} className="flex-1">
                O'chirish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
