"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Check, X, Clock, Trophy, Target, ArrowLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { TestResult, Test } from "@/lib/test-data"
import { getTestResults, getTestById } from "@/lib/test-data"

interface ResultDetailProps {
  resultId: string
}

export function ResultDetail({ resultId }: ResultDetailProps) {
  const [result, setResult] = useState<TestResult | null>(null)
  const [test, setTest] = useState<Test | null>(null)

  useEffect(() => {
    const results = getTestResults()
    const foundResult = results.find((r) => r.id === resultId)
    if (foundResult) {
      setResult(foundResult)
      const foundTest = getTestById(foundResult.testId)
      if (foundTest) {
        setTest(foundTest)
      }
    }
  }, [resultId])

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Natija topilmadi</p>
        <Link href="/results">
          <Button variant="outline" className="mt-4 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Natijalarga qaytish
          </Button>
        </Link>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} daqiqa ${secs} soniya`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "A'lo natija!"
    if (score >= 80) return "Yaxshi natija!"
    if (score >= 60) return "Qoniqarli"
    if (score >= 40) return "O'rtacha"
    return "Ko'proq mashq qiling"
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back Button */}
      <Link href="/results" className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Natijalarga qaytish
      </Link>

      {/* Result Header */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
          <Trophy className={`h-10 w-10 ${getScoreColor(result.score)}`} />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground">{result.testTitle}</h1>
        <p className={`mb-4 text-lg font-medium ${getScoreColor(result.score)}`}>{getScoreMessage(result.score)}</p>

        <div className="mb-6">
          <div className={`text-5xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</div>
          <p className="text-muted-foreground">
            {result.correctAnswers} / {result.totalQuestions} to'g'ri javob
          </p>
        </div>

        <Progress value={result.score} className="mx-auto mb-6 h-3 max-w-md" />

        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Check className="h-5 w-5" />
              <span className="text-2xl font-bold">{result.correctAnswers}</span>
            </div>
            <p className="text-sm text-muted-foreground">To'g'ri</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <X className="h-5 w-5" />
              <span className="text-2xl font-bold">{result.totalQuestions - result.correctAnswers}</span>
            </div>
            <p className="text-sm text-muted-foreground">Noto'g'ri</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <Clock className="h-5 w-5" />
              <span className="text-2xl font-bold">{Math.floor(result.timeTaken / 60)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Daqiqa</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        <Link href={`/quiz/${result.testId}`}>
          <Button className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Qayta yechish
          </Button>
        </Link>
        <Link href="/tests">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Target className="h-4 w-4" />
            Boshqa testlar
          </Button>
        </Link>
      </div>

      {/* Detailed Answers */}
      {test && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Batafsil natijalar</h2>

          <div className="space-y-4">
            {test.questions.map((question, index) => {
              const answer = result.answers[index]
              const isCorrect = answer?.isCorrect
              const selectedOption = answer?.selectedAnswer

              return (
                <div
                  key={question.id}
                  className={`rounded-lg border p-4 ${
                    isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
                  }`}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {index + 1}. {question.question}
                      </p>
                    </div>
                  </div>

                  <div className="ml-9 space-y-2">
                    {question.options.map((option, optIndex) => {
                      const isSelected = selectedOption === optIndex
                      const isCorrectAnswer = question.correctAnswer === optIndex

                      let bgClass = "bg-muted/50"
                      if (isCorrectAnswer) bgClass = "bg-green-500/20 text-green-400"
                      else if (isSelected && !isCorrect) bgClass = "bg-red-500/20 text-red-400"

                      return (
                        <div key={optIndex} className={`flex items-center gap-2 rounded-lg p-2 text-sm ${bgClass}`}>
                          <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                          <span>{option}</span>
                          {isCorrectAnswer && <Check className="ml-auto h-4 w-4 text-green-400" />}
                          {isSelected && !isCorrect && <X className="ml-auto h-4 w-4 text-red-400" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
