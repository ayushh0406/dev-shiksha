const express = require('express');
const router = express.Router();

// Sample user data
const sampleUsers = [
  {
    id: 1,
    username: "coder_pro",
    email: "coder@example.com",
    profile: {
      firstName: "Alex",
      lastName: "Johnson",
      avatar: null,
      bio: "Passionate about algorithms and data structures"
    },
    progress: {
      totalXP: 2450,
      level: 12,
      completedCourses: [
        { courseId: 5, completedAt: "2025-01-15", finalScore: 85 }
      ],
      completedLessons: [
        { lessonId: 1, completedAt: "2025-01-10", score: 92 },
        { lessonId: 2, completedAt: "2025-01-12", score: 88 }
      ],
      badges: [
        { name: "First Steps", description: "Complete your first lesson", icon: "🎯", earnedAt: "2025-01-10" },
        { name: "Quiz Master", description: "Score 90%+ on 5 quizzes", icon: "🧠", earnedAt: "2025-01-15" },
        { name: "Perfectionist", description: "Get 100% on any quiz", icon: "💯", earnedAt: "2025-01-20" }
      ],
      streakDays: 15,
      lastActiveDate: "2025-01-21"
    },
    analytics: {
      topicsProgress: [
        { topic: "Arrays", score: 85, lastUpdated: "2025-01-20" },
        { topic: "Sorting", score: 92, lastUpdated: "2025-01-21" },
        { topic: "Searching", score: 78, lastUpdated: "2025-01-19" },
        { topic: "Linked Lists", score: 65, lastUpdated: "2025-01-18" },
        { topic: "Trees", score: 70, lastUpdated: "2025-01-17" },
        { topic: "Graphs", score: 45, lastUpdated: "2025-01-16" }
      ],
      timeSpent: {
        total: 156, // minutes
        weekly: 42,
        lastReset: "2025-01-15"
      },
      loginStreak: {
        current: 15,
        longest: 23
      }
    },
    preferences: {
      language: "python",
      difficulty: "intermediate",
      learningGoals: ["master-algorithms", "competitive-programming"],
      notifications: {
        email: true,
        push: true
      }
    }
  }
];

// GET /api/users/:id - Get user profile
router.get('/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = sampleUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Remove sensitive information
    const { password, ...userProfile } = user;
    
    res.json({
      success: true,
      data: userProfile,
      message: 'User profile retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user profile',
      error: error.message
    });
  }
});

// GET /api/users/:id/progress - Get user progress
router.get('/:id/progress', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = sampleUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user.progress,
      message: 'User progress retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user progress',
      error: error.message
    });
  }
});

// GET /api/users/:id/analytics - Get user analytics
router.get('/:id/analytics', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = sampleUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Calculate additional analytics
    const weakTopics = user.analytics.topicsProgress
      .filter(topic => topic.score < 75)
      .sort((a, b) => a.score - b.score)
      .slice(0, 4)
      .map(topic => ({
        name: topic.topic,
        score: topic.score,
        improvement: Math.random() > 0.5 ? `+${Math.floor(Math.random() * 10)}%` : `-${Math.floor(Math.random() * 5)}%`,
        trend: Math.random() > 0.3 ? 'up' : 'down'
      }));
    
    const recentActivity = [
      { type: "quest", title: "Bubble Sort Mastery", xp: 100, time: "2 hours ago", status: "completed" },
      { type: "quiz", title: "Array Fundamentals Quiz", xp: 80, time: "1 day ago", status: "completed" },
      { type: "lesson", title: "Binary Search Trees", xp: 60, time: "2 days ago", status: "in-progress" },
      { type: "challenge", title: "Two Sum Problem", xp: 120, time: "3 days ago", status: "completed" }
    ];
    
    const upcomingQuests = [
      { title: "Merge Sort Implementation", difficulty: "Intermediate", xp: 150, estimatedTime: "3 hours" },
      { title: "Binary Tree Traversal", difficulty: "Advanced", xp: 200, estimatedTime: "4 hours" },
      { title: "Hash Table Basics", difficulty: "Beginner", xp: 100, estimatedTime: "2 hours" }
    ];
    
    res.json({
      success: true,
      data: {
        ...user.analytics,
        weakTopics,
        recentActivity,
        upcomingQuests,
        performanceData: user.analytics.topicsProgress
      },
      message: 'User analytics retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user analytics',
      error: error.message
    });
  }
});

// PUT /api/users/:id/progress - Update user progress
router.put('/:id/progress', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { xpEarned, lessonCompleted, courseCompleted, badgeEarned } = req.body;
    
    const user = sampleUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update XP and level
    if (xpEarned) {
      user.progress.totalXP += xpEarned;
      user.progress.level = Math.floor(Math.sqrt(user.progress.totalXP / 100)) + 1;
    }
    
    // Add completed lesson
    if (lessonCompleted) {
      user.progress.completedLessons.push({
        lessonId: lessonCompleted.lessonId,
        completedAt: new Date().toISOString(),
        score: lessonCompleted.score || 0
      });
    }
    
    // Add completed course
    if (courseCompleted) {
      user.progress.completedCourses.push({
        courseId: courseCompleted.courseId,
        completedAt: new Date().toISOString(),
        finalScore: courseCompleted.finalScore || 0
      });
    }
    
    // Add badge
    if (badgeEarned) {
      user.progress.badges.push({
        ...badgeEarned,
        earnedAt: new Date().toISOString()
      });
    }
    
    // Update last active date
    user.progress.lastActiveDate = new Date().toISOString();
    
    res.json({
      success: true,
      data: user.progress,
      message: 'User progress updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user progress',
      error: error.message
    });
  }
});

// PUT /api/users/:id/preferences - Update user preferences
router.put('/:id/preferences', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updates = req.body;
    
    const user = sampleUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update preferences
    user.preferences = { ...user.preferences, ...updates };
    
    res.json({
      success: true,
      data: user.preferences,
      message: 'User preferences updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user preferences',
      error: error.message
    });
  }
});

// GET /api/users/:id/recommendations - Get personalized recommendations
router.get('/:id/recommendations', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = sampleUsers.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Generate recommendations based on user preferences and weak topics
    const weakTopics = user.analytics.topicsProgress
      .filter(topic => topic.score < 75)
      .map(topic => topic.topic);
    
    const recommendations = {
      courses: [
        {
          id: 4,
          title: "Data Structures Mastery",
          reason: "Improve your weak topic: Linked Lists",
          difficulty: user.preferences.difficulty,
          estimatedTime: "5 hours",
          xp: 350
        },
        {
          id: 2,
          title: "Learn Graph Algorithms",
          reason: "Perfect match for your current level",
          difficulty: "advanced",
          estimatedTime: "6 hours",
          xp: 500
        }
      ],
      lessons: [
        {
          id: 4,
          title: "Linked List Implementation",
          reason: "Focus on your weakest topic",
          estimatedTime: 30,
          xp: 75
        },
        {
          id: 5,
          title: "Tree Traversal Techniques",
          reason: "Build on your existing knowledge",
          estimatedTime: 45,
          xp: 100
        }
      ],
      challenges: [
        {
          id: 1,
          title: "Reverse Linked List",
          difficulty: "medium",
          reason: "Practice your weak topic",
          xp: 150
        }
      ]
    };
    
    res.json({
      success: true,
      data: recommendations,
      message: 'Personalized recommendations generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error: error.message
    });
  }
});

module.exports = router;
