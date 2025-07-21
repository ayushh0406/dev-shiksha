"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Trophy, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Award,
  Download,
  Share,
  Zap,
  Calendar,
  Clock,
  Target,
  Users,
  BookOpen
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import api from "@/lib/api"

interface CourseCompletion {
  course: {
    _id: string
    title: string
    description: string
    difficulty: string
    xpReward: number
    estimatedTime: {
      hours: number
      minutes: number
    }
  }
  completionStats: {
    totalLessons: number
    completedLessons: number
    quizScore: number
    totalXPEarned: number
    timeSpent: number // in minutes
    completedAt: string
  }
  certificate: {
    id: string
    studentName: string
    courseName: string
    completionDate: string
    grade: string
  }
  achievements: Array<{
    id: string
    title: string
    description: string
    icon: string
    unlockedAt: string
  }>
  recommendations: Array<{
    _id: string
    title: string
    difficulty: string
    estimatedTime: {
      hours: number
      minutes: number
    }
  }>
}

export default function CourseCompletePage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [completionData, setCompletionData] = useState<CourseCompletion | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCelebration, setShowCelebration] = useState(true)

  useEffect(() => {
    const fetchCompletionData = async () => {
      try {
        setLoading(true)
        
        // Fetch course completion data
        // const response = await api.course.getCompletionData(courseId, userId)
        
        // For now, use sample data
        const sampleData: CourseCompletion = {
          course: {
            _id: courseId as string,
            title: "Data Structures & Algorithms Fundamentals",
            description: "Master fundamental data structures and algorithms essential for software engineering",
            difficulty: "intermediate",
            xpReward: 600,
            estimatedTime: { hours: 8, minutes: 0 }
          },
          completionStats: {
            totalLessons: 6,
            completedLessons: 6,
            quizScore: 85,
            totalXPEarned: 750,
            timeSpent: 480, // 8 hours
            completedAt: new Date().toISOString()
          },
          certificate: {
            id: `CERT-${Date.now()}`,
            studentName: "John Doe",
            courseName: "Data Structures & Algorithms Fundamentals",
            completionDate: new Date().toLocaleDateString(),
            grade: "A"
          },
          achievements: [
            {
              id: "1",
              title: "Course Completion",
              description: "Successfully completed all lessons",
              icon: "trophy",
              unlockedAt: new Date().toISOString()
            },
            {
              id: "2",
              title: "Quiz Master",
              description: "Scored 75% or higher on the final quiz",
              icon: "star",
              unlockedAt: new Date().toISOString()
            },
            {
              id: "3",
              title: "Consistent Learner",
              description: "Maintained steady progress throughout",
              icon: "target",
              unlockedAt: new Date().toISOString()
            }
          ],
          recommendations: [
            {
              _id: "2",
              title: "System Design Fundamentals",
              difficulty: "advanced",
              estimatedTime: { hours: 10, minutes: 0 }
            },
            {
              _id: "3",
              title: "Advanced Algorithms",
              difficulty: "advanced",
              estimatedTime: { hours: 12, minutes: 0 }
            }
          ]
        }
        
        setCompletionData(sampleData)
        
        // Hide celebration after 5 seconds
        setTimeout(() => {
          setShowCelebration(false)
        }, 5000)
        
      } catch (error) {
        console.error("Error fetching completion data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCompletionData()
    }
  }, [courseId])

  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download a PDF certificate
    alert("Certificate download feature coming soon!")
  }

  const handleShareAchievement = () => {
    // In a real app, this would open a social sharing dialog
    if (navigator.share && completionData) {
      navigator.share({
        title: `I just completed ${completionData.course.title}!`,
        text: `I successfully completed the ${completionData.course.title} course and earned ${completionData.completionStats.totalXPEarned} XP!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(
        `I just completed ${completionData?.course.title} and earned ${completionData?.completionStats.totalXPEarned} XP! Check it out at ${window.location.origin}`
      )
      alert("Achievement copied to clipboard!")
    }
  }

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 75) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getGradeLetter = (score: number) => {
    if (score >= 90) return "A"
    if (score >= 80) return "B"
    if (score >= 75) return "C"
    return "F"
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

  if (!completionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Completion Data Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">We couldn't find your course completion data.</p>
            <Button onClick={() => router.push('/home')}>Back to Home</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-teal-900/20">
      <Navbar />

      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-8 text-center animate-bounce max-w-md mx-4">
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You've successfully completed the course!
            </p>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-lg px-4 py-2">
              <Award className="w-5 h-5 mr-2" />
              +{completionData.completionStats.totalXPEarned} XP
            </Badge>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            Course Completed!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {completionData.course.title}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Completion Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Summary */}
            <Card className="neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Your Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Lessons Completed</span>
                        <span className="text-sm text-gray-600">
                          {completionData.completionStats.completedLessons}/{completionData.completionStats.totalLessons}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Quiz Score</span>
                        <Badge className={`${getGradeColor(completionData.completionStats.quizScore)} text-sm`}>
                          {completionData.completionStats.quizScore}% (Grade {getGradeLetter(completionData.completionStats.quizScore)})
                        </Badge>
                      </div>
                      <Progress value={completionData.completionStats.quizScore} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{completionData.completionStats.totalXPEarned}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">XP Earned</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{Math.round(completionData.completionStats.timeSpent / 60)}h</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Time Spent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Achievements Unlocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {completionData.achievements.map((achievement) => (
                    <div key={achievement.id} className="text-center p-4 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        {achievement.icon === "trophy" && <Trophy className="w-6 h-6 text-white" />}
                        {achievement.icon === "star" && <Star className="w-6 h-6 text-white" />}
                        {achievement.icon === "target" && <Target className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificate */}
            <Card className="neo-brutal border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Certificate of Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 border-2 border-dashed border-yellow-300 rounded-lg bg-white/50">
                  <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Certificate #{completionData.certificate.id}</h3>
                  <p className="text-gray-600 mb-1">This certifies that</p>
                  <p className="text-lg font-semibold mb-1">{completionData.certificate.studentName}</p>
                  <p className="text-gray-600 mb-1">has successfully completed</p>
                  <p className="text-lg font-semibold mb-3">{completionData.certificate.courseName}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Completed on {completionData.certificate.completionDate}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleDownloadCertificate} className="bg-yellow-600 hover:bg-yellow-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button onClick={handleShareAchievement} variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <Card className="neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button onClick={() => router.push('/home')} className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Explore More Courses
                  </Button>
                  <Button onClick={() => router.push('/profile')} className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    View Your Profile
                  </Button>
                  <Button onClick={() => router.push('/analytics')} className="w-full" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Courses */}
            <Card className="neo-brutal">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completionData.recommendations.map((course) => (
                    <div key={course._id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                         onClick={() => router.push(`/course/${course._id}`)}>
                      <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <Badge variant="outline" className="text-xs">
                          {course.difficulty}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.estimatedTime.hours}h {course.estimatedTime.minutes}m
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="neo-brutal">
              <CardHeader>
                <CardTitle className="text-lg">Course Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Completion Date</span>
                    <span className="font-medium">
                      {new Date(completionData.completionStats.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Course Difficulty</span>
                    <Badge variant="outline" className="text-xs">
                      {completionData.course.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated Time</span>
                    <span className="font-medium">
                      {completionData.course.estimatedTime.hours}h {completionData.course.estimatedTime.minutes}m
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Your Time</span>
                    <span className="font-medium">
                      {Math.round(completionData.completionStats.timeSpent / 60)}h {completionData.completionStats.timeSpent % 60}m
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
