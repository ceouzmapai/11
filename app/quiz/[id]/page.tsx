"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { QuizComponent } from "@/components/quiz-component"
import { Button } from "@/components/ui/button"
import { getTestById, type Test } from "@/lib/test-data"

export default function QuizPage() {
  const params = useParams()
  const id = params.id as string
  const [test, setTest] = useState<Test | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundTest = getTestById(id)
    setTest(foundTest || null)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="animate-pulse">
            <div className="mb-6 h-8 w-48 rounded bg-muted"></div>
            <div className="h-64 rounded-xl bg-muted"></div>
          </div>
        </main>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-3xl px-4 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <p className="mb-4 text-lg font-medium text-foreground">Test topilmadi</p>
            <Link href="/tests">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
                Testlarga qaytish
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 py-8">
        <QuizComponent test={test} />
      </main>
    </div>
  )
}
