"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Brain, 
  Clock, 
  Trophy, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  ArrowLeft,
  Target,
  Zap,
  Award,
  RotateCcw,
  AlertTriangle
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import api from "@/lib/api"

interface QuizQuestion {
  id: string
  question: string
  options: Array<{
    text: string
    isCorrect: boolean
  }>
  explanation: string
  points: number
}

interface Quiz {
  _id: string
  title: string
  description: string
  course: string
  difficulty: string
  timeLimit: number
  passingScore: number
  xpReward: number
  questions: QuizQuestion[]
  maxAttempts: number
}

interface QuizAttempt {
  attemptNumber: number
  score: number
  passed: boolean
  timeSpent: number
  completedAt: string
}

export default function QuizPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    score: number
    passed: boolean
    correctAnswers: number
    totalQuestions: number
    timeSpent: number
    feedback: string[]
  } | null>(null)
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true)
        
        // Fetch quiz for this course
        const quizResponse = await api.quiz.getQuizzes({ courseId: courseId as string })
        if (quizResponse.success && quizResponse.data.length > 0) {
          setQuiz(quizResponse.data[0]) // Take first quiz for the course
          setTimeLeft(quizResponse.data[0].timeLimit * 60) // Convert to seconds
        }

        // Fetch user's previous attempts
        // const attemptsResponse = await api.quiz.getUserAttempts(quiz._id, "1")
        // if (attemptsResponse.success) {
        //   setAttempts(attemptsResponse.data)
        // }
      } catch (error) {
        console.error("Error fetching quiz:", error)
        // Use sample data as fallback
        setSampleQuiz()
      } finally {
        setLoading(false)
      }
    }

    const setSampleQuiz = () => {
      const sampleQuiz: Quiz = {
        _id: "1",
        title: "Data Structures & Algorithms Quiz",
        description: "Test your understanding of fundamental DSA concepts",
        course: courseId as string,
        difficulty: "intermediate",
        timeLimit: 15,
        passingScore: 75,
        xpReward: 200,
        maxAttempts: 3,
        questions: [
          {
            id: "1",
            question: "What is the time complexity of searching in a balanced binary search tree?",
            options: [
              { text: "O(1)", isCorrect: false },
              { text: "O(log n)", isCorrect: true },
              { text: "O(n)", isCorrect: false },
              { text: "O(n²)", isCorrect: false }
            ],
            explanation: "In a balanced BST, the height is log n, so search operations take O(log n) time.",
            points: 1
          },
          {
            id: "2",
            question: "Which data structure uses LIFO (Last In, First Out) principle?",
            options: [
              { text: "Queue", isCorrect: false },
              { text: "Stack", isCorrect: true },
              { text: "Array", isCorrect: false },
              { text: "Linked List", isCorrect: false }
            ],
            explanation: "Stack follows LIFO principle - the last element added is the first one to be removed.",
            points: 1
          },
          {
            id: "3",
            question: "What is the space complexity of merge sort?",
            options: [
              { text: "O(1)", isCorrect: false },
              { text: "O(log n)", isCorrect: false },
              { text: "O(n)", isCorrect: true },
              { text: "O(n²)", isCorrect: false }
            ],
            explanation: "Merge sort requires O(n) extra space for the temporary arrays used during merging.",
            points: 1
          },
          {
            id: "4",
            question: "Which algorithm is best for finding the shortest path in a weighted graph?",
            options: [
              { text: "BFS", isCorrect: false },
              { text: "DFS", isCorrect: false },
              { text: "Dijkstra's Algorithm", isCorrect: true },
              { text: "Binary Search", isCorrect: false }
            ],
            explanation: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.",
            points: 1
          }
        ]
      }
      setQuiz(sampleQuiz)
      setTimeLeft(sampleQuiz.timeLimit * 60)
    }

    if (courseId) {
      fetchQuizData()
    }
  }, [courseId])

  // Timer effect
  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && quizStarted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizStarted, quizCompleted])

  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setShowResults(false)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    if (!quiz) return

    setQuizCompleted(true)
    
    // Calculate results
    let correctAnswers = 0
    const totalQuestions = quiz.questions.length
    const feedback: string[] = []

    quiz.questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index]
      if (selectedAnswer !== undefined && question.options[selectedAnswer]?.isCorrect) {
        correctAnswers++
      } else {
        feedback.push(`Question ${index + 1}: ${question.explanation}`)
      }
    })

    const score = Math.round((correctAnswers / totalQuestions) * 100)
    const passed = score >= quiz.passingScore
    const timeSpent = (quiz.timeLimit * 60) - timeLeft

    const quizResults = {
      score,
      passed,
      correctAnswers,
      totalQuestions,
      timeSpent,
      feedback
    }

    setResults(quizResults)
    setShowResults(true)

    // Add to attempts
    const newAttempt: QuizAttempt = {
      attemptNumber: attempts.length + 1,
      score,
      passed,
      timeSpent: Math.floor(timeSpent / 60),
      completedAt: new Date().toISOString()
    }
    setAttempts([...attempts, newAttempt])
  }

  const handleRetakeQuiz = () => {
    if (attempts.length >= (quiz?.maxAttempts || 3)) {
      return // Max attempts reached
    }
    
    setQuizStarted(false)
    setQuizCompleted(false)
    setShowResults(false)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTimeLeft((quiz?.timeLimit || 15) * 60)
  }

  const handleProceedToNextLesson = () => {
    // Navigate to next lesson or course completion page
    router.push(`/course/${courseId}/complete`)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quiz Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">No quiz available for this course.</p>
            <Button onClick={() => router.push(`/course/${courseId}`)}>Back to Course</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {!quizStarted ? (
          // Quiz Start Screen
          <div className="max-w-2xl mx-auto">
            <Card className="neo-brutal">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Brain className="w-16 h-16 text-purple-600" />
                </div>
                <CardTitle className="text-3xl font-black">{quiz.title}</CardTitle>
                <CardDescription className="text-lg">{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quiz Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">{quiz.timeLimit} minutes</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Time Limit</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">{quiz.passingScore}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Passing Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                    <div className="font-semibold">{quiz.questions.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">{quiz.xpReward} XP</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reward</div>
                  </div>
                </div>

                {/* Previous Attempts */}
                {attempts.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Previous Attempts</h3>
                    <div className="space-y-2">
                      {attempts.map((attempt, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3">
                            {attempt.passed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <span className="font-medium">Attempt {attempt.attemptNumber}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={attempt.passed ? "text-green-600" : "text-red-600"}>
                              {attempt.score}%
                            </span>
                            <span className="text-gray-500">{attempt.timeSpent}m</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Start Quiz Button */}
                {attempts.length < quiz.maxAttempts ? (
                  <Button onClick={startQuiz} className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                    <Brain className="w-4 h-4 mr-2" />
                    {attempts.length > 0 ? "Retake Quiz" : "Start Quiz"}
                  </Button>
                ) : (
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-red-600 font-medium">Maximum attempts reached</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      You have used all {quiz.maxAttempts} attempts for this quiz
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : showResults ? (
          // Results Screen
          <div className="max-w-2xl mx-auto">
            <Card className="neo-brutal">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {results?.passed ? (
                    <Trophy className="w-16 h-16 text-yellow-500" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500" />
                  )}
                </div>
                <CardTitle className="text-3xl font-black">
                  {results?.passed ? "Congratulations! 🎉" : "Keep Trying! 💪"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {results?.passed 
                    ? "You passed the quiz and can proceed to the next lesson!"
                    : "You need 75% to pass. Review the material and try again."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Display */}
                <div className="text-center">
                  <div className={`text-6xl font-black mb-2 ${results?.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {results?.score}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {results?.correctAnswers} out of {results?.totalQuestions} correct
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">{formatTime(results?.timeSpent || 0)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Time Taken</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">{quiz.passingScore}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Required</div>
                  </div>
                </div>

                {/* Feedback */}
                {results?.feedback && results.feedback.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Review These Topics:</h3>
                    <div className="space-y-2">
                      {results.feedback.map((feedback, index) => (
                        <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">
                          {feedback}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {results?.passed ? (
                    <Button onClick={handleProceedToNextLesson} className="flex-1 bg-green-600 hover:bg-green-700">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Continue to Next Lesson
                    </Button>
                  ) : (
                    <>
                      {attempts.length < quiz.maxAttempts && (
                        <Button onClick={handleRetakeQuiz} className="flex-1" variant="outline">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Retake Quiz
                        </Button>
                      )}
                      <Button onClick={() => router.push(`/course/${courseId}`)} className="flex-1">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Review Course
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Quiz Questions
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <Card className="neo-brutal mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-bold">{quiz.title}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Question {currentQuestion + 1} of {quiz.questions.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTime(timeLeft)}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {quiz.passingScore}% to pass
                    </Badge>
                  </div>
                </div>
                <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card className="neo-brutal">
              <CardHeader>
                <CardTitle className="text-xl">
                  {quiz.questions[currentQuestion]?.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Answer Options */}
                <RadioGroup
                  value={selectedAnswers[currentQuestion]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
                >
                  {quiz.questions[currentQuestion]?.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
                  </div>

                  {currentQuestion === quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Submit Quiz
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswers[currentQuestion] === undefined}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question Overview */}
            <Card className="neo-brutal mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Question Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {quiz.questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === currentQuestion ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentQuestion(index)}
                      className={`relative ${
                        selectedAnswers[index] !== undefined 
                          ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-300" 
                          : ""
                      }`}
                    >
                      {index + 1}
                      {selectedAnswers[index] !== undefined && (
                        <CheckCircle className="w-3 h-3 absolute -top-1 -right-1 text-green-600" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
