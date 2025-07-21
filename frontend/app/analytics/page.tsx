"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Target, Zap, Calendar, Trophy, Brain, RotateCcw, Star, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

const performanceData = [
  { topic: "Arrays", score: 85, total: 100, color: "bg-blue-500" },
  { topic: "Sorting", score: 92, total: 100, color: "bg-green-500" },
  { topic: "Searching", score: 78, total: 100, color: "bg-yellow-500" },
  { topic: "Linked Lists", score: 65, total: 100, color: "bg-red-500" },
  { topic: "Trees", score: 70, total: 100, color: "bg-purple-500" },
  { topic: "Graphs", score: 45, total: 100, color: "bg-orange-500" },
]

const weakTopics = [
  { name: "Graph Algorithms", score: 45, improvement: "+5%", trend: "up" },
  { name: "Dynamic Programming", score: 52, improvement: "-2%", trend: "down" },
  { name: "Linked Lists", score: 65, improvement: "+8%", trend: "up" },
  { name: "Tree Traversal", score: 70, improvement: "+3%", trend: "up" },
]

const recentActivity = [
  { type: "quest", title: "Bubble Sort Mastery", xp: 100, time: "2 hours ago", status: "completed" },
  { type: "quiz", title: "Array Fundamentals Quiz", xp: 80, time: "1 day ago", status: "completed" },
  { type: "lesson", title: "Binary Search Trees", xp: 60, time: "2 days ago", status: "in-progress" },
  { type: "challenge", title: "Two Sum Problem", xp: 120, time: "3 days ago", status: "completed" },
]

const upcomingQuests = [
  { title: "Merge Sort Implementation", difficulty: "Intermediate", xp: 150, estimatedTime: "3 hours" },
  { title: "Binary Tree Traversal", difficulty: "Advanced", xp: 200, estimatedTime: "4 hours" },
  { title: "Hash Table Basics", difficulty: "Beginner", xp: 100, estimatedTime: "2 hours" },
]

const badges = [
  { name: "First Steps", description: "Complete your first lesson", earned: true, icon: "🎯" },
  { name: "Quiz Master", description: "Score 90%+ on 5 quizzes", earned: true, icon: "🧠" },
  { name: "Speed Demon", description: "Complete 10 challenges in one day", earned: false, icon: "⚡" },
  { name: "Perfectionist", description: "Get 100% on any quiz", earned: true, icon: "💯" },
  { name: "Streak Master", description: "Maintain 7-day learning streak", earned: false, icon: "🔥" },
  { name: "Algorithm Ace", description: "Master all sorting algorithms", earned: false, icon: "🏆" },
]

export default function AnalyticsPage() {
  const totalXP = 2450
  const currentLevel = Math.floor(totalXP / 500) + 1
  const xpToNextLevel = currentLevel * 500 - totalXP
  const levelProgress = ((totalXP % 500) / 500) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">Your Analytics</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Track your progress and identify areas for improvement
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="overview" className="font-semibold">
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="font-semibold">
              Performance
            </TabsTrigger>
            <TabsTrigger value="activity" className="font-semibold">
              Activity
            </TabsTrigger>
            <TabsTrigger value="badges" className="font-semibold">
              Badges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card neo-brutal">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total XP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <span className="text-3xl font-black">{totalXP.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">+250 this week</p>
                </CardContent>
              </Card>

              <Card className="glass-card neo-brutal">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Current Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-blue-500" />
                    <span className="text-3xl font-black">{currentLevel}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {xpToNextLevel} XP to level {currentLevel + 1}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card neo-brutal">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Quests Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-500" />
                    <span className="text-3xl font-black">24</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">+3 this week</p>
                </CardContent>
              </Card>

              <Card className="glass-card neo-brutal">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Learning Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-orange-500" />
                    <span className="text-3xl font-black">12</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">days in a row</p>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <Card className="glass-card neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-500" />
                  Level Progress
                </CardTitle>
                <CardDescription>You're currently at Level {currentLevel}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Level {currentLevel}</span>
                    <span>Level {currentLevel + 1}</span>
                  </div>
                  <Progress value={levelProgress} className="h-4" />
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{xpToNextLevel} XP needed for next level</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Quests */}
            <Card className="glass-card neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Upcoming Quests
                </CardTitle>
                <CardDescription>Continue your learning journey with these recommended quests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingQuests.map((quest, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                    >
                      <div>
                        <h4 className="font-semibold">{quest.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <Badge variant="secondary">{quest.difficulty}</Badge>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>{quest.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{quest.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="rounded-2xl font-semibold quest-gradient">Start</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            {/* Performance Chart */}
            <Card className="glass-card neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Performance by Topic
                </CardTitle>
                <CardDescription>Your mastery level across different programming concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{item.topic}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.score}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={item.score} className="h-3" />
                        <div
                          className={`absolute top-0 left-0 h-3 rounded-full ${item.color}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weak Topics */}
            <Card className="glass-card neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-500" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>Focus on these topics to boost your overall performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800"
                    >
                      <div>
                        <h4 className="font-semibold text-red-900 dark:text-red-100">{topic.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-red-700 dark:text-red-300">Current: {topic.score}%</span>
                          <div
                            className={`flex items-center gap-1 text-sm ${
                              topic.trend === "up" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {topic.trend === "up" ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            <span>{topic.improvement}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-2xl font-semibold bg-transparent">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Practice
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-8">
            {/* Recent Activity */}
            <Card className="glass-card neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your learning activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "quest"
                            ? "bg-blue-100 dark:bg-blue-900"
                            : activity.type === "quiz"
                              ? "bg-green-100 dark:bg-green-900"
                              : activity.type === "lesson"
                                ? "bg-purple-100 dark:bg-purple-900"
                                : "bg-orange-100 dark:bg-orange-900"
                        }`}
                      >
                        {activity.type === "quest" && <Target className="w-5 h-5 text-blue-600" />}
                        {activity.type === "quiz" && <Brain className="w-5 h-5 text-green-600" />}
                        {activity.type === "lesson" && <Star className="w-5 h-5 text-purple-600" />}
                        {activity.type === "challenge" && <Zap className="w-5 h-5 text-orange-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Zap className="w-4 h-4" />
                          <span className="font-semibold">+{activity.xp}</span>
                        </div>
                        <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="mt-1">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-8">
            {/* Badge Collection */}
            <Card className="glass-card neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Badge Collection
                </CardTitle>
                <CardDescription>Unlock achievements as you progress through your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badges.map((badge, index) => (
                    <Card
                      key={index}
                      className={`glass-card transition-all ${
                        badge.earned
                          ? "neo-brutal border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20"
                          : "opacity-60 border-gray-300"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{badge.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{badge.description}</p>
                        {badge.earned ? (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Earned!
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Locked</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
