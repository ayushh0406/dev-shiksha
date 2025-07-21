const express = require('express');
const router = express.Router();

// Sample quiz data
const sampleQuizzes = [
  {
    id: 1,
    title: "Bubble Sort Quiz",
    description: "Test your understanding of Bubble Sort algorithm",
    courseId: 2,
    lessonId: 1,
    type: "lesson-quiz",
    difficulty: "Beginner",
    timeLimit: 10, // minutes
    passingScore: 70,
    xpReward: 80,
    questions: [
      {
        id: 1,
        question: "What is the time complexity of Bubble Sort in the worst case?",
        type: "multiple-choice",
        options: [
          { text: "O(n)", isCorrect: false },
          { text: "O(n log n)", isCorrect: false },
          { text: "O(n²)", isCorrect: true },
          { text: "O(2ⁿ)", isCorrect: false }
        ],
        explanation: "Bubble Sort has O(n²) time complexity in the worst case because it uses nested loops to compare and swap elements.",
        points: 1
      },
      {
        id: 2,
        question: "In Bubble Sort, what happens in each pass?",
        type: "multiple-choice",
        options: [
          { text: "The smallest element moves to the beginning", isCorrect: false },
          { text: "The largest element moves to its correct position", isCorrect: true },
          { text: "All elements are sorted", isCorrect: false },
          { text: "Nothing significant happens", isCorrect: false }
        ],
        explanation: "In each pass of Bubble Sort, the largest unsorted element 'bubbles up' to its correct position at the end of the array.",
        points: 1
      },
      {
        id: 3,
        question: "What is the space complexity of Bubble Sort?",
        type: "multiple-choice",
        options: [
          { text: "O(n)", isCorrect: false },
          { text: "O(log n)", isCorrect: false },
          { text: "O(n²)", isCorrect: false },
          { text: "O(1)", isCorrect: true }
        ],
        explanation: "Bubble Sort has O(1) space complexity because it sorts the array in-place, using only a constant amount of extra memory.",
        points: 1
      }
    ]
  }
];

// Sample user attempts (in real app, this would be in database)
const sampleAttempts = [];

// GET /api/quiz - Get all quizzes or filter
router.get('/', (req, res) => {
  try {
    const { courseId, lessonId, type, difficulty } = req.query;
    
    let filteredQuizzes = [...sampleQuizzes];
    
    // Filter by course
    if (courseId) {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.courseId === parseInt(courseId)
      );
    }
    
    // Filter by lesson
    if (lessonId) {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.lessonId === parseInt(lessonId)
      );
    }
    
    // Filter by type
    if (type) {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.type === type
      );
    }
    
    // Filter by difficulty
    if (difficulty) {
      filteredQuizzes = filteredQuizzes.filter(quiz => 
        quiz.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      data: filteredQuizzes,
      total: filteredQuizzes.length,
      message: 'Quizzes retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving quizzes',
      error: error.message
    });
  }
});

// GET /api/quiz/:id - Get specific quiz
router.get('/:id', (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Remove correct answers from questions for security
    const quizForUser = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        type: q.type,
        options: q.options.map(opt => ({ text: opt.text })), // Remove isCorrect
        points: q.points
      }))
    };
    
    res.json({
      success: true,
      data: quizForUser,
      message: 'Quiz retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving quiz',
      error: error.message
    });
  }
});

// POST /api/quiz/:id/attempt - Start a new quiz attempt
router.post('/:id/attempt', (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const { userId } = req.body;
    
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }
    
    // Check if user has reached max attempts
    const userAttempts = sampleAttempts.filter(a => 
      a.userId === userId && a.quizId === quizId
    );
    
    if (userAttempts.length >= quiz.maxAttempts) {
      return res.status(400).json({
        success: false,
        message: `Maximum attempts (${quiz.maxAttempts}) reached for this quiz`
      });
    }
    
    const attemptId = Date.now(); // Simple ID generation
    const newAttempt = {
      id: attemptId,
      userId,
      quizId,
      attemptNumber: userAttempts.length + 1,
      startedAt: new Date().toISOString(),
      status: 'in-progress'
    };
    
    sampleAttempts.push(newAttempt);
    
    res.json({
      success: true,
      data: {
        attemptId,
        quiz: {
          ...quiz,
          questions: quiz.questions.map(q => ({
            id: q.id,
            question: q.question,
            type: q.type,
            options: q.options.map(opt => ({ text: opt.text })),
            points: q.points
          }))
        }
      },
      message: 'Quiz attempt started successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error starting quiz attempt',
      error: error.message
    });
  }
});

// POST /api/quiz/:id/submit - Submit quiz answers
router.post('/:id/submit', (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const { userId, attemptId, answers } = req.body;
    
    const quiz = sampleQuizzes.find(q => q.id === quizId);
    const attempt = sampleAttempts.find(a => a.id === attemptId);
    
    if (!quiz || !attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz or attempt not found'
      });
    }
    
    // Calculate score
    let correctAnswers = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    const detailedResults = answers.map(answer => {
      const question = quiz.questions.find(q => q.id === answer.questionId);
      if (!question) return null;
      
      totalPoints += question.points;
      
      let isCorrect = false;
      if (question.type === 'multiple-choice') {
        const correctOption = question.options.find(opt => opt.isCorrect);
        isCorrect = answer.selectedAnswer === correctOption.text;
      }
      
      if (isCorrect) {
        correctAnswers++;
        earnedPoints += question.points;
      }
      
      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.options.find(opt => opt.isCorrect)?.text,
        isCorrect,
        explanation: question.explanation,
        pointsEarned: isCorrect ? question.points : 0
      };
    }).filter(Boolean);
    
    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= quiz.passingScore;
    const xpEarned = passed ? quiz.xpReward : Math.floor(quiz.xpReward * 0.5);
    
    // Update attempt
    attempt.status = 'completed';
    attempt.completedAt = new Date().toISOString();
    attempt.score = score;
    attempt.passed = passed;
    attempt.answers = detailedResults;
    attempt.xpEarned = xpEarned;
    
    res.json({
      success: true,
      data: {
        score,
        passed,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        xpEarned,
        passingScore: quiz.passingScore,
        detailedResults,
        feedback: {
          message: passed ? 'Congratulations! You passed the quiz!' : 'Keep practicing! You can retake the quiz.',
          suggestions: score < 50 ? ['Review the lesson material', 'Practice more examples'] : ['Good job! Try advanced topics']
        }
      },
      message: 'Quiz submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting quiz',
      error: error.message
    });
  }
});

// GET /api/quiz/:id/attempts/:userId - Get user's attempts for a quiz
router.get('/:id/attempts/:userId', (req, res) => {
  try {
    const quizId = parseInt(req.params.id);
    const userId = req.params.userId;
    
    const userAttempts = sampleAttempts.filter(a => 
      a.userId === userId && a.quizId === quizId
    ).sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
    
    res.json({
      success: true,
      data: userAttempts,
      total: userAttempts.length,
      message: 'User attempts retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user attempts',
      error: error.message
    });
  }
});

module.exports = router;
