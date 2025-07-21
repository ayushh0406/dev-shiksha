"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Play, Code, BookOpen, Zap, ArrowRight, ArrowLeft, Lightbulb } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function LessonPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userCode, setUserCode] = useState(`def bubble_sort(arr):
    # Your code here
    pass`)
  const [isCompleted, setIsCompleted] = useState(false)

  const lessonSteps = [
    {
      title: "Understanding Bubble Sort",
      type: "theory",
      content: `Bubble Sort is one of the simplest sorting algorithms to understand. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order.

The algorithm gets its name because smaller elements "bubble" to the top of the list, just like air bubbles rise to the surface of water.

**Key Concepts:**
• Compare adjacent elements
• Swap if they're in wrong order
• Repeat until no swaps needed
• Time Complexity: O(n²)
• Space Complexity: O(1)`,
    },
    {
      title: "Algorithm Visualization",
      type: "visual",
      content: `Let's see how Bubble Sort works with an example array: [64, 34, 25, 12, 22, 11, 90]

**Pass 1:**
[64, 34, 25, 12, 22, 11, 90] → Compare 64 & 34, swap
[34, 64, 25, 12, 22, 11, 90] → Compare 64 & 25, swap
[34, 25, 64, 12, 22, 11, 90] → Compare 64 & 12, swap
...and so on

After each pass, the largest element "bubbles up" to its correct position at the end.`,
    },
    {
      title: "Code Implementation",
      type: "code",
      content: `Now it's your turn! Implement the bubble_sort function below.

**Hints:**
• Use nested loops
• Outer loop for passes
• Inner loop for comparisons
• Don't forget to swap elements when needed

**Expected behavior:**
bubble_sort([64, 34, 25, 12, 22, 11, 90]) should return [11, 12, 22, 25, 34, 64, 90]`,
    },
  ]

  const handleComplete = () => {
    setIsCompleted(true)
    // Simulate XP gain animation
    setTimeout(() => {
      window.location.href = "/quiz"
    }, 2000)
  }

  const currentLesson = lessonSteps[currentStep]
  const progress = ((currentStep + 1) / lessonSteps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                Sorting Algorithms: Bubble Sort
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                Master the fundamentals of sorting with bubble sort
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-lg px-4 py-2">
              <Zap className="w-4 h-4 mr-1" />
              100 XP
            </Badge>
          </div>

          {/* Progress Bar */}
          <Card className="glass-card neo-brutal">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Lesson Progress</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep + 1} of {lessonSteps.length}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Lesson Content */}
          <Card className="glass-card neo-brutal">
            <CardHeader>
              <div className="flex items-center gap-3">
                {currentLesson.type === "theory" && <BookOpen className="w-6 h-6 text-blue-500" />}
                {currentLesson.type === "visual" && <Play className="w-6 h-6 text-purple-500" />}
                {currentLesson.type === "code" && <Code className="w-6 h-6 text-teal-500" />}
                <CardTitle className="text-2xl font-bold">{currentLesson.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">{currentLesson.content}</pre>
              </div>

              {currentLesson.type === "visual" && (
                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
                      <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        64
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        34
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        25
                      </div>
                      <span className="text-gray-400">...</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Visual representation of array elements being compared
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Interactive Challenge */}
          <Card className="glass-card neo-brutal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Interactive Challenge
              </CardTitle>
              <CardDescription>
                {currentLesson.type === "code"
                  ? "Complete the implementation below"
                  : "Try the concept with this mini-challenge"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentLesson.type === "code" ? (
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-2xl p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2"># Python</div>
                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="bg-transparent border-none text-white font-mono resize-none min-h-[200px] focus:ring-0"
                      placeholder="Write your code here..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-2xl bg-transparent">
                      <Play className="w-4 h-4 mr-2" />
                      Run Code
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-2xl bg-transparent">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Hint
                    </Button>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-semibold">Test Results</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      All test cases passed! Great job! 🎉
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Quick Quiz</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                      What is the time complexity of Bubble Sort in the worst case?
                    </p>
                    <div className="space-y-2">
                      {["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"].map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start rounded-2xl bg-transparent"
                          onClick={() => {
                            if (option === "O(n²)") {
                              // Correct answer
                            }
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="rounded-2xl font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {lessonSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index <= currentStep ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {currentStep < lessonSteps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="rounded-2xl font-semibold quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={isCompleted}
              className="rounded-2xl font-semibold quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {isCompleted ? "Completed! 🎉" : "Mark as Done"}
              {!isCompleted && <CheckCircle className="w-4 h-4 ml-2" />}
            </Button>
          )}
        </div>

        {/* XP Gain Animation */}
        {isCompleted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <Card className="glass-card neo-brutal animate-bounce-slow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full quest-gradient flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  You earned <span className="font-bold text-yellow-500">100 XP</span>
                </p>
                <div className="text-4xl">🎉</div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
