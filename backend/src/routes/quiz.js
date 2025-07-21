const express = require('express');
const router = express.Router();

// Sample quiz data with interactive elements
const sampleQuizzes = [
  {
    id: 1,
    title: "🚂 Train System Quiz - Linked Lists Master!",
    description: "🎯 Test your train conductor skills! Master linked lists through fun scenarios!",
    courseId: 2,
    lessonId: 1,
    type: "interactive-quiz",
    difficulty: "Beginner",
    timeLimit: 15, // minutes
    passingScore: 70,
    xpReward: 120,
    theme: "train", // For custom styling
    questions: [
      {
        id: 1,
        question: "🚂 Your train has cars: Engine -> [Alice] -> [Bob] -> [Charlie] -> End. If you add [David] at the front, what's the new order?",
        type: "visual-multiple-choice",
        scenario: "train-addition",
        options: [
          { text: "Engine -> [David] -> [Alice] -> [Bob] -> [Charlie] -> End", isCorrect: true },
          { text: "Engine -> [Alice] -> [Bob] -> [Charlie] -> [David] -> End", isCorrect: false },
          { text: "Engine -> [Alice] -> [David] -> [Bob] -> [Charlie] -> End", isCorrect: false },
          { text: "The train explodes! 💥", isCorrect: false }
        ],
        explanation: "🎯 Perfect! When you add a car at the front, it becomes the new head (right after the engine). This is like inserting at the beginning of a linked list!",
        visualAid: {
          type: "train-animation",
          before: "Engine -> [Alice] -> [Bob] -> [Charlie] -> End",
          after: "Engine -> [David] -> [Alice] -> [Bob] -> [Charlie] -> End",
          operation: "insertAtFront"
        },
        points: 2
      },
      {
        id: 2,
        question: "🔄 Time to reverse your train! If your current train is: Engine -> [A] -> [B] -> [C] -> End, what happens after reversing?",
        type: "interactive-coding",
        scenario: "train-reversal",
        options: [
          { text: "Engine -> [C] -> [B] -> [A] -> End", isCorrect: true },
          { text: "Engine -> [A] -> [B] -> [C] -> End", isCorrect: false },
          { text: "End -> [A] -> [B] -> [C] -> Engine", isCorrect: false },
          { text: "The train goes backward physically 🚂💨", isCorrect: false }
        ],
        explanation: "🔄 Excellent! Reversing a linked list means changing all the pointer directions. The last element becomes first!",
        codeChallenge: {
          prompt: "Complete the train reversal function:",
          starterCode: `void reverseTrain() {
    TrainCar* prev = nullptr;
    TrainCar* current = engine;
    TrainCar* next = nullptr;
    
    while (current) {
        // Your code here!
    }
    engine = prev;
}`,
          solution: `next = current->nextCar;
current->nextCar = prev;
prev = current;
current = next;`
        },
        points: 3
      },
      {
        id: 3,
        question: "🔍 Detective Time! You're searching for passenger 'Bob' in your train. Which traversal method will you use?",
        type: "scenario-based",
        scenario: "passenger-search",
        options: [
          { text: "Start from engine and check each car one by one", isCorrect: true },
          { text: "Check random cars hoping to find Bob", isCorrect: false },
          { text: "Ask all passengers to shout their names at once", isCorrect: false },
          { text: "Use magic 🪄", isCorrect: false }
        ],
        explanation: "🔍 Smart detective work! In a linked list, you must traverse sequentially from the head until you find your target. No random access like arrays!",
        interactiveDemo: {
          type: "search-animation",
          description: "Watch how we search through the train car by car!"
        },
        points: 2
      }
    ]
  },
  {
    id: 2,
    title: "🍽️ Restaurant Rush Quiz - Stacks & Queues Master!",
    description: "⚡ Handle the lunch rush! Test your stack and queue management skills!",
    courseId: 2,
    lessonId: 2,
    type: "interactive-quiz",
    difficulty: "Intermediate", 
    timeLimit: 12,
    passingScore: 75,
    xpReward: 150,
    theme: "restaurant",
    questions: [
      {
        id: 1,
        question: "🥞 Your plate stack has: [Bottom] Dinner | Salad | Dessert [Top]. Chef needs a plate! Which one does he get?",
        type: "visual-multiple-choice",
        scenario: "plate-stack",
        options: [
          { text: "Dessert plate (top of stack)", isCorrect: true },
          { text: "Dinner plate (bottom of stack)", isCorrect: false },
          { text: "Salad plate (middle)", isCorrect: false },
          { text: "Chef makes his own plate 🍽️", isCorrect: false }
        ],
        explanation: "🥞 Perfect! Stacks follow LIFO (Last In, First Out). The chef always takes the top plate - that's the dessert plate!",
        visualAid: {
          type: "stack-animation",
          operation: "pop",
          stackState: ["Dinner", "Salad", "Dessert"]
        },
        points: 2
      },
      {
        id: 2,
        question: "👥 Customer queue: [Front] Alice -> Bob -> Charlie [Back]. Who gets served first?",
        type: "queue-simulation",
        scenario: "customer-service",
        options: [
          { text: "Alice (front of queue)", isCorrect: true },
          { text: "Charlie (back of queue)", isCorrect: false },
          { text: "Bob (middle)", isCorrect: false },
          { text: "Whoever tips the most 💰", isCorrect: false }
        ],
        explanation: "👥 Excellent! Queues follow FIFO (First In, First Out). Alice came first, so she gets served first. Fair and square!",
        gameElement: {
          type: "queue-simulator",
          description: "Try serving customers in the right order!"
        },
        points: 2
      },
      {
        id: 3,
        question: "⚡ RUSH HOUR! 3 orders came in fast: Burger, Pizza, Pasta. Kitchen uses a stack to process orders. Which gets cooked first?",
        type: "emergency-scenario",
        scenario: "rush-hour",
        options: [
          { text: "Pasta (latest order, top of stack)", isCorrect: true },
          { text: "Burger (first order, bottom of stack)", isCorrect: false },
          { text: "Pizza (middle order)", isCorrect: false },
          { text: "All at once! Multi-tasking! 🤹‍♂️", isCorrect: false }
        ],
        explanation: "⚡ Great crisis management! Kitchen stack processes latest orders first (LIFO). Pasta is the newest order, so it gets priority during rush hour!",
        rushHourChallenge: {
          type: "time-pressure-game",
          description: "Handle 10 orders in 30 seconds using proper stack operations!"
        },
        points: 3
      }
    ]
  },
  {
    id: 3,
    title: "👨‍👩‍👧‍👦 Family Tree Quiz - Trees & BST Master!",
    description: "🌳 Test your genealogy skills! Navigate family trees like a pro!",
    courseId: 2,
    lessonId: 3,
    type: "interactive-quiz",
    difficulty: "Advanced",
    timeLimit: 18,
    passingScore: 80,
    xpReward: 200,
    theme: "family-tree",
    questions: [
      {
        id: 1,
        question: "🌳 In the Smith family tree, Grandpa (85) is the root. Where would you place Uncle Bob (60) in a BST organized by age?",
        type: "tree-placement",
        scenario: "family-insertion",
        familyTree: {
          root: { name: "Grandpa", age: 85 },
          structure: "BST_by_age"
        },
        options: [
          { text: "Left child of Grandpa (60 < 85)", isCorrect: true },
          { text: "Right child of Grandpa (60 > 85)", isCorrect: false },
          { text: "As a sibling of Grandpa", isCorrect: false },
          { text: "Uncle Bob doesn't belong in trees! 🌳❌", isCorrect: false }
        ],
        explanation: "🌳 Perfect genealogy skills! In a BST organized by age, younger members (60) go to the left of older members (85). Uncle Bob becomes Grandpa's left child!",
        treeVisualization: {
          type: "animated-insertion",
          showProcess: true
        },
        points: 3
      },
      {
        id: 2,
        question: "🎉 Family Reunion! You want to visit all family members from youngest to oldest. Which traversal will you use?",
        type: "traversal-strategy",
        scenario: "family-reunion",
        options: [
          { text: "Inorder traversal (Left -> Root -> Right)", isCorrect: true },
          { text: "Preorder traversal (Root -> Left -> Right)", isCorrect: false },
          { text: "Postorder traversal (Left -> Right -> Root)", isCorrect: false },
          { text: "Random visits - surprise everyone! 🎊", isCorrect: false }
        ],
        explanation: "🎉 Brilliant reunion planning! Inorder traversal of a BST visits nodes in sorted order. For age-based BST, this means youngest to oldest!",
        traversalDemo: {
          type: "family-reunion-simulator",
          showVisitOrder: true,
          highlightTraversal: "inorder"
        },
        points: 3
      },
      {
        id: 3,
        question: "🔍 Emergency! You need to find 'Little Timmy' in a family tree of 100 members. What's the advantage of using a BST?",
        type: "efficiency-analysis",
        scenario: "emergency-search",
        options: [
          { text: "O(log n) search time - much faster than linear search!", isCorrect: true },
          { text: "O(n) search time - same as checking everyone", isCorrect: false },
          { text: "O(n²) search time - slower than linear search", isCorrect: false },
          { text: "Timmy will find you first! 👶", isCorrect: false }
        ],
        explanation: "🔍 Excellent emergency response! BST allows O(log n) search by eliminating half the possibilities at each step. Much faster than checking all 100 family members!",
        complexityVisualization: {
          type: "search-comparison",
          showLinearVsBST: true,
          familySize: 100
        },
        points: 4
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
