const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedLessons: [{
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    timeSpent: {
      type: Number, // in minutes
      default: 0
    },
    attempts: {
      type: Number,
      default: 1
    }
  }],
  currentLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  totalXP: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number, // in minutes
    default: 0
  },
  quizzesPassed: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
userProgressSchema.index({ user: 1, course: 1 }, { unique: true });

// Virtual for completion percentage
userProgressSchema.virtual('completionPercentage').get(function() {
  if (!this.populated('course') || !this.course.totalLessons) {
    return 0;
  }
  return (this.completedLessons.length / this.course.totalLessons) * 100;
});

// Method to add completed lesson
userProgressSchema.methods.addCompletedLesson = function(lessonId, score = 100, timeSpent = 0) {
  // Check if lesson already completed
  const existingIndex = this.completedLessons.findIndex(
    cl => cl.lesson.toString() === lessonId.toString()
  );
  
  if (existingIndex > -1) {
    // Update existing completion
    this.completedLessons[existingIndex].score = Math.max(
      this.completedLessons[existingIndex].score, 
      score
    );
    this.completedLessons[existingIndex].attempts += 1;
  } else {
    // Add new completion
    this.completedLessons.push({
      lesson: lessonId,
      score,
      timeSpent,
      completedAt: new Date()
    });
  }
  
  this.totalTimeSpent += timeSpent;
  this.lastAccessed = new Date();
  
  return this.save();
};

// Method to check if lesson is completed
userProgressSchema.methods.isLessonCompleted = function(lessonId) {
  return this.completedLessons.some(
    cl => cl.lesson.toString() === lessonId.toString()
  );
};

module.exports = mongoose.model('UserProgress', userProgressSchema);
