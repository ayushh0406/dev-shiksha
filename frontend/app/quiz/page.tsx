"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, Clock, Zap, Star, RotateCcw, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"

const quizQuestions = [
  {
    id: 1,
    question: "What is the time complexity of Bubble Sort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    correct: 2,
    explanation:
      "Bubble Sort has O(n²) time complexity in the worst case because it uses nested loops to compare and swap elements.",
  },
  {
    id: 2,
    question: "In Bubble Sort, what happens in each pass?",
    options: [
      "The smallest element moves to the beginning",
      "The largest element moves to its correct position",
      "All elements are sorted",
      "Nothing significant happens",
    ],
    correct: 1,
    explanation:
      "In each pass of Bubble Sort, the largest unsorted element 'bubbles up' to its correct position at the end of the array.",
  },
  {
    id: 3,
    question: "What is the space complexity of Bubble Sort?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 3,
    explanation:
      "Bubble Sort has O(1) space complexity because it sorts the array in-place, using only a constant amount of extra memory.",
  },
  {
    id: 4,
    question: "When is Bubble Sort most efficient?",
    options: [
      "When the array is reverse sorted",
      "When the array is already sorted",
      "When the array has duplicate elements",
      "Bubble Sort is never efficient",
    ],
    correct: 1,
    explanation:
      "Bubble Sort performs best on already sorted arrays, where it can complete in O(n) time with an optimized version that detects when no swaps are needed.",
  },
  {
    id: 5,
    question: "How many swaps are needed to sort [3, 1, 2] using Bubble Sort?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    explanation:
      "To sort [3, 1, 2]: First pass swaps 3 and 1 to get [1, 3, 2], then swaps 3 and 2 to get [1, 2, 3]. Total: 2 swaps.",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleQuizComplete()
    }
  }, [timeLeft, quizCompleted])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (selectedAnswer === quizQuestions[currentQuestion].correct) {
        setScore(score + 1)
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        handleQuizComplete()
      }
    }
  }

  const handleShowResult = () => {
    setShowResult(true)
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setTimeLeft(300)
    setQuizCompleted(false)
    setAnswers([])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return "text-green-500"
    if (percentage >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getStarRating = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 90) return 3
    if (percentage >= 70) return 2
    if (percentage >= 50) return 1
    return 0
  }

  if (quizCompleted) {
    const stars = getStarRating()
    const xpEarned = score * 20

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-card neo-brutal animate-bounce-slow">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full quest-gradient flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-black">Quiz Complete!</CardTitle>
                <CardDescription className="text-lg">Great job on completing the Bubble Sort quiz!</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`text-6xl font-black ${getScoreColor()}`}>
                    {score}/{quizQuestions.length}
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                    {Math.round((score / quizQuestions.length) * 100)}% Correct
                  </p>
                </div>

                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${i < stars ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-300">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold text-lg">+{xpEarned} XP Earned!</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="flex-1 rounded-2xl font-semibold py-6 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retry Quiz
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/timeline")}
                    className="flex-1 rounded-2xl font-semibold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Continue Learning
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="text-4xl animate-bounce-slow">
                  {stars === 3 ? "🎉" : stars === 2 ? "👏" : stars === 1 ? "👍" : "💪"}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Bubble Sort Quiz</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                Test your understanding of bubble sort algorithm
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-bold text-xl">{formatTime(timeLeft)}</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="glass-card neo-brutal mb-8">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Quiz Progress</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="glass-card neo-brutal">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{question.question}</CardTitle>
              <CardDescription>Choose the best answer from the options below</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Answer Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`w-full justify-start text-left p-6 rounded-2xl font-semibold transition-all ${
                      selectedAnswer === index
                        ? "quest-gradient neo-brutal text-white"
                        : "hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    } ${
                      showResult && index === question.correct
                        ? "bg-green-500 text-white border-green-500"
                        : showResult && selectedAnswer === index && index !== question.correct
                          ? "bg-red-500 text-white border-red-500"
                          : ""
                    }`}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                          selectedAnswer === index ? "border-white" : "border-current"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showResult && index === question.correct && <CheckCircle className="w-5 h-5 ml-auto" />}
                      {showResult && selectedAnswer === index && index !== question.correct && (
                        <X className="w-5 h-5 ml-auto" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>

              {/* Explanation */}
              {showResult && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explanation</h4>
                  <p className="text-blue-800 dark:text-blue-200">{question.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {!showResult ? (
                  <Button
                    onClick={handleShowResult}
                    disabled={selectedAnswer === null}
                    className="flex-1 rounded-2xl font-semibold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="flex-1 rounded-2xl font-semibold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
