"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Target, Clock, TrendingUp, ArrowRight, Zap } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { CategoryCard } from "@/components/category-card"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { testCategories, sampleTests, getTestResults, type TestResult } from "@/lib/test-data"

export default function HomePage() {
  const [results, setResults] = useState<TestResult[]>([])

  useEffect(() => {
    setResults(getTestResults())
  }, [])

  const totalTests = results.length
  const averageScore = totalTests > 0 ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / totalTests) : 0
  const totalTime = results.reduce((acc, r) => acc + r.timeTaken, 0)
  const totalMinutes = Math.round(totalTime / 60)

  const getCategoryTestCount = (categoryId: string) => {
    return sampleTests.filter((t) => t.category === categoryId).length
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-6 pb-nav">
        <section className="mb-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-6 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            <span className="gradient-primary bg-clip-text text-transparent">NUr</span>
            <span className="text-foreground">Test</span>
          </h1>
          <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground leading-relaxed">
            Bilimingizni sinab ko'ring! Turli fanlar bo'yicha testlarni yeching va o'z natijalaringizni kuzating.
          </p>
          <Link href="/tests">
            <Button
              size="lg"
              className="touch-target gap-2 gradient-primary text-primary-foreground font-semibold h-12"
            >
              Testlarni boshlash
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </section>

        {/* Stats Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">Statistika</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatsCard
              title="Yechilgan"
              value={totalTests}
              icon={<Target className="h-6 w-6 text-primary-foreground" />}
              color="bg-gradient-to-br from-primary to-secondary"
            />
            <StatsCard
              title="O'rtacha ball"
              value={`${averageScore}%`}
              icon={<Trophy className="h-6 w-6 text-success-foreground" />}
              color="bg-gradient-to-br from-success to-accent"
            />
            <StatsCard
              title="Vaqt sarflangan"
              value={totalMinutes}
              subtitle="daqiqa"
              icon={<Clock className="h-6 w-6 text-primary-foreground" />}
              color="bg-gradient-to-br from-primary to-blue-600"
            />
            <StatsCard
              title="Mavjud testlar"
              value={sampleTests.length}
              subtitle="test"
              icon={<TrendingUp className="h-6 w-6 text-warning-foreground" />}
              color="bg-gradient-to-br from-warning to-amber-600"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Fanlar
            </h2>
            <Link href="/tests" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Hammasi →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {testCategories.map((category) => (
              <CategoryCard key={category.id} {...category} testCount={getCategoryTestCount(category.id)} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
