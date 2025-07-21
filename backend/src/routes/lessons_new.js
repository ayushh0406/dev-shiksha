const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// Get all lessons with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      courseId,
      type,
      difficulty,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = { isPublished: true, isActive: true };
    
    if (courseId) {
      filter.course = courseId;
    }
    
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get lessons with pagination
    const lessons = await Lesson.find(filter)
      .populate('course', 'title')
      .sort({ course: 1, order: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Lesson.countDocuments(filter);
    
    res.json({
      success: true,
      data: lessons,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lessons',
      error: error.message
    });
  }
});

// Get lessons by course ID
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const lessons = await Lesson.find({
      course: courseId,
      isPublished: true,
      isActive: true
    }).sort({ order: 1 });
    
    res.json({
      success: true,
      data: lessons
    });
  } catch (error) {
    console.error('Error fetching lessons by course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lessons',
      error: error.message
    });
  }
});

// Get lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const lesson = await Lesson.findById(id)
      .populate('course', 'title category difficulty');
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    if (!lesson.isPublished || !lesson.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not available'
      });
    }
    
    res.json({
      success: true,
      data: lesson
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lesson',
      error: error.message
    });
  }
});

// Mark lesson as completed (would require authentication in production)
router.post('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, score } = req.body;
    
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    // In a real app, you'd update user progress here
    // For now, just return success
    res.json({
      success: true,
      message: 'Lesson marked as completed',
      data: {
        lessonId: id,
        xpEarned: lesson.xpReward,
        score: score || 100
      }
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete lesson',
      error: error.message
    });
  }
});

module.exports = router;
