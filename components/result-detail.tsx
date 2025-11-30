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
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "gradient-success"
    if (score >= 60) return "bg-warning/20"
    return "bg-destructive/20"
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "A'lo natija!"
    if (score >= 80) return "Yaxshi natija!"
    if (score >= 60) return "Qoniqarli"
    if (score >= 40) return "O'rtacha"
    return "Ko'proq mashq qiling"
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-nav">
      <Link
        href="/results"
        className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Natijalarga qaytish</span>
      </Link>

      {/* Result Header Card */}
      <div className="mb-8 rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-6 text-center shadow-sm">
        <div
          className={`mb-5 inline-flex h-24 w-24 items-center justify-center rounded-full ${getScoreBg(result.score)} border-2 border-border`}
        >
          <Trophy className={`h-12 w-12 ${getScoreColor(result.score)}`} />
        </div>

        <h1 className="mb-2 text-xl font-bold text-foreground">{result.testTitle}</h1>
        <p className={`mb-4 text-lg font-bold ${getScoreColor(result.score)}`}>{getScoreMessage(result.score)}</p>

        <div className="mb-6">
          <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>{result.score}%</div>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{result.correctAnswers}</span> / {result.totalQuestions}{" "}
            to'g'ri javob
          </p>
        </div>

        <Progress value={result.score} className="mx-auto mb-6 h-2" />

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-success/10 p-3">
            <div className="flex items-center justify-center gap-1.5 text-success mb-1">
              <Check className="h-4 w-4" />
              <span className="text-xl font-bold">{result.correctAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">To'g'ri</p>
          </div>
          <div className="rounded-lg bg-destructive/10 p-3">
            <div className="flex items-center justify-center gap-1.5 text-destructive mb-1">
              <X className="h-4 w-4" />
              <span className="text-xl font-bold">{result.totalQuestions - result.correctAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">Noto'g'ri</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xl font-bold">{formatTime(result.timeTaken)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Vaqt</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link href={`/quiz/${result.testId}`} className="flex-1 sm:flex-none">
          <Button className="h-12 w-full touch-target gap-2 gradient-primary text-primary-foreground font-semibold">
            <RotateCcw className="h-4 w-4" />
            Qayta yechish
          </Button>
        </Link>
        <Link href="/tests" className="flex-1 sm:flex-none">
          <Button variant="outline" className="h-12 w-full touch-target gap-2 bg-transparent">
            <Target className="h-4 w-4" />
            Boshqa testlar
          </Button>
        </Link>
      </div>

      {/* Detailed Answers */}
      {test && (
        <div className="rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-foreground">Batafsil natijalar</h2>

          <div className="space-y-4">
            {test.questions.map((question, index) => {
              const answer = result.answers[index]
              const isCorrect = answer?.isCorrect
              const selectedOption = answer?.selectedAnswer

              return (
                <div
                  key={question.id}
                  className={`rounded-lg border-2 p-4 ${
                    isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
                  }`}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                        isCorrect ? "bg-success" : "bg-destructive"
                      }`}
                    >
                      {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </span>
                    <p className="flex-1 font-medium text-foreground leading-relaxed">
                      {index + 1}. {question.question}
                    </p>
                  </div>

                  <div className="ml-10 space-y-2">
                    {question.options.map((option, optIndex) => {
                      const isSelected = selectedOption === optIndex
                      const isCorrectAnswer = question.correctAnswer === optIndex

                      let bgClass = "bg-muted/30 text-foreground"
                      if (isCorrectAnswer) bgClass = "bg-success/20 text-foreground border-success/50"
                      else if (isSelected && !isCorrect)
                        bgClass = "bg-destructive/20 text-foreground border-destructive/50"

                      return (
                        <div
                          key={optIndex}
                          className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${bgClass}`}
                        >
                          <span className="font-bold text-muted-foreground">{String.fromCharCode(65 + optIndex)}.</span>
                          <span className="flex-1">{option}</span>
                          {isCorrectAnswer && <Check className="h-4 w-4 shrink-0 text-success" />}
                          {isSelected && !isCorrect && <X className="h-4 w-4 shrink-0 text-destructive" />}
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
