const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  type: {
    type: String,
    required: [true, 'Quiz type is required'],
    enum: ['lesson-quiz', 'practice-quiz', 'assessment', 'challenge']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['algorithms', 'data-structures', 'programming', 'theory', 'problem-solving']
  },
  timeLimit: {
    type: Number,
    default: null // in minutes, null means no time limit
  },
  maxAttempts: {
    type: Number,
    default: 3,
    min: [1, 'Must allow at least 1 attempt']
  },
  passingScore: {
    type: Number,
    required: [true, 'Passing score is required'],
    min: [0, 'Passing score cannot be negative'],
    max: [100, 'Passing score cannot exceed 100'],
    default: 70
  },
  xpReward: {
    type: Number,
    required: [true, 'XP reward is required'],
    min: [10, 'XP reward must be at least 10'],
    max: [500, 'XP reward cannot exceed 500']
  },
  questions: [{
    question: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true
    },
    type: {
      type: String,
      required: [true, 'Question type is required'],
      enum: ['multiple-choice', 'true-false', 'fill-blank', 'code-completion', 'matching']
    },
    options: [{
      text: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        default: false
      }
    }],
    correctAnswer: {
      type: String, // For fill-blank and code-completion
      trim: true
    },
    explanation: {
      type: String,
      maxlength: [1000, 'Explanation cannot exceed 1000 characters']
    },
    points: {
      type: Number,
      default: 1,
      min: [1, 'Points must be at least 1']
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    tags: [String],
    code: {
      language: String,
      snippet: String,
      expectedOutput: String
    },
    hints: [String]
  }],
  settings: {
    shuffleQuestions: {
      type: Boolean,
      default: false
    },
    shuffleOptions: {
      type: Boolean,
      default: true
    },
    showCorrectAnswers: {
      type: Boolean,
      default: true
    },
    showExplanations: {
      type: Boolean,
      default: true
    },
    allowReview: {
      type: Boolean,
      default: true
    },
    instantFeedback: {
      type: Boolean,
      default: false
    }
  },
  stats: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    averageTimeSpent: {
      type: Number,
      default: 0 // in minutes
    },
    passRate: {
      type: Number,
      default: 0 // percentage
    },
    popularQuestions: [{
      questionIndex: Number,
      incorrectAttempts: Number
    }]
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  publishedAt: Date,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Quiz attempt schema for tracking user attempts
const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: [true, 'Quiz is required']
  },
  attemptNumber: {
    type: Number,
    required: [true, 'Attempt number is required'],
    min: [1, 'Attempt number must be at least 1']
  },
  answers: [{
    questionIndex: {
      type: Number,
      required: true
    },
    selectedAnswer: mongoose.Schema.Types.Mixed, // Can be string, number, or array
    isCorrect: Boolean,
    pointsEarned: {
      type: Number,
      default: 0
    },
    timeSpent: Number // in seconds
  }],
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative'],
    max: [100, 'Score cannot exceed 100']
  },
  totalPoints: {
    type: Number,
    required: true
  },
  maxPoints: {
    type: Number,
    required: true
  },
  passed: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number,
    required: [true, 'Time spent is required'] // in minutes
  },
  startedAt: {
    type: Date,
    required: [true, 'Start time is required']
  },
  completedAt: {
    type: Date,
    required: [true, 'Completion time is required']
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  feedback: {
    strengths: [String],
    weaknesses: [String],
    recommendations: [String]
  }
}, {
  timestamps: true
});

// Indexes for better performance
quizSchema.index({ course: 1, type: 1 });
quizSchema.index({ difficulty: 1, category: 1 });
quizSchema.index({ isPublished: 1, isActive: 1 });

quizAttemptSchema.index({ user: 1, quiz: 1 });
quizAttemptSchema.index({ user: 1, completedAt: -1 });

// Virtual for total questions count
quizSchema.virtual('totalQuestions').get(function() {
  return this.questions.length;
});

// Virtual for max possible points
quizSchema.virtual('maxPoints').get(function() {
  return this.questions.reduce((total, question) => total + question.points, 0);
});

// Method to calculate score percentage
quizSchema.methods.calculateScore = function(correctAnswers, totalQuestions) {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
};

// Method to get user's best attempt
quizSchema.methods.getUserBestAttempt = function(userId) {
  return mongoose.model('QuizAttempt').findOne({
    user: userId,
    quiz: this._id
  }).sort({ score: -1, completedAt: -1 });
};

// Method to get user's attempts count
quizSchema.methods.getUserAttemptsCount = function(userId) {
  return mongoose.model('QuizAttempt').countDocuments({
    user: userId,
    quiz: this._id
  });
};

// Method to update quiz statistics
quizSchema.methods.updateStats = async function() {
  const QuizAttempt = mongoose.model('QuizAttempt');
  
  const attempts = await QuizAttempt.find({ quiz: this._id });
  
  if (attempts.length === 0) return;
  
  // Calculate average score
  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  this.stats.averageScore = totalScore / attempts.length;
  
  // Calculate average time spent
  const totalTime = attempts.reduce((sum, attempt) => sum + attempt.timeSpent, 0);
  this.stats.averageTimeSpent = totalTime / attempts.length;
  
  // Calculate pass rate
  const passedAttempts = attempts.filter(attempt => attempt.passed).length;
  this.stats.passRate = (passedAttempts / attempts.length) * 100;
  
  this.stats.totalAttempts = attempts.length;
  
  await this.save();
};

// Static method to get quizzes by course
quizSchema.statics.getByCourse = function(courseId) {
  return this.find({
    course: courseId,
    isPublished: true,
    isActive: true
  }).sort({ createdAt: 1 });
};

// Static method to get random practice quiz
quizSchema.statics.getRandomPracticeQuiz = function(difficulty, category) {
  const query = {
    type: 'practice-quiz',
    isPublished: true,
    isActive: true
  };
  
  if (difficulty) query.difficulty = difficulty;
  if (category) query.category = category;
  
  return this.aggregate([
    { $match: query },
    { $sample: { size: 1 } }
  ]);
};

// Pre-save middleware
quizSchema.pre('save', function(next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  this.lastUpdated = new Date();
  next();
});

// Ensure virtual fields are serialized
quizSchema.set('toJSON', { virtuals: true });

// Models
const Quiz = mongoose.model('Quiz', quizSchema);
const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema);

module.exports = { Quiz, QuizAttempt };
