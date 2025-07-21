// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };
    
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

// Course API calls
export const courseApi = {
  // Get all courses with optional filters
  getCourses: async (filters?: {
    language?: string;
    difficulty?: string;
    category?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.append(key, value);
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/courses${queryString ? `?${queryString}` : ''}`;
    
    return apiCall(endpoint);
  },

  // Get specific course by ID
  getCourse: async (id: number) => {
    return apiCall(`/courses/${id}`);
  },

  // Get specific course by ID (alias for getCourse)
  getCourseById: async (id: string) => {
    return apiCall(`/courses/${id}`);
  },

  // Get courses by category
  getCoursesByCategory: async (category: string) => {
    return apiCall(`/courses/category/${category}`);
  },

  // Get courses by difficulty
  getCoursesByDifficulty: async (difficulty: string) => {
    return apiCall(`/courses/difficulty/${difficulty}`);
  },
};

// Lesson API calls
export const lessonApi = {
  // Get all lessons with optional filters
  getLessons: async (filters?: {
    courseId?: number;
    type?: string;
    difficulty?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/lessons${queryString ? `?${queryString}` : ''}`;
    
    return apiCall(endpoint);
  },

  // Get specific lesson by ID
  getLesson: async (id: string) => {
    return apiCall(`/lessons/${id}`);
  },

  // Get lessons by course
  getLessonsByCourse: async (courseId: string | number) => {
    return apiCall(`/lessons/course/${courseId}`);
  },

  // Mark lesson as completed
  completeLesson: async (lessonId: string, data: {
    userId: string;
    score?: number;
    timeSpent?: number;
  }) => {
    return apiCall(`/lessons/${lessonId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Check if lesson is unlocked for user
  isLessonUnlocked: async (lessonId: string, userId: string) => {
    return apiCall(`/lessons/${lessonId}/unlock-status?userId=${userId}`);
  },

  // Get next available lesson
  getNextLesson: async (courseId: string, currentLessonId: string, userId: string) => {
    return apiCall(`/lessons/next?courseId=${courseId}&currentLessonId=${currentLessonId}&userId=${userId}`);
  },
};

// Quiz API calls
export const quizApi = {
  // Get all quizzes with optional filters
  getQuizzes: async (filters?: {
    courseId?: string;
    lessonId?: string;
    type?: string;
    difficulty?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/quiz${queryString ? `?${queryString}` : ''}`;
    
    return apiCall(endpoint);
  },

  // Get specific quiz by ID
  getQuiz: async (id: number) => {
    return apiCall(`/quiz/${id}`);
  },

  // Start a quiz attempt
  startQuizAttempt: async (quizId: number, userId: string) => {
    return apiCall(`/quiz/${quizId}/attempt`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },

  // Submit quiz answers
  submitQuiz: async (quizId: number, data: {
    userId: string;
    attemptId: number;
    answers: Array<{
      questionId: number;
      selectedAnswer: string;
    }>;
  }) => {
    return apiCall(`/quiz/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get user's quiz attempts
  getUserAttempts: async (quizId: number, userId: string) => {
    return apiCall(`/quiz/${quizId}/attempts/${userId}`);
  },
};

// User API calls
export const userApi = {
  // Get user profile
  getUser: async (id: number) => {
    return apiCall(`/users/${id}`);
  },

  // Get user progress
  getUserProgress: async (id: number) => {
    return apiCall(`/users/${id}/progress`);
  },

  // Get user analytics
  getUserAnalytics: async (id: number) => {
    return apiCall(`/users/${id}/analytics`);
  },

  // Update user progress
  updateUserProgress: async (id: number, data: {
    xpEarned?: number;
    lessonCompleted?: {
      lessonId: string;
      score?: number;
    };
    courseCompleted?: {
      courseId: number;
      finalScore?: number;
    };
    badgeEarned?: {
      name: string;
      description: string;
      icon: string;
    };
  }) => {
    return apiCall(`/users/${id}/progress`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Update user preferences
  updateUserPreferences: async (id: number, preferences: {
    language?: string;
    difficulty?: string;
    learningGoals?: string[];
    notifications?: {
      email?: boolean;
      push?: boolean;
    };
  }) => {
    return apiCall(`/users/${id}/preferences`, {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },

  // Get personalized recommendations
  getRecommendations: async (id: number) => {
    return apiCall(`/users/${id}/recommendations`);
  },
};

// AI API calls
export const aiApi = {
  // Get AI explanation for a topic
  explainTopic: async (data: {
    topic: string;
    difficulty?: string;
    language?: string;
  }) => {
    return apiCall('/ai/explain', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Generate AI quiz
  generateQuiz: async (data: {
    topic: string;
    difficulty?: string;
    questionCount?: number;
    language?: string;
  }) => {
    return apiCall('/ai/generate-quiz', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get AI code review
  reviewCode: async (data: {
    code: string;
    language: string;
    context?: string;
  }) => {
    return apiCall('/ai/code-review', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get AI hint
  getHint: async (data: {
    problem: string;
    userCode?: string;
    difficulty?: string;
  }) => {
    return apiCall('/ai/hint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Generate coding problem
  generateProblem: async (data: {
    topic: string;
    difficulty?: string;
    language?: string;
  }) => {
    return apiCall('/ai/generate-problem', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Chat with AI tutor
  chatWithAI: async (data: {
    message: string;
    context?: string;
    userId?: string;
  }) => {
    return apiCall('/ai/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Progress API calls
export const progressApi = {
  // Get user progress for a specific course
  getCourseProgress: async (courseId: string, userId: string) => {
    return apiCall(`/progress/course/${courseId}/user/${userId}`);
  },

  // Complete a lesson
  completeLesson: async (lessonId: string, data: {
    userId: string;
    score?: number;
    timeSpent?: number;
  }) => {
    return apiCall(`/progress/lesson/${lessonId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get user's overall progress
  getUserOverview: async (userId: string) => {
    return apiCall(`/progress/user/${userId}/overview`);
  },

  // Reset course progress
  resetCourseProgress: async (courseId: string, userId: string) => {
    return apiCall(`/progress/course/${courseId}/user/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Auth API calls (placeholder for future implementation)
export const authApi = {
  // Register new user
  register: async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Login user
  login: async (data: {
    email: string;
    password: string;
  }) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Logout user
  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
};

// Export all APIs
export default {
  course: courseApi,
  lesson: lessonApi,
  quiz: quizApi,
  user: userApi,
  progress: progressApi,
  ai: aiApi,
  auth: authApi,
  healthCheck,
};
