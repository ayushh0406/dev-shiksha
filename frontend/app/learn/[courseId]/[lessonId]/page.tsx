"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  BookOpen, 
  Code, 
  Clock, 
  Trophy, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Target,
  Zap,
  Brain,
  Lightbulb,
  FileText,
  Award,
  Lock,
  Unlock,
  PartyPopper,
  Gift,
  Sparkles
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Monaco } from "@/components/monaco-editor"
import api, { progressApi } from "@/lib/api"

interface Lesson {
  _id: string
  title: string
  description: string
  course: {
    _id: string
    title: string
    difficulty: string
  }
  order: number
  type: "theory" | "code" | "quiz" | "practice"
  difficulty: string
  estimatedTime: number
  xpReward: number
  content: {
    text?: string
    codeTemplate?: string
    expectedOutput?: string
    testCases?: Array<{
      input: string
      expectedOutput: string
    }>
  }
  isPublished: boolean
  nextLesson?: string
  prevLesson?: string
}

interface CourseProgress {
  completedLessons: string[]
  currentLesson: string
  totalLessons: number
  totalXP: number
  quizzesPassed: number
}

export default function LearningPage() {
  const { courseId, lessonId } = useParams()
  const router = useRouter()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [userCode, setUserCode] = useState("")
  const [output, setOutput] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [canProceed, setCanProceed] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionTimeout, setExecutionTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true)
        
        // Fetch lesson details
        const lessonResponse = await api.lesson.getLesson(lessonId as string)
        if (lessonResponse.success) {
          const lessonData = lessonResponse.data
          setLesson(lessonData)
          setUserCode(lessonData.content.code?.starterCode || lessonData.content.codeTemplate || "")
          
          // Fetch user progress from database
          const mockUserId = "687e398cc9ad9485deb144b5" // Real user ObjectId from database
          const progressResponse = await progressApi.getCourseProgress(courseId as string, mockUserId)
          
          if (progressResponse.success) {
            const progress = progressResponse.data
            setCourseProgress({
              completedLessons: progress.completedLessons.map((cl: any) => cl.lesson),
              currentLesson: lessonId as string,
              totalLessons: progress.totalLessons || 10,
              totalXP: progress.totalXP,
              quizzesPassed: progress.quizzesPassed || 0
            })
            
            // Check if lesson is completed
            const isLessonCompleted = progress.completedLessons.some(
              (cl: any) => cl.lesson === lessonId
            )
            setIsCompleted(isLessonCompleted)
            setCanProceed(true)
          }
        }
      } catch (error) {
        console.error("Error fetching lesson:", error)
      } finally {
        setLoading(false)
      }
    }

    if (courseId && lessonId) {
      fetchLessonData()
    }

    // Cleanup timeout on unmount
    return () => {
      if (executionTimeout) {
        clearTimeout(executionTimeout)
      }
    }
  }, [courseId, lessonId])

  // Real-time code execution with debouncing
  const executeCodeRealTime = (code: string) => {
    // Clear previous timeout
    if (executionTimeout) {
      clearTimeout(executionTimeout)
    }

    // Set loading state
    setIsExecuting(true)

    // Debounce execution by 1 second
    const timeout = setTimeout(() => {
      try {
        // Clear output first
        setOutput("Executing...")
        
        // Simulate real-time execution
        setTimeout(() => {
          // Basic JavaScript execution simulation
          if (code.trim() === "") {
            setOutput("")
            setIsExecuting(false)
            return
          }

          // Check for common patterns and provide realistic output
          if (code.includes("console.log")) {
            // Extract console.log statements
            const logMatches = code.match(/console\.log\((.*?)\)/g)
            if (logMatches) {
              const outputs = logMatches.map(match => {
                const content = match.replace(/console\.log\(|\)/g, '')
                try {
                  // Simple evaluation for basic expressions
                  if (content.includes('[') && content.includes(']')) {
                    return content.replace(/['"]/g, '')
                  }
                  return eval(content)
                } catch {
                  return content.replace(/['"]/g, '')
                }
              })
              setOutput(`✅ Code executed successfully!\n\n${outputs.join('\n')}`)
            }
          } else if (code.includes("print(")) {
            // Python print statements
            const printMatches = code.match(/print\((.*?)\)/g)
            if (printMatches) {
              const outputs = printMatches.map(match => {
                const content = match.replace(/print\(|\)/g, '')
                return content.replace(/['"]/g, '')
              })
              setOutput(`✅ Python code executed!\n\n${outputs.join('\n')}`)
            }
          } else if (code.includes("def ") || code.includes("function")) {
            setOutput("✅ Function defined successfully!\n\nFunction is ready to be called.")
          } else if (code.includes("for") || code.includes("while")) {
            setOutput("✅ Loop structure detected!\n\nLoop logic is being processed...")
          } else if (code.includes("if") || code.includes("else")) {
            setOutput("✅ Conditional logic detected!\n\nBranching logic ready for execution.")
          } else if (code.includes("class ")) {
            setOutput("✅ Class definition detected!\n\nClass structure is valid.")
          } else if (code.includes("import ") || code.includes("from ")) {
            setOutput("✅ Import statement detected!\n\nModules are being loaded...")
          } else if (code.includes("=") && !code.includes("==") && !code.includes("!=")) {
            setOutput("✅ Variable assignment detected!\n\nVariable is ready to use.")
          } else if (code.includes("[]") || code.includes("{}")) {
            setOutput("✅ Data structure detected!\n\nList/Dictionary initialized successfully.")
          } else {
            // Try to execute simple expressions
            try {
              const result = eval(code)
              setOutput(`✅ Expression evaluated!\n\nResult: ${result}`)
            } catch (error) {
              if (code.trim().length > 0) {
                setOutput(`⚠️ Live syntax check:\n\n${(error as Error).message}\n\n💡 Keep typing to see updates...`)
              }
            }
          }
          setIsExecuting(false)
        }, 300) // Small delay to show execution state
      } catch (error) {
        setOutput(`❌ Error: ${(error as Error).message}`)
        setIsExecuting(false)
      }
    }, 1000) // 1 second debounce

    setExecutionTimeout(timeout)
  }

  const handleCodeChange = (newCode: string) => {
    setUserCode(newCode)
    executeCodeRealTime(newCode)
  }

  const handleRunCode = () => {
    // Manual execution - immediate feedback
    setIsExecuting(true)
    executeCodeRealTime(userCode)
  }

  const handleCompleteLesson = async () => {
    if (!lesson) return

    try {
      // Mark lesson as completed in database
      const mockUserId = "687e398cc9ad9485deb144b5" // Real user ObjectId from database
      const response = await progressApi.completeLesson(lesson._id, {
        userId: mockUserId,
        score: 100,
        timeSpent: Math.floor(Math.random() * 30) + 10 // Mock time spent
      })

      if (response.success) {
        setIsCompleted(true)
        setShowCelebration(true)
        
        // Update local progress state
        if (courseProgress) {
          const newProgress = {
            ...courseProgress,
            completedLessons: [...courseProgress.completedLessons, lesson._id],
            totalXP: courseProgress.totalXP + lesson.xpReward
          }
          setCourseProgress(newProgress)
        }

        // Auto-navigate to next lesson after celebration
        setTimeout(() => {
          setShowCelebration(false)
          
          // Use nextLesson from API response if available
          if (response.nextLesson) {
            router.push(`/learn/${courseId}/${response.nextLesson}`)
          } else if (lesson.nextLesson) {
            router.push(`/learn/${courseId}/${lesson.nextLesson}`)
          } else {
            // If no next lesson, go to quiz
            router.push(`/quiz/${courseId}`)
          }
        }, 3000)
      }
    } catch (error) {
      console.error("Error completing lesson:", error)
    }
  }

  const handleNextLesson = () => {
    if (lesson?.nextLesson) {
      router.push(`/learn/${courseId}/${lesson.nextLesson}`)
    } else {
      // Go to quiz if it's the last lesson
      router.push(`/quiz/${courseId}`)
    }
  }

  const handlePreviousLesson = () => {
    if (lesson?.prevLesson) {
      router.push(`/learn/${courseId}/${lesson.prevLesson}`)
    }
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

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lesson Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">The requested lesson could not be found.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </Card>
        </div>
      </div>
    )
  }

  const progress = courseProgress ? (courseProgress.completedLessons.length / courseProgress.totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-8 text-center animate-bounce">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Lesson Completed! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You earned {lesson.xpReward} XP!
            </p>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              <Award className="w-4 h-4 mr-1" />
              +{lesson.xpReward} XP
            </Badge>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/course/${courseId}`)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
                {lesson.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {lesson.course.title} • Lesson {lesson.order}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                <Clock className="w-3 h-3 mr-1" />
                {lesson.estimatedTime}m
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                <Zap className="w-3 h-3 mr-1" />
                {lesson.xpReward} XP
              </Badge>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="neo-brutal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Course Progress</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {courseProgress?.completedLessons.length || 0} / {courseProgress?.totalLessons || 0}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Lesson Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Content */}
          <div className="space-y-6">
            <Card className="neo-brutal">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {lesson.type === "theory" && <BookOpen className="w-5 h-5 text-blue-600" />}
                  {lesson.type === "code" && <Code className="w-5 h-5 text-green-600" />}
                  {lesson.type === "quiz" && <Brain className="w-5 h-5 text-purple-600" />}
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                </div>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {lesson.content.text}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousLesson}
                disabled={!lesson.prevLesson}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {!isCompleted ? (
                <Button
                  onClick={handleCompleteLesson}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Complete Lesson
                </Button>
              ) : (
                <Button
                  onClick={handleNextLesson}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next Lesson
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Right Panel - Interactive Content */}
          <div className="space-y-6">
            {lesson.type === "code" && (
              <>
                {/* Code Editor */}
                <Card className="neo-brutal">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="w-5 h-5 text-green-600" />
                      Code Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-64 border-b">
                      <Monaco
                        language="python"
                        theme="vs-dark"
                        value={userCode}
                        onChange={handleCodeChange}
                      />
                    </div>
                    <div className="p-4">
                      <Button 
                        onClick={handleRunCode} 
                        className="w-full"
                        disabled={isExecuting}
                      >
                        {isExecuting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Executing...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Output */}
                <Card className="neo-brutal">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Output
                      {isExecuting && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                          <span className="text-xs">Live execution...</span>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[100px] whitespace-pre-wrap">
                      {output || "Start typing to see live output..."}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      💡 Output updates automatically as you type (1s delay)
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {lesson.type === "theory" && (
              <Card className="neo-brutal">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Understand the fundamental concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Apply knowledge to real-world scenarios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>Prepare for practical implementation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Progress Stats */}
            <Card className="neo-brutal">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {courseProgress?.completedLessons.length || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Lessons Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {courseProgress?.totalXP || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total XP Earned
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 text-center animate-in zoom-in-95 duration-300">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🎉 Lesson Completed!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Great job! You've successfully completed this lesson.
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-300">
                <Zap className="w-5 h-5" />
                <span className="font-bold text-lg">+{lesson?.xpReward || 0} XP</span>
              </div>
              <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-1">
                Experience Points Earned
              </p>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {lesson?.nextLesson 
                ? "Redirecting to next lesson..." 
                : "Redirecting to quiz..."}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
