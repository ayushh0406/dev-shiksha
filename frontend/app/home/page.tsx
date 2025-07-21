"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Zap, Clock, Star, Filter, Calculator, Brain, Bot, Code, Database, Palette } from "lucide-react"
import { Navbar } from "@/components/navbar"
import api from "@/lib/api"

// Icon mapping for courses
const iconMapping: { [key: string]: any } = {
  Calculator,
  Brain,
  Bot,
  Code,
  Database,
  Palette,
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await api.course.getCourses({
          language: selectedLanguage,
          difficulty: selectedDifficulty,
          search: searchQuery
        })
        
        if (response.success) {
          setCourses(response.data)
        } else {
          setError('Failed to fetch courses')
        }
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError('Failed to connect to backend. Using sample data.')
        
        // Fallback to sample data
        setCourses([
          {
            id: 1,
            title: "Build a Calculator",
            description: "Master basic programming concepts by building a functional calculator",
            xpReward: 250,
            difficulty: "beginner",
            language: "javascript",
            icon: "Calculator",
            color: "bg-blue-500",
            estimatedTime: { hours: 2, minutes: 0 },
          },
          {
            id: 2,
            title: "Learn Graph Algorithms", 
            description: "Dive deep into graph theory and implement BFS, DFS, and shortest path algorithms",
            xpReward: 500,
            difficulty: "advanced",
            language: "python",
            icon: "Brain",
            color: "bg-purple-500",
            estimatedTime: { hours: 6, minutes: 0 },
          },
          {
            id: 3,
            title: "Make a Chatbot",
            description: "Create an AI-powered chatbot using modern NLP techniques",
            xpReward: 400,
            difficulty: "intermediate",
            language: "python",
            icon: "Bot",
            color: "bg-teal-500",
            estimatedTime: { hours: 4, minutes: 0 },
          },
          {
            id: 4,
            title: "Data Structures Mastery",
            description: "Master arrays, linked lists, stacks, queues, and trees",
            xpReward: 350,
            difficulty: "intermediate",
            language: "cpp",
            icon: "Code",
            color: "bg-green-500",
            estimatedTime: { hours: 5, minutes: 0 },
          },
          {
            id: 5,
            title: "Database Design",
            description: "Learn SQL, database normalization, and query optimization",
            xpReward: 300,
            difficulty: "beginner",
            language: "sql",
            icon: "Database",
            color: "bg-orange-500",
            estimatedTime: { hours: 3, minutes: 0 },
          },
          {
            id: 6,
            title: "UI/UX Fundamentals",
            description: "Design beautiful and functional user interfaces",
            xpReward: 200,
            difficulty: "beginner",
            language: "design",
            icon: "Palette",
            color: "bg-pink-500",
            estimatedTime: { hours: 2, minutes: 0 },
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [selectedLanguage, selectedDifficulty, searchQuery])

  const filteredGoals = courses.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLanguage = selectedLanguage === "all" || goal.language === selectedLanguage
    const matchesDifficulty = selectedDifficulty === "all" || goal.difficulty === selectedDifficulty

    return matchesSearch && matchesLanguage && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            What do you want to learn?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Choose your next quest and level up your skills!
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for quests, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 glass-card"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-semibold">Filter by:</span>
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40 rounded-2xl border-2">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-40 rounded-2xl border-2">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Goal Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="glass-card neo-brutal animate-pulse">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-300 rounded-2xl mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">⚠️ {error}</div>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGoals.map((goal) => {
              const IconComponent = iconMapping[goal.icon] || Code
              return (
                <Card
                  key={goal._id || goal.id}
                  className="glass-card neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group cursor-pointer"
                  onClick={() => {
                    // Navigate to course detail page
                    window.location.href = `/course/${goal._id || goal.id}`
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${goal.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(goal.difficulty)}>{goal.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                      {goal.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">{goal.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">
                          {goal.xpReward || goal.xp} XP
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {typeof goal.estimatedTime === 'object' 
                            ? `${goal.estimatedTime.hours}h ${goal.estimatedTime.minutes}m`
                            : goal.estimatedTime
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="rounded-full">
                        {goal.language}
                      </Badge>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4" />
                      </div>
                    </div>

                    <Button
                      className="w-full rounded-2xl font-bold py-6 quest-gradient neo-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `/course/${goal._id || goal.id}`
                      }}
                    >
                      Start Quest
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {!loading && !error && filteredGoals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No quests found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters to find the perfect quest for you.
            </p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedLanguage("all")
              setSelectedDifficulty("all")
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
