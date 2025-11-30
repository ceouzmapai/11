"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { TestCard } from "@/components/test-card"
import { Input } from "@/components/ui/input"
import { testCategories, sampleTests } from "@/lib/test-data"

function TestsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  const filteredTests = sampleTests.filter((test) => {
    const matchesCategory = !selectedCategory || test.category === selectedCategory
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 pb-nav">
      <h1 className="mb-4 text-xl font-bold text-foreground">Testlar</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Test qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 pl-10"
        />
      </div>

      {/* Category Tabs - horizontal scroll on mobile */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`touch-target shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            !selectedCategory
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground active:bg-muted/80"
          }`}
        >
          Hammasi
        </button>
        {testCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`touch-target flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground active:bg-muted/80"
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Tests Grid */}
      {filteredTests.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredTests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <Filter className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-foreground">Testlar topilmadi</p>
          <p className="text-sm text-muted-foreground">Boshqa kategoriyani tanlang</p>
        </div>
      )}
    </main>
  )
}

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense
        fallback={
          <main className="mx-auto max-w-5xl px-4 py-6 pb-nav">
            <div className="animate-pulse">
              <div className="mb-4 h-7 w-24 rounded bg-muted"></div>
              <div className="mb-4 h-11 rounded bg-muted"></div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-40 rounded-xl bg-muted"></div>
                ))}
              </div>
            </div>
          </main>
        }
      >
        <TestsContent />
      </Suspense>
      <BottomNav />
    </div>
  )
}
