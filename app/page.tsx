"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trophy, Target, Clock, TrendingUp, ArrowRight } from "lucide-react"
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
        {/* Hero Section */}
        <section className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            <span className="text-primary">NUr</span>Test
          </h1>
          <p className="mx-auto mb-6 max-w-md text-sm text-muted-foreground">
            Bilimingizni sinab ko'ring! Turli fanlar bo'yicha testlarni yeching va o'z natijalaringizni kuzating.
          </p>
          <Link href="/tests">
            <Button size="lg" className="touch-target gap-2">
              Testlarni boshlash
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>

        {/* Stats Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Statistika</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatsCard
              title="Yechilgan"
              value={totalTests}
              icon={<Target className="h-5 w-5 text-primary-foreground" />}
              color="bg-primary"
            />
            <StatsCard
              title="O'rtacha ball"
              value={`${averageScore}%`}
              icon={<Trophy className="h-5 w-5 text-accent-foreground" />}
              color="bg-accent"
            />
            <StatsCard
              title="Vaqt"
              value={`${totalMinutes}`}
              subtitle="daqiqa"
              icon={<Clock className="h-5 w-5 text-blue-100" />}
              color="bg-blue-600"
            />
            <StatsCard
              title="Mavjud"
              value={sampleTests.length}
              subtitle="test"
              icon={<TrendingUp className="h-5 w-5 text-amber-100" />}
              color="bg-amber-600"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Fanlar</h2>
            <Link href="/tests" className="text-sm text-primary hover:underline">
              Hammasi
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
