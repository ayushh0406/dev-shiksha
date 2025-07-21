const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// Get user progress for a specific course
router.get('/course/:courseId/user/:userId', async (req, res) => {
  try {
    const { courseId, userId } = req.params;
    
    let progress = await UserProgress.findOne({
      user: userId,
      course: courseId
    }).populate('completedLessons.lesson', 'title order xpReward');
    
    if (!progress) {
      // Create new progress record
      progress = new UserProgress({
        user: userId,
        course: courseId,
        completedLessons: [],
        totalXP: 0
      });
      await progress.save();
    }
    
    // Get total lessons count for this course
    const totalLessons = await Lesson.countDocuments({ 
      course: courseId,
      isPublished: true,
      isActive: true 
    });
    
    res.json({
      success: true,
      data: {
        ...progress.toObject(),
        totalLessons,
        completionPercentage: totalLessons > 0 ? (progress.completedLessons.length / totalLessons) * 100 : 0
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message
    });
  }
});

// Update lesson completion
router.post('/lesson/:lessonId/complete', async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { userId, score = 100, timeSpent = 0 } = req.body;
    
    // Get lesson details
    const lesson = await Lesson.findById(lessonId).populate('course');
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }
    
    // Find or create user progress
    let progress = await UserProgress.findOne({
      user: userId,
      course: lesson.course._id
    });
    
    if (!progress) {
      progress = new UserProgress({
        user: userId,
        course: lesson.course._id,
        completedLessons: [],
        totalXP: 0
      });
    }
    
    // Add completed lesson
    const wasAlreadyCompleted = progress.isLessonCompleted(lessonId);
    await progress.addCompletedLesson(lessonId, score, timeSpent);
    
    // Add XP only if lesson wasn't completed before
    if (!wasAlreadyCompleted) {
      progress.totalXP += lesson.xpReward;
    }
    
    // Update current lesson to next lesson
    const nextLesson = await Lesson.findOne({
      course: lesson.course._id,
      order: lesson.order + 1
    });
    
    if (nextLesson) {
      progress.currentLesson = nextLesson._id;
    }
    
    await progress.save();
    
    res.json({
      success: true,
      data: progress,
      xpEarned: wasAlreadyCompleted ? 0 : lesson.xpReward,
      nextLesson: nextLesson ? nextLesson._id : null
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing lesson',
      error: error.message
    });
  }
});

// Get user's overall progress
router.get('/user/:userId/overview', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const progressRecords = await UserProgress.find({ user: userId })
      .populate('course', 'title thumbnail')
      .populate('completedLessons.lesson', 'title xpReward');
    
    const overview = {
      totalCourses: progressRecords.length,
      completedCourses: progressRecords.filter(p => p.isCompleted).length,
      totalXP: progressRecords.reduce((sum, p) => sum + p.totalXP, 0),
      totalTimeSpent: progressRecords.reduce((sum, p) => sum + p.totalTimeSpent, 0),
      recentProgress: progressRecords
        .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))
        .slice(0, 5)
    };
    
    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    console.error('Error fetching user overview:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user overview',
      error: error.message
    });
  }
});

// Reset course progress
router.delete('/course/:courseId/user/:userId', async (req, res) => {
  try {
    const { courseId, userId } = req.params;
    
    await UserProgress.findOneAndDelete({
      user: userId,
      course: courseId
    });
    
    res.json({
      success: true,
      message: 'Course progress reset successfully'
    });
  } catch (error) {
    console.error('Error resetting progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting progress',
      error: error.message
    });
  }
});

module.exports = router;
