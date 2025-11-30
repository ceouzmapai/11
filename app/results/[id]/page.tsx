"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { ResultDetail } from "@/components/result-detail"

export default function ResultDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 py-8">
        <ResultDetail resultId={resolvedParams.id} />
      </main>
    </div>
  )
}
