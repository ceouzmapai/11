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
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-6 text-center">
          <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-lg">
            <span className="text-4xl font-bold">{totalTests > 0 ? averageScore : "?"}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Foydalanuvchi</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {totalTests > 0 ? `${totalTests} ta test yechilgan` : "Hali test yechilmagan"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 shadow-sm">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalTests}</p>
            <p className="text-xs font-medium text-muted-foreground mt-1">Jami testlar</p>
          </div>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 shadow-sm">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/20">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">{averageScore}%</p>
            <p className="text-xs font-medium text-muted-foreground mt-1">O'rtacha ball</p>
          </div>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 shadow-sm">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalMinutes}</p>
            <p className="text-xs font-medium text-muted-foreground mt-1">Daqiqa sarflangan</p>
          </div>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 shadow-sm">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-warning/20">
              <Star className="h-6 w-6 text-warning" />
            </div>
            <p className="text-3xl font-bold text-foreground">{bestScore}%</p>
            <p className="text-xs font-medium text-muted-foreground mt-1">Eng yaxshi natija</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 text-left transition-all active:scale-95 hover:border-primary/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">Ilova haqida</p>
              <p className="text-xs text-muted-foreground mt-0.5">Versiya 1.0.0 | NUrTest</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowClearModal(true)}
            className="flex w-full items-center gap-4 rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4 text-left transition-all active:scale-95"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-destructive/20">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-destructive">Ma'lumotlarni tozalash</p>
              <p className="text-xs text-muted-foreground mt-0.5">Barcha natijalarni o'chirish</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </main>

      <BottomNav />

      {/* Clear Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/60 backdrop-blur-sm p-4 safe-area-bottom">
          <div className="w-full max-w-sm rounded-t-2xl border border-border bg-card p-6 animate-in slide-in-from-bottom-4 duration-300">
            <h3 className="mb-2 text-lg font-bold text-foreground">Ma'lumotlarni o'chirish</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Barcha test natijalari o'chiriladi. Bu amalni qaytarib bo'lmaydi.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowClearModal(false)}
                className="h-12 flex-1 touch-target font-bold"
              >
                Bekor qilish
              </Button>
              <Button
                onClick={handleClearResults}
                className="h-12 flex-1 touch-target bg-destructive text-destructive-foreground font-bold active:opacity-90"
              >
                O'chirish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
