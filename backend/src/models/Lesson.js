const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Lesson description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course reference is required']
  },
  order: {
    type: Number,
    required: [true, 'Lesson order is required'],
    min: [1, 'Order must be at least 1']
  },
  type: {
    type: String,
    required: [true, 'Lesson type is required'],
    enum: ['theory', 'visual', 'code', 'quiz', 'project', 'interactive']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  estimatedTime: {
    type: Number,
    required: [true, 'Estimated time is required'],
    min: [1, 'Estimated time must be at least 1 minute']
  },
  xpReward: {
    type: Number,
    required: [true, 'XP reward is required'],
    min: [5, 'XP reward must be at least 5'],
    max: [200, 'XP reward cannot exceed 200']
  },
  content: {
    text: {
      type: String,
      required: function() {
        return this.type === 'theory' || this.type === 'visual';
      }
    },
    code: {
      language: {
        type: String,
        enum: ['javascript', 'python', 'java', 'cpp', 'c', 'sql', 'html', 'css']
      },
      starterCode: String,
      solutionCode: String,
      testCases: [{
        input: String,
        expectedOutput: String,
        description: String
      }]
    },
    media: {
      images: [String],
      videos: [String],
      diagrams: [String]
    },
    interactive: {
      steps: [{
        title: String,
        description: String,
        code: String,
        explanation: String
      }]
    }
  },
  prerequisites: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    title: String
  }],
  learningObjectives: [{
    type: String,
    required: [true, 'At least one learning objective is required']
  }],
  keyPoints: [String],
  tags: [String],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['documentation', 'tutorial', 'video', 'article', 'book']
    }
  }],
  quiz: {
    questions: [{
      question: {
        type: String,
        required: true
      },
      options: [{
        type: String,
        required: true
      }],
      correct: {
        type: Number,
        required: true,
        min: 0
      },
      explanation: String,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
      }
    }],
    passingScore: {
      type: Number,
      default: 70,
      min: 0,
      max: 100
    }
  },
  stats: {
    viewCount: {
      type: Number,
      default: 0
    },
    completionCount: {
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
    difficultyRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
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

// Indexes for better performance
lessonSchema.index({ course: 1, order: 1 });
lessonSchema.index({ type: 1, difficulty: 1 });
lessonSchema.index({ isPublished: 1, isActive: 1 });

// Virtual for completion rate
lessonSchema.virtual('completionRate').get(function() {
  if (this.stats.viewCount === 0) return 0;
  return ((this.stats.completionCount / this.stats.viewCount) * 100).toFixed(1);
});

// Method to increment view count
lessonSchema.methods.incrementView = function() {
  this.stats.viewCount += 1;
  return this.save();
};

// Method to mark as completed
lessonSchema.methods.markCompleted = function(score = null, timeSpent = null) {
  this.stats.completionCount += 1;
  
  if (score !== null) {
    const totalScore = this.stats.averageScore * (this.stats.completionCount - 1) + score;
    this.stats.averageScore = totalScore / this.stats.completionCount;
  }
  
  if (timeSpent !== null) {
    const totalTime = this.stats.averageTimeSpent * (this.stats.completionCount - 1) + timeSpent;
    this.stats.averageTimeSpent = totalTime / this.stats.completionCount;
  }
  
  return this.save();
};

// Static method to get lessons by course
lessonSchema.statics.getByCourse = function(courseId, includeUnpublished = false) {
  const query = { course: courseId };
  
  if (!includeUnpublished) {
    query.isPublished = true;
    query.isActive = true;
  }
  
  return this.find(query)
    .sort({ order: 1 })
    .populate('course', 'title difficulty language');
};

// Static method to get next lesson
lessonSchema.statics.getNextLesson = function(courseId, currentOrder) {
  return this.findOne({
    course: courseId,
    order: { $gt: currentOrder },
    isPublished: true,
    isActive: true
  }).sort({ order: 1 });
};

// Static method to get previous lesson
lessonSchema.statics.getPreviousLesson = function(courseId, currentOrder) {
  return this.findOne({
    course: courseId,
    order: { $lt: currentOrder },
    isPublished: true,
    isActive: true
  }).sort({ order: -1 });
};

// Pre-save middleware
lessonSchema.pre('save', function(next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  this.lastUpdated = new Date();
  next();
});

// Ensure virtual fields are serialized
lessonSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Lesson', lessonSchema);
