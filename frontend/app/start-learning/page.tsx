"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Code, 
  Clock, 
  Trophy, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Target,
  Zap,
  Brain,
  Search,
  Filter,
  TrendingUp,
  Award,
  Calendar,
  ArrowRight,
  Lock,
  Unlock
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import api from "@/lib/api"

interface Course {
  _id: string
  title: string
  description: string
  shortDescription: string
  category: string
  difficulty: string
  language: string
  tags: string[]
  icon: string
  color: string
  estimatedTime: {
    hours: number
    minutes: number
  }
  xpReward: number
  stats: {
    enrolledStudents: number
    averageRating: number
    totalRatings: number
  }
  isEnrolled?: boolean
  progress?: number
  lastAccessedLesson?: string
}

interface UserProgress {
  totalXP: number
  level: number
  coursesCompleted: number
  coursesInProgress: number
  currentStreak: number
  weeklyGoal: number
  weeklyProgress: number
}

interface LearningPath {
  id: string
  title: string
  description: string
  courses: string[]
  difficulty: string
  estimatedTime: {
    hours: number
    minutes: number
  }
  completionRate: number
}

export default function StartLearningPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("recommended")

  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        setLoading(true)
        
        // Fetch courses
        const coursesResponse = await api.course.getCourses({
          search: searchQuery,
          category: selectedCategory,
          difficulty: selectedDifficulty
        })
        
        if (coursesResponse.success) {
          // Add enrollment and progress data
          const coursesWithProgress = coursesResponse.data.map((course: Course) => ({
            ...course,
            isEnrolled: Math.random() > 0.7, // Mock enrollment
            progress: Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0,
            lastAccessedLesson: Math.random() > 0.5 ? "lesson-1" : undefined
          }))
          setCourses(coursesWithProgress)
        }
        
        // Mock user progress data
        setUserProgress({
          totalXP: 2450,
          level: 5,
          coursesCompleted: 3,
          coursesInProgress: 2,
          currentStreak: 7,
          weeklyGoal: 5,
          weeklyProgress: 3
        })
        
        // Mock learning paths
        setLearningPaths([
          {
            id: "1",
            title: "Software Engineering Track",
            description: "Complete roadmap from basics to advanced software development",
            courses: ["1", "2", "3"],
            difficulty: "beginner-to-advanced",
            estimatedTime: { hours: 40, minutes: 0 },
            completionRate: 35
          },
          {
            id: "2", 
            title: "Data Science & ML Track",
            description: "Master data science and machine learning fundamentals",
            courses: ["4", "5", "6"],
            difficulty: "intermediate-to-advanced",
            estimatedTime: { hours: 35, minutes: 0 },
            completionRate: 0
          }
        ])
        
      } catch (error) {
        console.error("Error fetching learning data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLearningData()
  }, [searchQuery, selectedCategory, selectedDifficulty])

  const handleCourseAction = (course: Course) => {
    if (course.isEnrolled && course.progress && course.progress > 0) {
      // Continue learning
      router.push(`/learn/${course._id}/${course.lastAccessedLesson || "1"}`)
    } else if (course.isEnrolled) {
      // Start learning
      router.push(`/course/${course._id}`)
    } else {
      // View course details
      router.push(`/course/${course._id}`)
    }
  }

  const getActionButtonText = (course: Course) => {
    if (course.isEnrolled && course.progress && course.progress > 0) {
      return "Continue"
    } else if (course.isEnrolled) {
      return "Start Learning"
    } else {
      return "View Course"
    }
  }

  const getActionButtonIcon = (course: Course) => {
    if (course.isEnrolled && course.progress && course.progress > 0) {
      return <ArrowRight className="w-4 h-4" />
    } else {
      return <Play className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            Start Learning 🚀
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Continue your journey or explore new topics
          </p>
        </div>

        {/* User Progress Dashboard */}
        {userProgress && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="neo-brutal">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userProgress.totalXP.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total XP</div>
              </CardContent>
            </Card>
            <Card className="neo-brutal">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">Level {userProgress.level}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
              </CardContent>
            </Card>
            <Card className="neo-brutal">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userProgress.currentStreak}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="neo-brutal">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{userProgress.weeklyProgress}/{userProgress.weeklyGoal}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Goal</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="neo-brutal mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="data-structures">Data Structures</SelectItem>
                  <SelectItem value="system-design">System Design</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="machine-learning">Machine Learning</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full md:w-48">
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
          </CardContent>
        </Card>

        {/* Learning Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="all">All Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => !course.isEnrolled || (course.progress && course.progress < 100))
                .slice(0, 6)
                .map((course) => (
                <Card key={course._id} className="neo-brutal hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${course.color} mb-3`}>
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.shortDescription || course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.isEnrolled && course.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.estimatedTime.hours}h {course.estimatedTime.minutes}m
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {course.xpReward} XP
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.stats.enrolledStudents.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {course.stats.averageRating}
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleCourseAction(course)}
                        className="w-full"
                        variant={course.isEnrolled ? "default" : "outline"}
                      >
                        {getActionButtonIcon(course)}
                        <span className="ml-2">{getActionButtonText(course)}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => course.isEnrolled && course.progress && course.progress > 0 && course.progress < 100)
                .map((course) => (
                <Card key={course._id} className="neo-brutal border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${course.color} mb-3`}>
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        In Progress
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-3" />
                      </div>

                      <Button 
                        onClick={() => handleCourseAction(course)}
                        className="w-full"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {courses.filter(course => course.isEnrolled && course.progress && course.progress > 0 && course.progress < 100).length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No courses in progress</p>
                  <p className="text-sm">Start a new course to see your progress here!</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="mt-6">
            <div className="space-y-6">
              {learningPaths.map((path) => (
                <Card key={path.id} className="neo-brutal">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                        <CardDescription className="text-base">{path.description}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Completion Progress</span>
                          <span className="text-sm text-gray-600">{path.completionRate}%</span>
                        </div>
                        <Progress value={path.completionRate} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {path.courses.length} courses
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          ~{path.estimatedTime.hours}h total
                        </div>
                      </div>

                      <Button 
                        onClick={() => router.push(`/path/${path.id}`)}
                        className="w-full"
                        variant={path.completionRate > 0 ? "default" : "outline"}
                      >
                        {path.completionRate > 0 ? (
                          <>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Continue Path
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Learning Path
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course._id} className="neo-brutal hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${course.color} mb-3`}>
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.shortDescription || course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.isEnrolled && course.progress !== undefined && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-600">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.estimatedTime.hours}h {course.estimatedTime.minutes}m
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {course.xpReward} XP
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleCourseAction(course)}
                        className="w-full"
                        variant={course.isEnrolled ? "default" : "outline"}
                      >
                        {getActionButtonIcon(course)}
                        <span className="ml-2">{getActionButtonText(course)}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
