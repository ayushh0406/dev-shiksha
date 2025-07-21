const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['data-structures', 'algorithms', 'programming', 'web-development', 'database', 'ai-ml', 'system-design', 'other']
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  language: {
    type: String,
    required: [true, 'Programming language is required'],
    enum: ['javascript', 'python', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'dsa', 'sql', 'html-css', 'other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    default: 'Code'
  },
  color: {
    type: String,
    default: 'bg-blue-500'
  },
  estimatedTime: {
    hours: {
      type: Number,
      required: [true, 'Estimated hours is required'],
      min: [0.5, 'Estimated time must be at least 0.5 hours']
    },
    minutes: {
      type: Number,
      default: 0,
      min: 0,
      max: 59
    }
  },
  xpReward: {
    type: Number,
    required: [true, 'XP reward is required'],
    min: [10, 'XP reward must be at least 10'],
    max: [1000, 'XP reward cannot exceed 1000']
  },
  prerequisites: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    title: String
  }],
  learningObjectives: [{
    type: String,
    required: [true, 'At least one learning objective is required']
  }],
  syllabus: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    lessons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    estimatedTime: Number // in minutes
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  stats: {
    enrolledStudents: {
      type: Number,
      default: 0
    },
    completedStudents: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    averageCompletionTime: {
      type: Number,
      default: 0 // in hours
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
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

// Indexes for better query performance
courseSchema.index({ category: 1, difficulty: 1, language: 1 });
courseSchema.index({ 'stats.averageRating': -1 });
courseSchema.index({ 'stats.enrolledStudents': -1 });
courseSchema.index({ isPublished: 1, isActive: 1 });

// Virtual for formatted estimated time
courseSchema.virtual('formattedEstimatedTime').get(function() {
  const hours = this.estimatedTime.hours;
  const minutes = this.estimatedTime.minutes;
  
  if (hours >= 1) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${minutes}m`;
});

// Virtual for completion rate
courseSchema.virtual('completionRate').get(function() {
  if (this.stats.enrolledStudents === 0) return 0;
  return ((this.stats.completedStudents / this.stats.enrolledStudents) * 100).toFixed(1);
});

// Method to update average rating
courseSchema.methods.updateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.stats.averageRating = 0;
    this.stats.totalRatings = 0;
    return;
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.stats.averageRating = (totalRating / this.reviews.length).toFixed(1);
  this.stats.totalRatings = this.reviews.length;
};

// Pre-save middleware to update averageRating
courseSchema.pre('save', function(next) {
  if (this.isModified('reviews')) {
    this.updateAverageRating();
  }
  
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  this.lastUpdated = new Date();
  next();
});

// Static method to get popular courses
courseSchema.statics.getPopularCourses = function(limit = 10) {
  return this.find({ isPublished: true, isActive: true })
    .sort({ 'stats.enrolledStudents': -1, 'stats.averageRating': -1 })
    .limit(limit)
    .populate('instructor', 'username profile.firstName profile.lastName');
};

// Static method to get recommended courses based on user preferences
courseSchema.statics.getRecommendedCourses = function(userPreferences, limit = 5) {
  const query = {
    isPublished: true,
    isActive: true
  };

  if (userPreferences.language && userPreferences.language !== 'other') {
    query.language = userPreferences.language;
  }

  if (userPreferences.difficulty) {
    query.difficulty = userPreferences.difficulty;
  }

  return this.find(query)
    .sort({ 'stats.averageRating': -1, 'stats.enrolledStudents': -1 })
    .limit(limit)
    .populate('instructor', 'username profile.firstName profile.lastName');
};

// Ensure virtual fields are serialized
courseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', courseSchema);
