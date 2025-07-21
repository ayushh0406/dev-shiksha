const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// Get all courses with optional filtering
router.get('/', async (req, res) => {
  try {
    const {
      language,
      difficulty,
      category,
      search,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const filter = { isPublished: true, isActive: true };
    
    if (language && language !== 'all') {
      filter.language = language;
    }
    
    if (difficulty && difficulty !== 'all') {
      filter.difficulty = difficulty;
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Get courses with pagination
    const courses = await Course.find(filter)
      .select('-instructor -createdAt -updatedAt')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Course.countDocuments(filter);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const course = await Course.findById(id)
      .select('-instructor -createdAt -updatedAt');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    if (!course.isPublished || !course.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Course not available'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: error.message
    });
  }
});

// Get courses by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const courses = await Course.find({
      category: category,
      isPublished: true,
      isActive: true
    }).select('-instructor -createdAt -updatedAt');
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
});

// Get courses by difficulty
router.get('/difficulty/:difficulty', async (req, res) => {
  try {
    const { difficulty } = req.params;
    
    const courses = await Course.find({
      difficulty: difficulty,
      isPublished: true,
      isActive: true
    }).select('-instructor -createdAt -updatedAt');
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses by difficulty:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message
    });
  }
});

module.exports = router;
