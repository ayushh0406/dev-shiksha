const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const Lesson = require('./src/models/Lesson');
const { Quiz } = require('./src/models/Quiz');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learn-quest')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return enhanceCoursesWithQuizzesAndLessons();
  })
  .then(() => {
    console.log('✅ Enhanced courses with comprehensive quizzes and lessons');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

async function enhanceCoursesWithQuizzesAndLessons() {
  try {
    // Get all existing courses
    const courses = await Course.find({});
    console.log(`📚 Found ${courses.length} courses to enhance`);

    // First, let's enhance lessons to be more informative
    await enhanceLessonsContent();

    // Create comprehensive quizzes for each course
    for (const course of courses) {
      await createQuizForCourse(course);
    }

    console.log('🎉 All courses now have quizzes and enhanced lessons!');
  } catch (error) {
    console.error('Error enhancing courses:', error);
    throw error;
  }
}

async function enhanceLessonsContent() {
  console.log('📝 Enhancing lesson content to be more informative...');
  
  // Get all lessons
  const lessons = await Lesson.find({}).populate('course');
  
  for (const lesson of lessons) {
    const enhancedContent = await enhanceLessonContent(lesson);
    await Lesson.findByIdAndUpdate(lesson._id, enhancedContent);
  }
  
  console.log(`✅ Enhanced ${lessons.length} lessons`);
}

async function enhanceLessonContent(lesson) {
  const courseCategory = lesson.course.category;
  const lessonType = lesson.type;
  
  let enhancedContent = {
    ...lesson.content,
    learningObjectives: getLearningObjectives(lesson.title, courseCategory),
    keyPoints: getKeyPoints(lesson.title, courseCategory),
    practicalExercises: getPracticalExercises(lesson.title, courseCategory),
    realWorldApplications: getRealWorldApplications(lesson.title, courseCategory)
  };

  // Add detailed explanations based on lesson type
  if (lessonType === 'theory') {
    enhancedContent.text = enhanceTheoryContent(lesson.title, lesson.content.text, courseCategory);
  } else if (lessonType === 'code') {
    enhancedContent.code = enhanceCodeContent(lesson.title, lesson.content.code, courseCategory);
  }

  return {
    content: enhancedContent,
    learningObjectives: getLearningObjectives(lesson.title, courseCategory),
    keyPoints: getKeyPoints(lesson.title, courseCategory)
  };
}

function enhanceTheoryContent(title, existingText, category) {
  const baseContent = existingText || `Learn about ${title}`;
  
  return `${baseContent}

## 🎯 Learning Objectives
${getLearningObjectives(title, category).map(obj => `- ${obj}`).join('\n')}

## 🔑 Key Concepts
${getKeyPoints(title, category).map(point => `- ${point}`).join('\n')}

## 🌍 Real-World Applications
${getRealWorldApplications(title, category).map(app => `- ${app}`).join('\n')}

## 💡 Pro Tips
- Practice regularly to reinforce concepts
- Try to implement concepts from scratch
- Connect theory to practical applications
- Ask questions and seek clarification when needed

## 📚 Additional Resources
- Practice problems and exercises
- Video tutorials and demonstrations
- Community discussions and forums
- Official documentation and guides`;
}

function enhanceCodeContent(title, existingCode, category) {
  return {
    ...existingCode,
    explanation: `This lesson covers ${title} with hands-on coding exercises.`,
    bestPractices: [
      "Write clean, readable code",
      "Add meaningful comments",
      "Test your code thoroughly",
      "Consider edge cases",
      "Optimize for performance when needed"
    ],
    commonMistakes: [
      "Not handling edge cases",
      "Poor variable naming",
      "Inefficient algorithms",
      "Lack of error handling"
    ]
  };
}

function getLearningObjectives(title, category) {
  const objectiveMap = {
    'data-structures': [
      "Understand the fundamental concepts and operations",
      "Analyze time and space complexity",
      "Implement efficient algorithms",
      "Apply concepts to real-world problems"
    ],
    'programming': [
      "Master core programming concepts",
      "Write clean, maintainable code",
      "Understand best practices",
      "Build practical applications"
    ],
    'web-development': [
      "Understand modern web technologies",
      "Build responsive user interfaces",
      "Implement full-stack solutions",
      "Deploy applications effectively"
    ],
    'database': [
      "Design efficient database schemas",
      "Write optimized queries",
      "Understand database internals",
      "Implement data modeling best practices"
    ],
    'ai-ml': [
      "Understand machine learning algorithms",
      "Implement ML models from scratch",
      "Apply ML to real-world datasets",
      "Evaluate and optimize model performance"
    ],
    'system-design': [
      "Design scalable systems",
      "Understand distributed systems concepts",
      "Implement reliable architectures",
      "Optimize for performance and reliability"
    ]
  };
  
  return objectiveMap[category] || [
    "Understand core concepts thoroughly",
    "Apply knowledge to practical scenarios",
    "Develop problem-solving skills",
    "Build confidence in the subject area"
  ];
}

function getKeyPoints(title, category) {
  if (title.toLowerCase().includes('array')) {
    return [
      "Arrays store elements in contiguous memory",
      "O(1) access time by index",
      "Dynamic arrays can resize automatically",
      "Useful for implementing other data structures"
    ];
  } else if (title.toLowerCase().includes('linked list')) {
    return [
      "Elements stored in nodes with pointers",
      "Dynamic size allocation",
      "Efficient insertion/deletion at beginning",
      "Sequential access only"
    ];
  } else if (title.toLowerCase().includes('stack')) {
    return [
      "LIFO (Last In, First Out) principle",
      "Push and Pop operations",
      "Used in function calls and recursion",
      "Expression evaluation and parsing"
    ];
  } else if (title.toLowerCase().includes('queue')) {
    return [
      "FIFO (First In, First Out) principle",
      "Enqueue and Dequeue operations",
      "Used in BFS and task scheduling",
      "Important for handling requests"
    ];
  } else if (title.toLowerCase().includes('tree')) {
    return [
      "Hierarchical data structure",
      "Root, parent, child, leaf concepts",
      "Binary trees and BST properties",
      "Traversal algorithms (DFS, BFS)"
    ];
  } else if (title.toLowerCase().includes('graph')) {
    return [
      "Vertices and edges representation",
      "Directed vs undirected graphs",
      "Graph traversal algorithms",
      "Shortest path algorithms"
    ];
  }
  
  return [
    "Fundamental concepts and terminology",
    "Core algorithms and operations",
    "Time and space complexity analysis",
    "Practical implementation techniques"
  ];
}

function getPracticalExercises(title, category) {
  return [
    "Implement the data structure from scratch",
    "Solve related coding problems",
    "Compare different implementation approaches",
    "Optimize for specific use cases"
  ];
}

function getRealWorldApplications(title, category) {
  if (title.toLowerCase().includes('array')) {
    return [
      "Image processing and pixel manipulation",
      "Database indexing systems",
      "Memory management in operating systems",
      "Mathematical computations and matrices"
    ];
  } else if (title.toLowerCase().includes('linked list')) {
    return [
      "Music playlist implementation",
      "Undo functionality in applications",
      "Memory allocation in operating systems",
      "Browser history navigation"
    ];
  } else if (title.toLowerCase().includes('stack')) {
    return [
      "Function call management",
      "Browser back button functionality",
      "Expression evaluation in calculators",
      "Undo/Redo operations in editors"
    ];
  } else if (title.toLowerCase().includes('queue')) {
    return [
      "Print job scheduling",
      "CPU task scheduling",
      "Breadth-first search in navigation",
      "Request handling in web servers"
    ];
  } else if (title.toLowerCase().includes('tree')) {
    return [
      "File system hierarchies",
      "Database indexing (B-trees)",
      "Decision-making algorithms",
      "Syntax parsing in compilers"
    ];
  } else if (title.toLowerCase().includes('graph')) {
    return [
      "Social network connections",
      "GPS navigation systems",
      "Network routing protocols",
      "Recommendation systems"
    ];
  }
  
  return [
    "Software development projects",
    "System optimization tasks",
    "Data processing applications",
    "Algorithm design challenges"
  ];
}

async function createQuizForCourse(course) {
  console.log(`📝 Creating quiz for: ${course.title}`);
  
  // Check if quiz already exists
  const existingQuiz = await Quiz.findOne({ course: course._id });
  if (existingQuiz) {
    console.log(`   ⚠️ Quiz already exists for ${course.title}, skipping...`);
    return;
  }

  const quizData = generateQuizForCourse(course);
  
  try {
    const quiz = new Quiz(quizData);
    await quiz.save();
    console.log(`   ✅ Created quiz for ${course.title}`);
  } catch (error) {
    console.error(`   ❌ Error creating quiz for ${course.title}:`, error.message);
  }
}

function generateQuizForCourse(course) {
  const baseQuiz = {
    title: `${course.title} - Comprehensive Assessment`,
    description: `Test your understanding of ${course.title} concepts`,
    course: course._id,
    type: "course-quiz",
    difficulty: course.difficulty,
    category: course.category,
    timeLimit: 20,
    passingScore: 70,
    xpReward: Math.floor(course.xpReward * 0.3),
    maxAttempts: 3,
    isPublished: true,
    isActive: true
  };

  // Generate questions based on course category
  switch (course.category) {
    case 'data-structures':
      baseQuiz.questions = generateDSAQuestions();
      break;
    case 'system-design':
      baseQuiz.questions = generateSystemDesignQuestions();
      break;
    case 'web-development':
      baseQuiz.questions = generateWebDevQuestions();
      break;
    case 'database':
      baseQuiz.questions = generateDatabaseQuestions();
      break;
    case 'ai-ml':
      baseQuiz.questions = generateMLQuestions();
      break;
    case 'programming':
      baseQuiz.questions = generateProgrammingQuestions();
      break;
    default:
      baseQuiz.questions = generateGeneralQuestions();
  }

  return baseQuiz;
}

function generateDSAQuestions() {
  return [
    {
      question: "What is the time complexity of searching in a balanced Binary Search Tree?",
      type: "multiple-choice",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: true },
        { text: "O(n)", isCorrect: false },
        { text: "O(n²)", isCorrect: false }
      ],
      explanation: "In a balanced BST, the height is log n, making search operations O(log n).",
      points: 2
    },
    {
      question: "Which data structure follows the LIFO (Last In, First Out) principle?",
      type: "multiple-choice",
      options: [
        { text: "Queue", isCorrect: false },
        { text: "Stack", isCorrect: true },
        { text: "Array", isCorrect: false },
        { text: "Linked List", isCorrect: false }
      ],
      explanation: "Stack follows LIFO principle where the last element added is the first to be removed.",
      points: 1
    },
    {
      question: "What is the space complexity of merge sort?",
      type: "multiple-choice",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n)", isCorrect: true },
        { text: "O(n²)", isCorrect: false }
      ],
      explanation: "Merge sort requires O(n) extra space for temporary arrays during merging.",
      points: 2
    },
    {
      question: "In which scenario would you prefer a linked list over an array?",
      type: "multiple-choice",
      options: [
        { text: "When you need random access to elements", isCorrect: false },
        { text: "When memory usage needs to be minimized", isCorrect: false },
        { text: "When frequent insertions/deletions are needed", isCorrect: true },
        { text: "When cache performance is critical", isCorrect: false }
      ],
      explanation: "Linked lists excel at insertions/deletions as they don't require shifting elements.",
      points: 2
    },
    {
      question: "Which algorithm is best for finding shortest paths in a weighted graph?",
      type: "multiple-choice",
      options: [
        { text: "BFS", isCorrect: false },
        { text: "DFS", isCorrect: false },
        { text: "Dijkstra's Algorithm", isCorrect: true },
        { text: "Binary Search", isCorrect: false }
      ],
      explanation: "Dijkstra's algorithm finds shortest paths in weighted graphs with non-negative weights.",
      points: 3
    }
  ];
}

function generateSystemDesignQuestions() {
  return [
    {
      question: "What is the primary purpose of load balancing in system design?",
      type: "multiple-choice",
      options: [
        { text: "To increase database performance", isCorrect: false },
        { text: "To distribute traffic across multiple servers", isCorrect: true },
        { text: "To compress data", isCorrect: false },
        { text: "To encrypt communications", isCorrect: false }
      ],
      explanation: "Load balancing distributes incoming requests across multiple servers to prevent overload.",
      points: 2
    },
    {
      question: "Which pattern is best for handling high-traffic read operations?",
      type: "multiple-choice",
      options: [
        { text: "Database sharding", isCorrect: false },
        { text: "Caching", isCorrect: true },
        { text: "Data compression", isCorrect: false },
        { text: "Load balancing", isCorrect: false }
      ],
      explanation: "Caching stores frequently accessed data in memory for faster retrieval.",
      points: 2
    },
    {
      question: "What does CAP theorem state about distributed systems?",
      type: "multiple-choice",
      options: [
        { text: "You can only guarantee 2 out of 3: Consistency, Availability, Partition tolerance", isCorrect: true },
        { text: "All three properties can be guaranteed simultaneously", isCorrect: false },
        { text: "Only consistency matters in distributed systems", isCorrect: false },
        { text: "Partition tolerance is optional", isCorrect: false }
      ],
      explanation: "CAP theorem states you can only guarantee 2 of 3 properties in a distributed system.",
      points: 3
    },
    {
      question: "Which database type is best for handling relationships between entities?",
      type: "multiple-choice",
      options: [
        { text: "Document database", isCorrect: false },
        { text: "Key-value store", isCorrect: false },
        { text: "Relational database", isCorrect: true },
        { text: "Graph database", isCorrect: false }
      ],
      explanation: "Relational databases excel at handling complex relationships with foreign keys and joins.",
      points: 2
    },
    {
      question: "What is the main benefit of microservices architecture?",
      type: "multiple-choice",
      options: [
        { text: "Reduced complexity", isCorrect: false },
        { text: "Independent deployment and scaling", isCorrect: true },
        { text: "Lower development costs", isCorrect: false },
        { text: "Simplified testing", isCorrect: false }
      ],
      explanation: "Microservices allow independent deployment, scaling, and technology choices for each service.",
      points: 2
    }
  ];
}

function generateWebDevQuestions() {
  return [
    {
      question: "What is the virtual DOM in React?",
      type: "multiple-choice",
      options: [
        { text: "A backup copy of the real DOM", isCorrect: false },
        { text: "A JavaScript representation of the real DOM", isCorrect: true },
        { text: "A server-side rendering technique", isCorrect: false },
        { text: "A database for DOM elements", isCorrect: false }
      ],
      explanation: "Virtual DOM is a JavaScript representation that allows React to optimize DOM updates.",
      points: 2
    },
    {
      question: "Which HTTP method is idempotent?",
      type: "multiple-choice",
      options: [
        { text: "POST", isCorrect: false },
        { text: "PUT", isCorrect: true },
        { text: "PATCH", isCorrect: false },
        { text: "DELETE", isCorrect: false }
      ],
      explanation: "PUT is idempotent - multiple identical requests have the same effect as a single request.",
      points: 2
    },
    {
      question: "What is the purpose of CSS Grid?",
      type: "multiple-choice",
      options: [
        { text: "Creating animations", isCorrect: false },
        { text: "Two-dimensional layout system", isCorrect: true },
        { text: "Styling text", isCorrect: false },
        { text: "Managing colors", isCorrect: false }
      ],
      explanation: "CSS Grid provides a two-dimensional layout system for rows and columns.",
      points: 2
    },
    {
      question: "What is the main difference between let and var in JavaScript?",
      type: "multiple-choice",
      options: [
        { text: "Performance", isCorrect: false },
        { text: "Block vs function scoping", isCorrect: true },
        { text: "Data types supported", isCorrect: false },
        { text: "Memory usage", isCorrect: false }
      ],
      explanation: "let has block scope while var has function scope, preventing common scoping issues.",
      points: 2
    },
    {
      question: "Which tool is commonly used for state management in large React applications?",
      type: "multiple-choice",
      options: [
        { text: "jQuery", isCorrect: false },
        { text: "Redux", isCorrect: true },
        { text: "Bootstrap", isCorrect: false },
        { text: "Webpack", isCorrect: false }
      ],
      explanation: "Redux provides predictable state management for complex React applications.",
      points: 2
    }
  ];
}

function generateDatabaseQuestions() {
  return [
    {
      question: "What is the purpose of database normalization?",
      type: "multiple-choice",
      options: [
        { text: "To increase data redundancy", isCorrect: false },
        { text: "To reduce data redundancy and improve integrity", isCorrect: true },
        { text: "To make queries slower", isCorrect: false },
        { text: "To increase storage space", isCorrect: false }
      ],
      explanation: "Normalization reduces redundancy and maintains data integrity by organizing data efficiently.",
      points: 2
    },
    {
      question: "Which SQL clause is used to filter groups in aggregate queries?",
      type: "multiple-choice",
      options: [
        { text: "WHERE", isCorrect: false },
        { text: "HAVING", isCorrect: true },
        { text: "GROUP BY", isCorrect: false },
        { text: "ORDER BY", isCorrect: false }
      ],
      explanation: "HAVING filters groups after GROUP BY, while WHERE filters individual rows.",
      points: 2
    },
    {
      question: "What is ACID in database transactions?",
      type: "multiple-choice",
      options: [
        { text: "A query optimization technique", isCorrect: false },
        { text: "Properties ensuring reliable transactions", isCorrect: true },
        { text: "A type of database index", isCorrect: false },
        { text: "A backup strategy", isCorrect: false }
      ],
      explanation: "ACID (Atomicity, Consistency, Isolation, Durability) ensures reliable transaction processing.",
      points: 3
    },
    {
      question: "Which type of join returns all records from both tables?",
      type: "multiple-choice",
      options: [
        { text: "INNER JOIN", isCorrect: false },
        { text: "LEFT JOIN", isCorrect: false },
        { text: "RIGHT JOIN", isCorrect: false },
        { text: "FULL OUTER JOIN", isCorrect: true }
      ],
      explanation: "FULL OUTER JOIN returns all records from both tables, with NULLs for non-matching records.",
      points: 2
    },
    {
      question: "What is the primary purpose of database indexing?",
      type: "multiple-choice",
      options: [
        { text: "To increase storage space", isCorrect: false },
        { text: "To improve query performance", isCorrect: true },
        { text: "To backup data", isCorrect: false },
        { text: "To encrypt data", isCorrect: false }
      ],
      explanation: "Indexes create efficient access paths to data, significantly improving query performance.",
      points: 2
    }
  ];
}

function generateMLQuestions() {
  return [
    {
      question: "What is the difference between supervised and unsupervised learning?",
      type: "multiple-choice",
      options: [
        { text: "Supervised uses labeled data, unsupervised doesn't", isCorrect: true },
        { text: "Supervised is faster than unsupervised", isCorrect: false },
        { text: "Supervised uses more data than unsupervised", isCorrect: false },
        { text: "There is no difference", isCorrect: false }
      ],
      explanation: "Supervised learning uses labeled training data, while unsupervised learning finds patterns in unlabeled data.",
      points: 2
    },
    {
      question: "What is overfitting in machine learning?",
      type: "multiple-choice",
      options: [
        { text: "When a model performs poorly on all data", isCorrect: false },
        { text: "When a model memorizes training data but performs poorly on new data", isCorrect: true },
        { text: "When a model is too simple", isCorrect: false },
        { text: "When training takes too long", isCorrect: false }
      ],
      explanation: "Overfitting occurs when a model learns training data too well, failing to generalize to new data.",
      points: 2
    },
    {
      question: "Which algorithm is commonly used for classification problems?",
      type: "multiple-choice",
      options: [
        { text: "Linear Regression", isCorrect: false },
        { text: "Random Forest", isCorrect: true },
        { text: "K-means", isCorrect: false },
        { text: "PCA", isCorrect: false }
      ],
      explanation: "Random Forest is an ensemble method commonly used for both classification and regression.",
      points: 2
    },
    {
      question: "What is the purpose of cross-validation?",
      type: "multiple-choice",
      options: [
        { text: "To increase model complexity", isCorrect: false },
        { text: "To evaluate model performance and prevent overfitting", isCorrect: true },
        { text: "To reduce training time", isCorrect: false },
        { text: "To collect more data", isCorrect: false }
      ],
      explanation: "Cross-validation provides robust model evaluation by testing on multiple data splits.",
      points: 2
    },
    {
      question: "Which metric is best for evaluating a model on imbalanced datasets?",
      type: "multiple-choice",
      options: [
        { text: "Accuracy", isCorrect: false },
        { text: "F1-score", isCorrect: true },
        { text: "Mean Squared Error", isCorrect: false },
        { text: "R-squared", isCorrect: false }
      ],
      explanation: "F1-score balances precision and recall, making it suitable for imbalanced datasets.",
      points: 3
    }
  ];
}

function generateProgrammingQuestions() {
  return [
    {
      question: "What is the main principle of Object-Oriented Programming?",
      type: "multiple-choice",
      options: [
        { text: "Code reusability", isCorrect: false },
        { text: "Encapsulation, Inheritance, Polymorphism", isCorrect: true },
        { text: "Faster execution", isCorrect: false },
        { text: "Smaller file sizes", isCorrect: false }
      ],
      explanation: "OOP is based on encapsulation, inheritance, and polymorphism principles.",
      points: 2
    },
    {
      question: "What is the purpose of version control systems like Git?",
      type: "multiple-choice",
      options: [
        { text: "To compile code", isCorrect: false },
        { text: "To track changes and collaborate on code", isCorrect: true },
        { text: "To run tests", isCorrect: false },
        { text: "To deploy applications", isCorrect: false }
      ],
      explanation: "Version control systems track code changes and enable collaboration among developers.",
      points: 2
    },
    {
      question: "Which programming paradigm focuses on functions as first-class citizens?",
      type: "multiple-choice",
      options: [
        { text: "Object-oriented", isCorrect: false },
        { text: "Functional", isCorrect: true },
        { text: "Procedural", isCorrect: false },
        { text: "Imperative", isCorrect: false }
      ],
      explanation: "Functional programming treats functions as first-class citizens that can be passed as arguments.",
      points: 2
    },
    {
      question: "What is the main benefit of code testing?",
      type: "multiple-choice",
      options: [
        { text: "Faster development", isCorrect: false },
        { text: "Catching bugs early and ensuring code quality", isCorrect: true },
        { text: "Smaller code size", isCorrect: false },
        { text: "Better performance", isCorrect: false }
      ],
      explanation: "Testing helps catch bugs early and ensures code quality and reliability.",
      points: 2
    },
    {
      question: "What is API in software development?",
      type: "multiple-choice",
      options: [
        { text: "A programming language", isCorrect: false },
        { text: "Application Programming Interface", isCorrect: true },
        { text: "A database type", isCorrect: false },
        { text: "A testing framework", isCorrect: false }
      ],
      explanation: "API (Application Programming Interface) defines how different software components communicate.",
      points: 2
    }
  ];
}

function generateGeneralQuestions() {
  return [
    {
      question: "What is the most important skill for a software developer?",
      type: "multiple-choice",
      options: [
        { text: "Memorizing syntax", isCorrect: false },
        { text: "Problem-solving and logical thinking", isCorrect: true },
        { text: "Working fast", isCorrect: false },
        { text: "Using the latest technology", isCorrect: false }
      ],
      explanation: "Problem-solving and logical thinking are fundamental skills that apply across all technologies.",
      points: 2
    },
    {
      question: "Why is continuous learning important in technology?",
      type: "multiple-choice",
      options: [
        { text: "Technology evolves rapidly", isCorrect: true },
        { text: "To impress others", isCorrect: false },
        { text: "It's required by law", isCorrect: false },
        { text: "To increase salary only", isCorrect: false }
      ],
      explanation: "Technology evolves rapidly, making continuous learning essential for staying relevant.",
      points: 2
    },
    {
      question: "What is the best approach to learning a new programming concept?",
      type: "multiple-choice",
      options: [
        { text: "Just reading about it", isCorrect: false },
        { text: "Practicing with hands-on exercises", isCorrect: true },
        { text: "Watching videos only", isCorrect: false },
        { text: "Memorizing examples", isCorrect: false }
      ],
      explanation: "Hands-on practice reinforces learning and builds practical skills.",
      points: 2
    }
  ];
}

// Start the enhancement process
console.log('🚀 Starting course enhancement...');
