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
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-foreground truncate">{test.title}</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Savol {currentQuestion + 1} / {test.questions.length}
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono font-bold whitespace-nowrap ${
            isTimeWarning
              ? "bg-gradient-to-br from-destructive/20 to-destructive/10 text-destructive border border-destructive/30"
              : "bg-gradient-to-br from-primary/10 to-primary/5 text-primary border border-primary/20"
          }`}
        >
          <Clock className={`h-5 w-5 ${isTimeWarning ? "animate-pulse" : ""}`} />
          <span className="text-sm">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-medium">Jarayon</span>
          <span className="text-foreground font-semibold">
            {answeredCount} / {test.questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>

      <div className="mb-5 flex gap-1 overflow-x-auto pb-2 hide-scrollbar">
        {test.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => goToQuestion(index)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all touch-target ${
              index === currentQuestion
                ? "gradient-primary text-primary-foreground scale-110 shadow-lg"
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
      <div className="mb-5 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-5 text-base font-semibold text-foreground leading-relaxed">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`flex w-full touch-target items-start gap-3 rounded-lg border-2 p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 text-foreground"
                    : "border-border bg-card text-foreground active:border-primary/50 active:bg-primary/5"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-bold text-sm transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 pt-0.5 text-sm font-medium leading-relaxed">{option}</span>
                {isSelected && <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="h-12 touch-target gap-2 flex-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden xs:inline">Oldingi</span>
        </Button>

        {currentQuestion === test.questions.length - 1 ? (
          <Button
            onClick={() => setShowConfirmModal(true)}
            disabled={isSubmitting}
            className="h-12 touch-target gap-2 flex-1 gradient-success text-success-foreground active:opacity-90"
          >
            <Check className="h-4 w-4" />
            <span className="hidden xs:inline">Yakunlash</span>
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestion((prev) => Math.min(test.questions.length - 1, prev + 1))}
            className="h-12 touch-target gap-2 flex-1"
          >
            <span className="hidden xs:inline">Keyingi</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/60 backdrop-blur-sm p-4 safe-area-bottom">
          <div className="w-full max-w-sm rounded-t-2xl border border-border bg-card p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-danger text-warning-foreground">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Testni yakunlash</h3>
            </div>

            <div className="mb-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{answeredCount}</span> ta savolga javob berildi
              </p>
              {answeredCount < test.questions.length && (
                <p className="text-sm text-warning font-medium">
                  {test.questions.length - answeredCount} ta savol javobsiz!
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
                className="h-12 flex-1 touch-target text-base font-semibold"
              >
                Bekor
              </Button>
              <Button
                onClick={submitTest}
                disabled={isSubmitting}
                className="h-12 flex-1 touch-target text-base font-semibold gradient-success text-success-foreground active:opacity-90"
              >
                Tasdiqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
