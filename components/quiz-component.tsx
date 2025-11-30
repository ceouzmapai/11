"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Clock, ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Test, TestResult } from "@/lib/test-data"
import { saveTestResult } from "@/lib/test-data"

interface QuizComponentProps {
  test: Test
}

export function QuizComponent({ test }: QuizComponentProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(test.questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(test.duration * 60)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const submitTest = useCallback(() => {
    setIsSubmitting(true)

    const answers = test.questions.map((q, index) => ({
      questionId: q.id,
      selectedAnswer: selectedAnswers[index] ?? -1,
      isCorrect: selectedAnswers[index] === q.correctAnswer,
    }))

    const correctAnswers = answers.filter((a) => a.isCorrect).length
    const score = Math.round((correctAnswers / test.questions.length) * 100)
    const timeTaken = test.duration * 60 - timeLeft

    const result: TestResult = {
      id: `result-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      score,
      totalQuestions: test.questions.length,
      correctAnswers,
      timeTaken,
      completedAt: new Date().toISOString(),
      answers,
    }

    saveTestResult(result)
    router.push(`/results/${result.id}`)
  }, [test, selectedAnswers, timeLeft, router])

  useEffect(() => {
    if (timeLeft <= 0) {
      submitTest()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, submitTest])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index)
  }

  const answeredCount = selectedAnswers.filter((a) => a !== null).length
  const progress = (answeredCount / test.questions.length) * 100
  const question = test.questions[currentQuestion]
  const isTimeWarning = timeLeft < 60

  return (
    <div className="mx-auto max-w-2xl px-4 py-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">{test.title}</h1>
          <p className="text-xs text-muted-foreground">
            {currentQuestion + 1} / {test.questions.length}
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 ${
            isTimeWarning ? "bg-destructive/20 text-destructive" : "bg-muted"
          }`}
        >
          <Clock className={`h-4 w-4 ${isTimeWarning ? "animate-pulse" : ""}`} />
          <span className="font-mono text-base font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Jarayon</span>
          <span className="text-foreground">
            {answeredCount} / {test.questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Navigation Pills - horizontal scroll */}
      <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2 hide-scrollbar">
        {test.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToQuestion(index)}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
              index === currentQuestion
                ? "bg-primary text-primary-foreground"
                : selectedAnswers[index] !== null
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground active:bg-muted/80"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="mb-4 rounded-xl border border-border bg-card p-4">
        <h2 className="mb-4 text-base font-medium text-foreground">{question.question}</h2>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`flex w-full touch-target items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-muted/50 text-foreground active:border-primary/50 active:bg-muted"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm">{option}</span>
              {selectedAnswers[currentQuestion] === index && (
                <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="h-11 touch-target gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" />
          Oldingi
        </Button>

        {currentQuestion === test.questions.length - 1 ? (
          <Button
            onClick={() => setShowConfirmModal(true)}
            disabled={isSubmitting}
            className="h-11 touch-target gap-1.5 bg-accent text-accent-foreground active:bg-accent/90"
          >
            Yakunlash
            <Check className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestion((prev) => Math.min(test.questions.length - 1, prev + 1))}
            className="h-11 touch-target gap-1.5"
          >
            Keyingi
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Testni yakunlash</h3>
            </div>

            <p className="mb-2 text-sm text-muted-foreground">
              {answeredCount} ta savolga javob berildi ({test.questions.length} tadan).
            </p>
            {answeredCount < test.questions.length && (
              <p className="mb-4 text-xs text-warning">{test.questions.length - answeredCount} ta savol javobsiz!</p>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowConfirmModal(false)} className="h-11 flex-1 touch-target">
                Bekor
              </Button>
              <Button
                onClick={submitTest}
                disabled={isSubmitting}
                className="h-11 flex-1 touch-target bg-accent text-accent-foreground active:bg-accent/90"
              >
                Yakunlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
