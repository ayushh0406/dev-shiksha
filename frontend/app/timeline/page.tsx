"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Lock, Play, Star, Clock, Zap, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"

const levels = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    description: "Learn the basics of algorithmic thinking and problem-solving",
    status: "complete",
    xp: 50,
    duration: "30 min",
    topics: ["Big O Notation", "Problem Solving", "Pseudocode"],
  },
  {
    id: 2,
    title: "Array Fundamentals",
    description: "Master array operations and common patterns",
    status: "complete",
    xp: 75,
    duration: "45 min",
    topics: ["Array Traversal", "Two Pointers", "Sliding Window"],
  },
  {
    id: 3,
    title: "Sorting Algorithms",
    description: "Implement and understand various sorting techniques",
    status: "current",
    xp: 100,
    duration: "60 min",
    topics: ["Bubble Sort", "Quick Sort", "Merge Sort"],
    progress: 60,
  },
  {
    id: 4,
    title: "Binary Search",
    description: "Master the art of efficient searching",
    status: "unlocked",
    xp: 80,
    duration: "40 min",
    topics: ["Binary Search", "Search Variants", "Optimization"],
  },
  {
    id: 5,
    title: "Linked Lists",
    description: "Understand dynamic data structures",
    status: "locked",
    xp: 90,
    duration: "50 min",
    topics: ["Singly Linked", "Doubly Linked", "Circular Lists"],
  },
  {
    id: 6,
    title: "Stack & Queue",
    description: "Learn LIFO and FIFO data structures",
    status: "locked",
    xp: 85,
    duration: "45 min",
    topics: ["Stack Operations", "Queue Operations", "Applications"],
  },
  {
    id: 7,
    title: "Tree Traversal",
    description: "Navigate through hierarchical data structures",
    status: "locked",
    xp: 120,
    duration: "70 min",
    topics: ["DFS", "BFS", "Tree Properties"],
  },
  {
    id: 8,
    title: "Dynamic Programming",
    description: "Solve complex problems with optimal substructure",
    status: "locked",
    xp: 150,
    duration: "90 min",
    topics: ["Memoization", "Tabulation", "Classic Problems"],
  },
]

export default function TimelinePage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "current":
        return <Play className="w-6 h-6 text-blue-500" />
      case "unlocked":
        return <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900" />
      case "locked":
        return <Lock className="w-6 h-6 text-gray-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "border-green-500 bg-green-50 dark:bg-green-900/20"
      case "current":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20 animate-pulse-glow"
      case "unlocked":
        return "border-blue-300 bg-white dark:bg-gray-800 hover:border-blue-500 cursor-pointer"
      case "locked":
        return "border-gray-300 bg-gray-50 dark:bg-gray-900 opacity-60"
      default:
        return ""
    }
  }

  const completedLevels = levels.filter((level) => level.status === "complete").length
  const totalXP = levels.filter((level) => level.status === "complete").reduce((sum, level) => sum + level.xp, 0)
  const overallProgress = (completedLevels / levels.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">Your Learning Path</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Master Data Structures & Algorithms step by step
          </p>

          {/* Progress Overview */}
          <Card className="max-w-2xl mx-auto glass-card neo-brutal mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Progress</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {completedLevels}/{levels.length} Complete
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallProgress} className="mb-4 h-3" />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold">{totalXP} XP Earned</span>
                </div>
                <span>{Math.round(overallProgress)}% Complete</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 rounded-full" />

            {/* Level Cards */}
            <div className="space-y-8">
              {levels.map((level, index) => (
                <div key={level.id} className="relative flex items-start">
                  {/* Timeline Node */}
                  <div className="absolute left-6 w-5 h-5 bg-white dark:bg-gray-900 rounded-full border-4 border-blue-500 z-10" />

                  {/* Level Card */}
                  <Card
                    className={`ml-16 w-full glass-card neo-brutal transition-all duration-200 ${getStatusColor(level.status)} ${
                      level.status === "unlocked" || level.status === "current"
                        ? "hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : ""
                    }`}
                    onClick={() => {
                      if (level.status === "unlocked" || level.status === "current") {
                        setSelectedLevel(level.id)
                      }
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(level.status)}
                          <div>
                            <CardTitle className="text-xl font-bold">
                              Level {level.id}: {level.title}
                            </CardTitle>
                            <CardDescription className="mt-1">{level.description}</CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-500 mb-1">
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold">{level.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{level.duration}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Progress for current level */}
                      {level.status === "current" && level.progress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-semibold">Progress</span>
                            <span>{level.progress}%</span>
                          </div>
                          <Progress value={level.progress} className="h-2" />
                        </div>
                      )}

                      {/* Topics */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Topics covered:</p>
                        <div className="flex flex-wrap gap-2">
                          {level.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="secondary" className="rounded-full">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      {(level.status === "unlocked" || level.status === "current") && (
                        <Button
                          className="w-full rounded-2xl font-bold quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = "/lesson"
                          }}
                        >
                          {level.status === "current" ? "Continue Learning" : "Start Level"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}

                      {level.status === "complete" && (
                        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                          <CheckCircle className="w-5 h-5" />
                          <span>Completed!</span>
                          <div className="flex items-center gap-1 ml-2">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
