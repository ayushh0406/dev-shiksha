"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  ArrowLeft,
  Target,
  Zap,
  Brain
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import api, { progressApi } from "@/lib/api"

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
  learningObjectives: string[]
  syllabus: Array<{
    title: string
    description: string
    estimatedTime: number
  }>
  stats: {
    enrolledStudents: number
    completedStudents: number
    averageRating: number
    totalRatings: number
  }
  isPublished: boolean
  publishedAt: string
}

interface Lesson {
  _id: string
  title: string
  description: string
  course: string
  order: number
  type: string
  difficulty: string
  estimatedTime: number
  xpReward: number
  isPublished: boolean
}

interface UserProgress {
  courseId: string
  completedLessons: string[]
  totalXP: number
  currentLevel: number
  progressPercentage: number
  timeSpent: number // in minutes
  lastAccessed: string
}

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        console.log('Fetching course data for ID:', courseId)
        
        // Fetch course details
        const courseResponse = await api.course.getCourseById(courseId as string)
        console.log('Course response:', courseResponse)
        if (courseResponse.success) {
          setCourse(courseResponse.data)
          console.log('Course set:', courseResponse.data)
        } else {
          setError('Failed to fetch course details')
        }
        
        // Fetch lessons for this course
        const lessonsResponse = await api.lesson.getLessonsByCourse(courseId as string)
        console.log('Lessons response:', lessonsResponse)
        if (lessonsResponse.success) {
          setLessons(lessonsResponse.data)
          console.log('Lessons set:', lessonsResponse.data)
        } else {
          console.log('No lessons found or failed to fetch lessons')
          setLessons([])
        }

        // Check if user is enrolled and fetch progress from database
        const mockUserId = "687e398cc9ad9485deb144b5" // Real user ObjectId from database
        
        try {
          const progressResponse = await progressApi.getCourseProgress(courseId as string, mockUserId)
          if (progressResponse.success) {
            const progress = progressResponse.data
            const progressData = {
              courseId: courseId as string,
              completedLessons: progress.completedLessons.map((cl: any) => cl.lesson),
              totalXP: progress.totalXP,
              currentLevel: Math.floor(progress.totalXP / 100) + 1,
              progressPercentage: progress.completionPercentage || 0,
              timeSpent: progress.totalTimeSpent,
              lastAccessed: progress.lastAccessed
            }
            setUserProgress(progressData)
            setEnrolledCourses([courseId as string])
          }
        } catch (progressError) {
          console.log('No existing progress found for this course')
        }
        
      } catch (err) {
        console.error('Error fetching course data:', err)
        setError('Failed to load course details')
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourseData()
      
      // Set up interval to check for progress updates from database
      const progressInterval = setInterval(async () => {
        const mockUserId = "687e398cc9ad9485deb144b5" // Real user ObjectId from database
        
        try {
          const progressResponse = await progressApi.getCourseProgress(courseId as string, mockUserId)
          if (progressResponse.success) {
            const progress = progressResponse.data
            const progressData = {
              courseId: courseId as string,
              completedLessons: progress.completedLessons.map((cl: any) => cl.lesson),
              totalXP: progress.totalXP,
              currentLevel: Math.floor(progress.totalXP / 100) + 1,
              progressPercentage: progress.completionPercentage || 0,
              timeSpent: progress.totalTimeSpent,
              lastAccessed: progress.lastAccessed
            }
            setUserProgress(progressData)
            if (!enrolledCourses.includes(courseId as string)) {
              setEnrolledCourses([courseId as string])
            }
          }
        } catch (error) {
          // No progress found, user not enrolled
        }
      }, 2000) // Check every 2 seconds for real-time updates
      
      return () => clearInterval(progressInterval)
    }
  }, [courseId])

  const handleEnrollment = async () => {
    if (course) {
      setEnrolledCourses([...enrolledCourses, course._id])
      
      // Initialize user progress in database
      const mockUserId = "687e398cc9ad9485deb144b5" // Real user ObjectId from database
      
      try {
        // Create initial progress by calling getCourseProgress (which creates if not exists)
        const progressResponse = await progressApi.getCourseProgress(course._id, mockUserId)
        
        if (progressResponse.success) {
          const progress = progressResponse.data
          const progressData = {
            courseId: course._id,
            completedLessons: progress.completedLessons.map((cl: any) => cl.lesson),
            totalXP: progress.totalXP,
            currentLevel: Math.floor(progress.totalXP / 100) + 1,
            progressPercentage: progress.completionPercentage || 0,
            timeSpent: progress.totalTimeSpent,
            lastAccessed: progress.lastAccessed
          }
          setUserProgress(progressData)
        }
        
        console.log('User enrolled in course:', course._id)
      } catch (error) {
        console.error('Error enrolling user:', error)
      }
    }
  }

  const handleStartLesson = (lessonId: string) => {
    if (course) {
      router.push(`/learn/${course._id}/${lessonId}`)
    }
  }

  const handleStartCourse = () => {
    if (lessons.length > 0 && course) {
      // Start with the first lesson
      router.push(`/learn/${course._id}/${lessons[0]._id}`)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'theory': return <BookOpen className="h-4 w-4" />
      case 'code': return <Code className="h-4 w-4" />
      case 'quiz': return <Brain className="h-4 w-4" />
      default: return <Play className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Course not found'}</p>
            <Button onClick={() => router.push('/home')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const isEnrolled = enrolledCourses.includes(course._id)
  const completionRate = course.stats?.enrolledStudents && course.stats?.completedStudents 
    ? Math.round((course.stats.completedStudents / course.stats.enrolledStudents) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={() => router.push('/home')} 
            variant="ghost" 
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Course Info */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${course.color}`}>
                    {course.icon === 'Code' && <Code className="h-8 w-8 text-white" />}
                    {course.icon === 'Brain' && <Brain className="h-8 w-8 text-white" />}
                    {course.icon === 'Database' && <BookOpen className="h-8 w-8 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                    <p className="text-gray-600 mb-4">{course.shortDescription || course.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <Badge variant="outline">{course.language}</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {course.tags && course.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Learning Objectives
                    </h3>
                    <ul className="space-y-2">
                      {course.learningObjectives && course.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                      {(!course.learningObjectives || course.learningObjectives.length === 0) && (
                        <li className="text-sm text-gray-500">Learning objectives will be added soon.</li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Course Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Students Enrolled
                        </span>
                        <span className="font-medium">{course.stats?.enrolledStudents?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          Completion Rate
                        </span>
                        <span className="font-medium">{completionRate || 0}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Rating
                        </span>
                        <span className="font-medium">
                          {course.stats?.averageRating || 0} ({course.stats?.totalRatings || 0} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Duration
                        </span>
                        <span className="font-medium">
                          {course.estimatedTime?.hours || 0}h {course.estimatedTime?.minutes || 0}m
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          XP Reward
                        </span>
                        <span className="font-medium">{course.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {isEnrolled ? 'Enrolled' : 'Ready to Start?'}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {isEnrolled 
                      ? 'Continue your learning journey' 
                      : 'Join thousands of learners'}
                  </p>
                </div>
                
                {isEnrolled ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                        <CheckCircle className="h-4 w-4" />
                        Enrolled Successfully
                      </div>
                    </div>
                    
                    {/* Real-time Progress Analytics */}
                    {userProgress && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          Your Progress
                        </h4>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Lessons Completed</span>
                              <span className="font-medium">
                                {userProgress.completedLessons.length}/{lessons.length}
                              </span>
                            </div>
                            <Progress 
                              value={(userProgress.completedLessons.length / lessons.length) * 100} 
                              className="h-2"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-center p-2 bg-white rounded">
                              <div className="flex items-center justify-center gap-1 text-yellow-600">
                                <Zap className="h-3 w-3" />
                                <span className="font-bold text-lg">{userProgress.totalXP}</span>
                              </div>
                              <div className="text-xs text-gray-500">Total XP</div>
                            </div>
                            
                            <div className="text-center p-2 bg-white rounded">
                              <div className="flex items-center justify-center gap-1 text-blue-600">
                                <Star className="h-3 w-3" />
                                <span className="font-bold text-lg">{userProgress.currentLevel}</span>
                              </div>
                              <div className="text-xs text-gray-500">Level</div>
                            </div>
                          </div>
                          
                          <div className="text-center p-2 bg-white rounded">
                            <div className="flex items-center justify-center gap-1 text-green-600">
                              <Clock className="h-3 w-3" />
                              <span className="font-bold">{Math.round(userProgress.timeSpent)}m</span>
                            </div>
                            <div className="text-xs text-gray-500">Time Spent</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      onClick={handleStartCourse}
                      disabled={lessons.length === 0}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleEnrollment}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Enroll Now - Free
                  </Button>
                )}
                
                <Separator className="my-4" />
                
                <div className="text-center text-sm text-gray-500">
                  <p>✓ Lifetime access</p>
                  <p>✓ Complete at your own pace</p>
                  <p>✓ Certificate of completion</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curriculum" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Lessons ({lessons.length})
                </CardTitle>
                <CardDescription>
                  Interactive lessons to help you master the concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lessons.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Lessons are being prepared for this course.</p>
                    <p className="text-sm">Check back soon!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lessons.map((lesson, index) => {
                      const isLessonCompleted = userProgress?.completedLessons.includes(lesson._id)
                      
                      return (
                        <div 
                          key={lesson._id}
                          className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                            isLessonCompleted ? 'bg-green-50 border-green-200' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                isLessonCompleted 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-blue-100 text-blue-600'
                              }`}>
                                {isLessonCompleted ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  lesson.order
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className={`font-medium ${
                                    isLessonCompleted ? 'text-green-800' : ''
                                  }`}>
                                    {lesson.title}
                                  </h4>
                                  {isLessonCompleted && (
                                    <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {getTypeIcon(lesson.type)}
                                    <span className="ml-1">{lesson.type}</span>
                                  </Badge>
                                  <Badge className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                                    {lesson.difficulty}
                                  </Badge>
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {lesson.estimatedTime}m
                                  </span>
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    {lesson.xpReward} XP
                                  </span>
                                  {isLessonCompleted && (
                                    <span className="text-xs text-green-600 flex items-center gap-1">
                                      <Trophy className="h-3 w-3" />
                                      Earned
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {isEnrolled && (
                                <Button 
                                  size="sm" 
                                  variant={isLessonCompleted ? "secondary" : "outline"}
                                  onClick={() => handleStartLesson(lesson._id)}
                                >
                                  {isLessonCompleted ? (
                                    <>
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Review
                                    </>
                                  ) : (
                                    <>
                                      <Play className="h-4 w-4 mr-1" />
                                      Start
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="syllabus" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Syllabus</CardTitle>
                <CardDescription>
                  Detailed breakdown of topics covered in this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.syllabus && course.syllabus.length > 0 ? (
                    course.syllabus.map((item, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {item.estimatedTime} minutes
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Detailed syllabus will be available soon.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
