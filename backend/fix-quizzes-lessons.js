const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const Lesson = require('./src/models/Lesson');
const { Quiz } = require('./src/models/Quiz');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learn-quest')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return fixQuizzesAndLessons();
  })
  .then(() => {
    console.log('✅ Successfully fixed quizzes and enhanced lessons');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

async function fixQuizzesAndLessons() {
  try {
    console.log('🔧 Starting comprehensive fix...');
    
    // First, let's clean up and recreate quizzes
    await Quiz.deleteMany({});
    console.log('🧹 Cleared existing quizzes');
    
    // Get all courses
    const courses = await Course.find({});
    console.log(`📚 Found ${courses.length} courses`);
    
    // Create quizzes for each course
    for (const course of courses) {
      await createComprehensiveQuiz(course);
    }
    
    // Enhance lesson content
    await enhanceAllLessons();
    
    // Fix lesson counts in courses
    await fixCourseLessonCounts();
    
    console.log('🎉 All fixes completed successfully!');
  } catch (error) {
    console.error('Error in fix process:', error);
    throw error;
  }
}

async function createComprehensiveQuiz(course) {
  console.log(`📝 Creating quiz for: ${course.title}`);
  
  const quizData = {
    title: `${course.title} - Comprehensive Assessment`,
    description: `Test your knowledge of ${course.title} concepts and principles`,
    course: course._id,
    type: "assessment",
    difficulty: course.difficulty,
    category: getCategoryForQuiz(course.category),
    timeLimit: 25,
    passingScore: 70,
    xpReward: Math.floor(course.xpReward * 0.4),
    maxAttempts: 3,
    isPublished: true,
    isActive: true,
    questions: generateQuestionsForCourse(course)
  };
  
  try {
    const quiz = new Quiz(quizData);
    await quiz.save();
    console.log(`   ✅ Created quiz: ${quizData.title}`);
  } catch (error) {
    console.error(`   ❌ Error creating quiz for ${course.title}:`, error.message);
  }
}

function getCategoryForQuiz(courseCategory) {
  const categoryMap = {
    'data-structures': 'data-structures',
    'algorithms': 'algorithms',
    'programming': 'programming',
    'web-development': 'web-development',
    'database': 'database',
    'ai-ml': 'ai-ml',
    'system-design': 'system-design',
    'other': 'programming'
  };
  
  return categoryMap[courseCategory] || 'programming';
}

function generateQuestionsForCourse(course) {
  const courseTitle = course.title.toLowerCase();
  
  if (courseTitle.includes('data structures') || courseTitle.includes('algorithms')) {
    return getDSAQuestions();
  } else if (courseTitle.includes('system design')) {
    return getSystemDesignQuestions();
  } else if (courseTitle.includes('web development') || courseTitle.includes('full stack')) {
    return getWebDevQuestions();
  } else if (courseTitle.includes('database') || courseTitle.includes('sql')) {
    return getDatabaseQuestions();
  } else if (courseTitle.includes('machine learning') || courseTitle.includes('ml')) {
    return getMLQuestions();
  } else if (courseTitle.includes('devops') || courseTitle.includes('cloud')) {
    return getDevOpsQuestions();
  }
  
  return getGeneralProgrammingQuestions();
}

function getDSAQuestions() {
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
      explanation: "In a balanced BST, the height is approximately log n, making search operations O(log n).",
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
      explanation: "Stack follows LIFO principle - the last element added is the first to be removed.",
      points: 1
    },
    {
      question: "What is the space complexity of merge sort algorithm?",
      type: "multiple-choice",
      options: [
        { text: "O(1)", isCorrect: false },
        { text: "O(log n)", isCorrect: false },
        { text: "O(n)", isCorrect: true },
        { text: "O(n²)", isCorrect: false }
      ],
      explanation: "Merge sort requires O(n) extra space for temporary arrays during the merging process.",
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
      explanation: "Linked lists excel at insertions/deletions as they don't require shifting elements like arrays do.",
      points: 2
    },
    {
      question: "Which algorithm is optimal for finding shortest paths in a weighted graph with positive weights?",
      type: "multiple-choice",
      options: [
        { text: "Breadth-First Search (BFS)", isCorrect: false },
        { text: "Depth-First Search (DFS)", isCorrect: false },
        { text: "Dijkstra's Algorithm", isCorrect: true },
        { text: "Binary Search", isCorrect: false }
      ],
      explanation: "Dijkstra's algorithm efficiently finds shortest paths in weighted graphs with non-negative edge weights.",
      points: 3
    },
    {
      question: "What is the average time complexity of quicksort?",
      type: "multiple-choice",
      options: [
        { text: "O(n)", isCorrect: false },
        { text: "O(n log n)", isCorrect: true },
        { text: "O(n²)", isCorrect: false },
        { text: "O(log n)", isCorrect: false }
      ],
      explanation: "Quicksort has an average time complexity of O(n log n), though worst case is O(n²).",
      points: 2
    }
  ];
}

function getSystemDesignQuestions() {
  return [
    {
      question: "What is the primary purpose of load balancing in distributed systems?",
      type: "multiple-choice",
      options: [
        { text: "To increase database storage", isCorrect: false },
        { text: "To distribute incoming requests across multiple servers", isCorrect: true },
        { text: "To compress network traffic", isCorrect: false },
        { text: "To encrypt data transmission", isCorrect: false }
      ],
      explanation: "Load balancing distributes incoming requests across multiple servers to prevent any single server from being overwhelmed.",
      points: 2
    },
    {
      question: "Which technique is most effective for handling high-volume read operations?",
      type: "multiple-choice",
      options: [
        { text: "Database sharding", isCorrect: false },
        { text: "Caching", isCorrect: true },
        { text: "Data compression", isCorrect: false },
        { text: "Load balancing only", isCorrect: false }
      ],
      explanation: "Caching stores frequently accessed data in fast memory, dramatically reducing response times for read operations.",
      points: 2
    },
    {
      question: "According to the CAP theorem, what can a distributed system guarantee?",
      type: "multiple-choice",
      options: [
        { text: "Only 2 out of 3: Consistency, Availability, Partition tolerance", isCorrect: true },
        { text: "All three properties simultaneously", isCorrect: false },
        { text: "Only consistency is important", isCorrect: false },
        { text: "Partition tolerance is always optional", isCorrect: false }
      ],
      explanation: "CAP theorem states that distributed systems can only guarantee 2 of the 3 properties at any given time.",
      points: 3
    },
    {
      question: "What is the main advantage of microservices architecture?",
      type: "multiple-choice",
      options: [
        { text: "Reduced overall system complexity", isCorrect: false },
        { text: "Independent deployment and scaling of services", isCorrect: true },
        { text: "Lower infrastructure costs", isCorrect: false },
        { text: "Simplified debugging and testing", isCorrect: false }
      ],
      explanation: "Microservices allow teams to develop, deploy, and scale services independently, improving agility.",
      points: 2
    },
    {
      question: "Which database pattern is best for handling complex relationships between entities?",
      type: "multiple-choice",
      options: [
        { text: "Document store (NoSQL)", isCorrect: false },
        { text: "Key-value store", isCorrect: false },
        { text: "Relational database (RDBMS)", isCorrect: true },
        { text: "Time-series database", isCorrect: false }
      ],
      explanation: "Relational databases excel at handling complex relationships through foreign keys, joins, and ACID properties.",
      points: 2
    }
  ];
}

function getWebDevQuestions() {
  return [
    {
      question: "What is the virtual DOM in React and why is it useful?",
      type: "multiple-choice",
      options: [
        { text: "A backup copy of the real DOM stored on the server", isCorrect: false },
        { text: "A JavaScript representation of the DOM that enables efficient updates", isCorrect: true },
        { text: "A server-side rendering optimization technique", isCorrect: false },
        { text: "A database for storing DOM element configurations", isCorrect: false }
      ],
      explanation: "Virtual DOM is a JavaScript representation that allows React to calculate optimal DOM updates before applying them.",
      points: 2
    },
    {
      question: "Which HTTP method is considered idempotent?",
      type: "multiple-choice",
      options: [
        { text: "POST", isCorrect: false },
        { text: "PUT", isCorrect: true },
        { text: "PATCH", isCorrect: false },
        { text: "All of the above", isCorrect: false }
      ],
      explanation: "PUT is idempotent - multiple identical PUT requests should have the same effect as a single request.",
      points: 2
    },
    {
      question: "What is the main advantage of CSS Grid over Flexbox?",
      type: "multiple-choice",
      options: [
        { text: "Better browser support", isCorrect: false },
        { text: "Two-dimensional layout control (rows and columns)", isCorrect: true },
        { text: "Faster rendering performance", isCorrect: false },
        { text: "Simpler syntax", isCorrect: false }
      ],
      explanation: "CSS Grid excels at two-dimensional layouts, controlling both rows and columns simultaneously.",
      points: 2
    },
    {
      question: "What is the key difference between 'let' and 'var' in JavaScript?",
      type: "multiple-choice",
      options: [
        { text: "Performance optimization", isCorrect: false },
        { text: "Block scoping vs function scoping", isCorrect: true },
        { text: "Data type compatibility", isCorrect: false },
        { text: "Memory allocation method", isCorrect: false }
      ],
      explanation: "'let' has block scope while 'var' has function scope, preventing common hoisting and scoping issues.",
      points: 2
    },
    {
      question: "What is the purpose of a Content Delivery Network (CDN)?",
      type: "multiple-choice",
      options: [
        { text: "To compile and minify code", isCorrect: false },
        { text: "To cache and serve content from geographically distributed servers", isCorrect: true },
        { text: "To manage database connections", isCorrect: false },
        { text: "To handle user authentication", isCorrect: false }
      ],
      explanation: "CDNs cache content at edge locations worldwide to reduce latency and improve user experience.",
      points: 2
    }
  ];
}

function getDatabaseQuestions() {
  return [
    {
      question: "What is the primary goal of database normalization?",
      type: "multiple-choice",
      options: [
        { text: "To increase data redundancy for backup purposes", isCorrect: false },
        { text: "To reduce data redundancy and improve data integrity", isCorrect: true },
        { text: "To make database queries execute slower", isCorrect: false },
        { text: "To increase storage space requirements", isCorrect: false }
      ],
      explanation: "Normalization eliminates redundancy and maintains data integrity by organizing data into properly structured tables.",
      points: 2
    },
    {
      question: "Which SQL clause is used to filter aggregated results after GROUP BY?",
      type: "multiple-choice",
      options: [
        { text: "WHERE", isCorrect: false },
        { text: "HAVING", isCorrect: true },
        { text: "ORDER BY", isCorrect: false },
        { text: "LIMIT", isCorrect: false }
      ],
      explanation: "HAVING filters groups after aggregation, while WHERE filters individual rows before grouping.",
      points: 2
    },
    {
      question: "What do the ACID properties ensure in database transactions?",
      type: "multiple-choice",
      options: [
        { text: "Faster query execution", isCorrect: false },
        { text: "Reliable and consistent transaction processing", isCorrect: true },
        { text: "Reduced storage space usage", isCorrect: false },
        { text: "Improved network performance", isCorrect: false }
      ],
      explanation: "ACID (Atomicity, Consistency, Isolation, Durability) ensures reliable transaction processing in databases.",
      points: 3
    },
    {
      question: "Which type of database join returns all records from both tables?",
      type: "multiple-choice",
      options: [
        { text: "INNER JOIN", isCorrect: false },
        { text: "LEFT JOIN", isCorrect: false },
        { text: "RIGHT JOIN", isCorrect: false },
        { text: "FULL OUTER JOIN", isCorrect: true }
      ],
      explanation: "FULL OUTER JOIN returns all records from both tables, filling missing matches with NULL values.",
      points: 2
    },
    {
      question: "What is the primary benefit of database indexing?",
      type: "multiple-choice",
      options: [
        { text: "Increased storage capacity", isCorrect: false },
        { text: "Faster query execution", isCorrect: true },
        { text: "Automatic data backup", isCorrect: false },
        { text: "Enhanced data security", isCorrect: false }
      ],
      explanation: "Indexes create efficient access paths to data, significantly improving query performance.",
      points: 2
    }
  ];
}

function getMLQuestions() {
  return [
    {
      question: "What distinguishes supervised learning from unsupervised learning?",
      type: "multiple-choice",
      options: [
        { text: "Supervised learning uses labeled training data", isCorrect: true },
        { text: "Supervised learning is always faster", isCorrect: false },
        { text: "Supervised learning requires more computational power", isCorrect: false },
        { text: "There is no practical difference", isCorrect: false }
      ],
      explanation: "Supervised learning uses labeled examples to learn patterns, while unsupervised learning finds hidden patterns in unlabeled data.",
      points: 2
    },
    {
      question: "What is overfitting in machine learning?",
      type: "multiple-choice",
      options: [
        { text: "When a model performs poorly on all datasets", isCorrect: false },
        { text: "When a model memorizes training data but fails on new data", isCorrect: true },
        { text: "When a model is too simple to capture patterns", isCorrect: false },
        { text: "When training takes too much time", isCorrect: false }
      ],
      explanation: "Overfitting occurs when a model learns training data too specifically, losing the ability to generalize to new data.",
      points: 2
    },
    {
      question: "Which algorithm is commonly used for classification tasks?",
      type: "multiple-choice",
      options: [
        { text: "Linear Regression", isCorrect: false },
        { text: "Random Forest", isCorrect: true },
        { text: "K-means Clustering", isCorrect: false },
        { text: "Principal Component Analysis (PCA)", isCorrect: false }
      ],
      explanation: "Random Forest is an ensemble method that works well for both classification and regression problems.",
      points: 2
    },
    {
      question: "What is the main purpose of cross-validation?",
      type: "multiple-choice",
      options: [
        { text: "To increase model complexity", isCorrect: false },
        { text: "To evaluate model performance and detect overfitting", isCorrect: true },
        { text: "To reduce training time", isCorrect: false },
        { text: "To generate more training data", isCorrect: false }
      ],
      explanation: "Cross-validation provides robust model evaluation by testing performance across multiple data splits.",
      points: 2
    },
    {
      question: "Which evaluation metric is most appropriate for imbalanced classification datasets?",
      type: "multiple-choice",
      options: [
        { text: "Accuracy", isCorrect: false },
        { text: "F1-score", isCorrect: true },
        { text: "Mean Squared Error", isCorrect: false },
        { text: "R-squared", isCorrect: false }
      ],
      explanation: "F1-score balances precision and recall, making it more reliable than accuracy for imbalanced datasets.",
      points: 3
    }
  ];
}

function getDevOpsQuestions() {
  return [
    {
      question: "What is the primary benefit of containerization with Docker?",
      type: "multiple-choice",
      options: [
        { text: "Faster code compilation", isCorrect: false },
        { text: "Consistent environments across development, testing, and production", isCorrect: true },
        { text: "Reduced storage space requirements", isCorrect: false },
        { text: "Automatic code optimization", isCorrect: false }
      ],
      explanation: "Docker containers ensure applications run consistently across different environments by packaging dependencies.",
      points: 2
    },
    {
      question: "What is the main purpose of CI/CD pipelines?",
      type: "multiple-choice",
      options: [
        { text: "To manage database connections", isCorrect: false },
        { text: "To automate code integration, testing, and deployment", isCorrect: true },
        { text: "To monitor server performance", isCorrect: false },
        { text: "To manage user authentication", isCorrect: false }
      ],
      explanation: "CI/CD pipelines automate the process of integrating code changes, running tests, and deploying applications.",
      points: 2
    },
    {
      question: "What is Infrastructure as Code (IaC)?",
      type: "multiple-choice",
      options: [
        { text: "Writing application logic in configuration files", isCorrect: false },
        { text: "Managing infrastructure through version-controlled configuration files", isCorrect: true },
        { text: "Converting code into infrastructure components", isCorrect: false },
        { text: "A programming language for servers", isCorrect: false }
      ],
      explanation: "IaC manages infrastructure through version-controlled configuration files, enabling reproducible and automated deployments.",
      points: 2
    },
    {
      question: "What is the primary advantage of microservices over monolithic architecture?",
      type: "multiple-choice",
      options: [
        { text: "Simpler deployment process", isCorrect: false },
        { text: "Independent scaling and technology choices", isCorrect: true },
        { text: "Lower operational complexity", isCorrect: false },
        { text: "Reduced network latency", isCorrect: false }
      ],
      explanation: "Microservices allow teams to scale and choose technologies independently for each service.",
      points: 2
    },
    {
      question: "What is the purpose of monitoring and alerting in DevOps?",
      type: "multiple-choice",
      options: [
        { text: "To prevent users from accessing the system", isCorrect: false },
        { text: "To proactively detect and respond to system issues", isCorrect: true },
        { text: "To automatically fix all problems", isCorrect: false },
        { text: "To reduce server costs", isCorrect: false }
      ],
      explanation: "Monitoring and alerting help teams proactively identify and respond to issues before they impact users.",
      points: 2
    }
  ];
}

function getGeneralProgrammingQuestions() {
  return [
    {
      question: "What is the most important skill for software developers?",
      type: "multiple-choice",
      options: [
        { text: "Memorizing programming syntax", isCorrect: false },
        { text: "Problem-solving and logical thinking", isCorrect: true },
        { text: "Working with the latest technologies", isCorrect: false },
        { text: "Typing speed", isCorrect: false }
      ],
      explanation: "Problem-solving and logical thinking are fundamental skills that apply across all programming languages and technologies.",
      points: 2
    },
    {
      question: "Why is version control (like Git) essential in software development?",
      type: "multiple-choice",
      options: [
        { text: "To make code run faster", isCorrect: false },
        { text: "To track changes and enable collaboration", isCorrect: true },
        { text: "To automatically test code", isCorrect: false },
        { text: "To deploy applications", isCorrect: false }
      ],
      explanation: "Version control systems track code changes over time and enable multiple developers to collaborate effectively.",
      points: 2
    },
    {
      question: "What is the main principle of Object-Oriented Programming?",
      type: "multiple-choice",
      options: [
        { text: "Writing code as fast as possible", isCorrect: false },
        { text: "Organizing code into objects with encapsulation, inheritance, and polymorphism", isCorrect: true },
        { text: "Using only functions and avoiding classes", isCorrect: false },
        { text: "Minimizing the number of files", isCorrect: false }
      ],
      explanation: "OOP organizes code into objects that encapsulate data and behavior, supporting inheritance and polymorphism.",
      points: 2
    },
    {
      question: "What is the best approach to learning new programming concepts?",
      type: "multiple-choice",
      options: [
        { text: "Only reading documentation", isCorrect: false },
        { text: "Hands-on practice with real projects", isCorrect: true },
        { text: "Watching tutorial videos exclusively", isCorrect: false },
        { text: "Memorizing code examples", isCorrect: false }
      ],
      explanation: "Hands-on practice with real projects reinforces learning and builds practical problem-solving skills.",
      points: 2
    }
  ];
}

async function enhanceAllLessons() {
  console.log('📚 Enhancing lesson content...');
  
  const lessons = await Lesson.find({}).populate('course');
  let enhancedCount = 0;
  
  for (const lesson of lessons) {
    try {
      const enhanced = await enhanceLesson(lesson);
      if (enhanced) {
        enhancedCount++;
      }
    } catch (error) {
      console.error(`Error enhancing lesson ${lesson.title}:`, error.message);
    }
  }
  
  console.log(`   ✅ Enhanced ${enhancedCount} lessons`);
}

async function enhanceLesson(lesson) {
  const courseCategory = lesson.course.category;
  
  // Add learning objectives if missing
  if (!lesson.learningObjectives || lesson.learningObjectives.length === 0) {
    const objectives = generateLearningObjectives(lesson.title, courseCategory);
    
    await Lesson.findByIdAndUpdate(lesson._id, {
      learningObjectives: objectives,
      keyPoints: generateKeyPoints(lesson.title, courseCategory)
    });
    
    return true;
  }
  
  return false;
}

function generateLearningObjectives(title, category) {
  const baseObjectives = [
    "Understand the core concepts and principles",
    "Apply knowledge to practical scenarios",
    "Analyze and solve related problems",
    "Implement solutions effectively"
  ];
  
  if (title.toLowerCase().includes('array')) {
    return [
      "Understand array data structure and its properties",
      "Master array operations and their time complexities",
      "Implement dynamic arrays and understand resizing",
      "Apply arrays to solve algorithmic problems"
    ];
  } else if (title.toLowerCase().includes('linked list')) {
    return [
      "Understand linked list structure and node connections",
      "Implement singly and doubly linked lists",
      "Master insertion, deletion, and traversal operations",
      "Compare linked lists with arrays for different use cases"
    ];
  } else if (title.toLowerCase().includes('stack') || title.toLowerCase().includes('queue')) {
    return [
      "Understand LIFO and FIFO principles",
      "Implement stack and queue data structures",
      "Apply stacks and queues to real-world problems",
      "Analyze time and space complexities"
    ];
  }
  
  return baseObjectives;
}

function generateKeyPoints(title, category) {
  if (title.toLowerCase().includes('array')) {
    return [
      "Arrays store elements in contiguous memory locations",
      "O(1) access time by index",
      "Dynamic arrays can resize automatically",
      "Important for implementing other data structures"
    ];
  } else if (title.toLowerCase().includes('linked list')) {
    return [
      "Elements stored in nodes with pointers",
      "Dynamic size allocation",
      "Efficient insertion/deletion at any position",
      "Sequential access only (no random access)"
    ];
  }
  
  return [
    "Master fundamental concepts",
    "Understand practical applications",
    "Analyze complexity trade-offs",
    "Implement efficient solutions"
  ];
}

async function fixCourseLessonCounts() {
  console.log('🔧 Fixing course lesson counts...');
  
  const courses = await Course.find({});
  
  for (const course of courses) {
    const lessonCount = await Lesson.countDocuments({ 
      course: course._id, 
      isPublished: true, 
      isActive: true 
    });
    
    await Course.findByIdAndUpdate(course._id, {
      totalLessons: lessonCount
    });
    
    console.log(`   ✅ ${course.title}: ${lessonCount} lessons`);
  }
}

console.log('🚀 Starting comprehensive fix...');
