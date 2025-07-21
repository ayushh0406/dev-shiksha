const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const Lesson = require('./src/models/Lesson');
const { Quiz } = require('./src/models/Quiz');
const User = require('./src/models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return seedDatabase();
  })
  .then(() => {
    console.log('✅ Database seeded successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    await User.deleteMany({});
    
    console.log('🧹 Cleared existing data');

    // Technical Engineering Courses
    const courses = [
      {
        title: "Data Structures & Algorithms Fundamentals",
        description: "Master fundamental data structures and algorithms essential for software engineering interviews and efficient problem solving",
        shortDescription: "Complete DSA course covering arrays, linked lists, trees, graphs, sorting, and searching algorithms",
        category: "data-structures",
        difficulty: "intermediate",
        language: "cpp",
        tags: ["data-structures", "algorithms", "cpp", "problem-solving", "interview-prep"],
        icon: "Code",
        color: "bg-blue-500",
        estimatedTime: { hours: 8, minutes: 0 },
        xpReward: 600,
        learningObjectives: [
          "Master fundamental data structures (arrays, linked lists, stacks, queues)",
          "Implement tree and graph data structures",
          "Understand sorting and searching algorithms",
          "Analyze time and space complexity",
          "Solve coding interview problems efficiently"
        ],
        syllabus: [
          {
            title: "Arrays and Strings",
            description: "Dynamic arrays, two-pointer technique, sliding window",
            estimatedTime: 90
          },
          {
            title: "Linked Lists",
            description: "Singly, doubly linked lists, cycle detection",
            estimatedTime: 75
          },
          {
            title: "Stacks and Queues",
            description: "Implementation and applications",
            estimatedTime: 60
          },
          {
            title: "Trees and Binary Search Trees",
            description: "Tree traversal, BST operations, balanced trees",
            estimatedTime: 120
          },
          {
            title: "Graphs and Graph Algorithms",
            description: "BFS, DFS, shortest path, topological sort",
            estimatedTime: 135
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      },
      {
        title: "System Design Essentials",
        description: "Learn how to design scalable distributed systems including databases, caching, load balancing, and microservices architecture",
        shortDescription: "Complete system design course for building large-scale applications",
        category: "system-design",
        difficulty: "advanced",
        language: "other",
        tags: ["system-design", "scalability", "distributed-systems", "architecture", "databases"],
        icon: "Brain",
        color: "bg-purple-500",
        estimatedTime: { hours: 10, minutes: 0 },
        xpReward: 800,
        learningObjectives: [
          "Design scalable web applications",
          "Understand distributed systems concepts",
          "Master database design and sharding",
          "Learn caching strategies and CDNs",
          "Design microservices architecture"
        ],
        syllabus: [
          {
            title: "System Design Fundamentals",
            description: "Scalability, reliability, availability concepts",
            estimatedTime: 90
          },
          {
            title: "Database Design and Scaling",
            description: "SQL vs NoSQL, sharding, replication",
            estimatedTime: 120
          },
          {
            title: "Caching and CDNs",
            description: "Redis, Memcached, content delivery networks",
            estimatedTime: 90
          },
          {
            title: "Load Balancing and API Design",
            description: "Load balancers, REST APIs, rate limiting",
            estimatedTime: 105
          },
          {
            title: "Microservices and Message Queues",
            description: "Service architecture, Kafka, RabbitMQ",
            estimatedTime: 195
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      },
      {
        title: "Full Stack Web Development",
        description: "Build modern web applications using React, Node.js, Express, and MongoDB with authentication, deployment, and testing",
        shortDescription: "Complete MERN stack development course",
        category: "web-development",
        difficulty: "intermediate",
        language: "javascript",
        tags: ["react", "nodejs", "mongodb", "express", "fullstack", "javascript"],
        icon: "Database",
        color: "bg-green-500",
        estimatedTime: { hours: 12, minutes: 0 },
        xpReward: 750,
        learningObjectives: [
          "Build React applications with hooks and state management",
          "Create RESTful APIs with Node.js and Express",
          "Design and implement MongoDB databases",
          "Implement user authentication and authorization",
          "Deploy applications to cloud platforms"
        ],
        syllabus: [
          {
            title: "Frontend Development with React",
            description: "Components, hooks, state management, routing",
            estimatedTime: 180
          },
          {
            title: "Backend API Development",
            description: "Express.js, middleware, authentication",
            estimatedTime: 150
          },
          {
            title: "Database Design and Integration",
            description: "MongoDB, Mongoose, data modeling",
            estimatedTime: 120
          },
          {
            title: "Authentication and Security",
            description: "JWT, OAuth, security best practices",
            estimatedTime: 90
          },
          {
            title: "Testing and Deployment",
            description: "Unit testing, integration tests, AWS/Heroku deployment",
            estimatedTime: 180
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      },
      {
        title: "DevOps and Cloud Engineering",
        description: "Master containerization, CI/CD pipelines, cloud services, and infrastructure as code for modern software deployment",
        shortDescription: "Complete DevOps course covering Docker, Kubernetes, AWS, and automation",
        category: "other",
        difficulty: "advanced",
        language: "other",
        tags: ["devops", "docker", "kubernetes", "aws", "cicd", "infrastructure"],
        icon: "Brain",
        color: "bg-orange-500",
        estimatedTime: { hours: 9, minutes: 0 },
        xpReward: 700,
        learningObjectives: [
          "Containerize applications with Docker",
          "Orchestrate containers with Kubernetes",
          "Build CI/CD pipelines with GitHub Actions",
          "Deploy and manage cloud infrastructure",
          "Implement monitoring and logging solutions"
        ],
        syllabus: [
          {
            title: "Containerization with Docker",
            description: "Docker fundamentals, Dockerfile, Docker Compose",
            estimatedTime: 105
          },
          {
            title: "Container Orchestration",
            description: "Kubernetes basics, pods, services, deployments",
            estimatedTime: 135
          },
          {
            title: "CI/CD Pipelines",
            description: "GitHub Actions, automated testing, deployment",
            estimatedTime: 90
          },
          {
            title: "Cloud Services and Infrastructure",
            description: "AWS services, Terraform, infrastructure as code",
            estimatedTime: 120
          },
          {
            title: "Monitoring and Security",
            description: "Prometheus, Grafana, security best practices",
            estimatedTime: 90
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      },
      {
        title: "Machine Learning Engineering",
        description: "Learn to build, train, and deploy machine learning models with Python, TensorFlow, and MLOps practices",
        shortDescription: "Complete ML engineering course from data preprocessing to model deployment",
        category: "ai-ml",
        difficulty: "advanced",
        language: "python",
        tags: ["machine-learning", "python", "tensorflow", "mlops", "data-science"],
        icon: "Brain",
        color: "bg-teal-500",
        estimatedTime: { hours: 11, minutes: 0 },
        xpReward: 850,
        learningObjectives: [
          "Understand machine learning algorithms and theory",
          "Preprocess and analyze datasets",
          "Build and train neural networks with TensorFlow",
          "Deploy ML models to production",
          "Implement MLOps best practices"
        ],
        syllabus: [
          {
            title: "ML Fundamentals and Data Preprocessing",
            description: "Linear regression, data cleaning, feature engineering",
            estimatedTime: 120
          },
          {
            title: "Supervised Learning Algorithms",
            description: "Classification, regression, decision trees, ensemble methods",
            estimatedTime: 135
          },
          {
            title: "Deep Learning with TensorFlow",
            description: "Neural networks, CNNs, RNNs, training optimization",
            estimatedTime: 165
          },
          {
            title: "Model Evaluation and Optimization",
            description: "Cross-validation, hyperparameter tuning, model selection",
            estimatedTime: 90
          },
          {
            title: "ML Model Deployment and MLOps",
            description: "API deployment, Docker, monitoring, version control",
            estimatedTime: 150
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      },
      {
        title: "Database Systems and SQL Mastery",
        description: "Master relational databases, SQL optimization, database design, and advanced topics like indexing and transactions",
        shortDescription: "Complete database course covering SQL, design patterns, and optimization",
        category: "database",
        difficulty: "intermediate",
        language: "sql",
        tags: ["sql", "database", "postgresql", "optimization", "design"],
        icon: "Database",
        color: "bg-red-500",
        estimatedTime: { hours: 7, minutes: 0 },
        xpReward: 550,
        learningObjectives: [
          "Write complex SQL queries and joins",
          "Design normalized database schemas",
          "Optimize query performance and indexing",
          "Understand transactions and ACID properties",
          "Work with stored procedures and triggers"
        ],
        syllabus: [
          {
            title: "SQL Fundamentals",
            description: "SELECT, INSERT, UPDATE, DELETE, basic joins",
            estimatedTime: 90
          },
          {
            title: "Advanced SQL Queries",
            description: "Complex joins, subqueries, window functions",
            estimatedTime: 105
          },
          {
            title: "Database Design and Normalization",
            description: "ER diagrams, normal forms, schema design",
            estimatedTime: 75
          },
          {
            title: "Performance Optimization",
            description: "Indexing strategies, query optimization, execution plans",
            estimatedTime: 90
          },
          {
            title: "Advanced Database Topics",
            description: "Transactions, stored procedures, triggers, security",
            estimatedTime: 60
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      }
    ];

    // Insert courses
    const savedCourses = await Course.insertMany(courses);
    console.log(`📚 Created ${savedCourses.length} engineering courses`);

    // Create detailed lessons for each course
    console.log('📝 Creating lessons for each course...');

    // DSA Course Lessons
    const dsaCourse = savedCourses.find(c => c.title.includes("Data Structures"));
    const dsaLessons = [
      {
        title: "Introduction to Arrays and Dynamic Arrays",
        description: "Learn about static and dynamic arrays, basic operations, and time complexity analysis",
        course: dsaCourse._id,
        order: 1,
        type: "theory",
        difficulty: "beginner",
        estimatedTime: 45,
        xpReward: 50,
        content: {
          text: `Arrays are fundamental data structures that store elements in contiguous memory locations.

**Key Concepts:**
• Static vs Dynamic Arrays
• Index-based access (O(1))
• Insertion and deletion operations
• Memory layout and cache efficiency

**Time Complexities:**
• Access: O(1)
• Search: O(n)
• Insertion: O(n) worst case, O(1) amortized for dynamic arrays
• Deletion: O(n)

**Common Applications:**
• Storing collections of data
• Implementing other data structures
• Matrix operations
• Buffer management`,
        },
        learningObjectives: [
          "Understand array memory layout",
          "Analyze time and space complexity",
          "Implement basic array operations"
        ],
        keyPoints: [
          "Arrays provide O(1) random access",
          "Dynamic arrays automatically resize",
          "Insertion/deletion at arbitrary positions is O(n)"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "Array Algorithms: Two Pointers and Sliding Window",
        description: "Master the two-pointer technique and sliding window pattern for efficient array problem solving",
        course: dsaCourse._id,
        order: 2,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 60,
        xpReward: 75,
        content: {
          text: `Learn powerful array manipulation techniques used in coding interviews.`,
          code: {
            language: "cpp",
            starterCode: `#include <vector>
#include <iostream>
using namespace std;

// Two Sum Problem - Find two numbers that add up to target
vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}

// Sliding Window Maximum - Find maximum in each window of size k
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    // Your code here
    return {};
}`,
            solutionCode: `#include <vector>
#include <unordered_map>
#include <deque>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,
            testCases: [
              {
                input: "nums = [2,7,11,15], target = 9",
                expectedOutput: "[0,1]",
                description: "Two Sum example"
              },
              {
                input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
                expectedOutput: "[3,3,5,5,6,7]",
                description: "Sliding window maximum example"
              }
            ]
          }
        },
        learningObjectives: [
          "Master two-pointer technique",
          "Understand sliding window pattern",
          "Solve array problems efficiently"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "Linked Lists: Implementation and Operations",
        description: "Learn to implement singly and doubly linked lists with all basic operations",
        course: dsaCourse._id,
        order: 3,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 75,
        xpReward: 80,
        content: {
          text: `Linked lists are linear data structures where elements are stored in nodes, each containing data and a reference to the next node.`,
          code: {
            language: "cpp",
            starterCode: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedList {
private:
    ListNode* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    // Insert at the beginning
    void insertAtHead(int val) {
        // Your code here
    }
    
    // Insert at the end
    void insertAtTail(int val) {
        // Your code here
    }
    
    // Delete a node with given value
    void deleteNode(int val) {
        // Your code here
    }
    
    // Reverse the linked list
    void reverse() {
        // Your code here
    }
    
    // Display the list
    void display() {
        // Your code here
    }
};`,
            solutionCode: `class LinkedList {
private:
    ListNode* head;
    
public:
    LinkedList() : head(nullptr) {}
    
    void insertAtHead(int val) {
        ListNode* newNode = new ListNode(val);
        newNode->next = head;
        head = newNode;
    }
    
    void insertAtTail(int val) {
        ListNode* newNode = new ListNode(val);
        if (!head) {
            head = newNode;
            return;
        }
        ListNode* current = head;
        while (current->next) {
            current = current->next;
        }
        current->next = newNode;
    }
    
    void deleteNode(int val) {
        if (!head) return;
        
        if (head->val == val) {
            ListNode* temp = head;
            head = head->next;
            delete temp;
            return;
        }
        
        ListNode* current = head;
        while (current->next && current->next->val != val) {
            current = current->next;
        }
        
        if (current->next) {
            ListNode* temp = current->next;
            current->next = current->next->next;
            delete temp;
        }
    }
    
    void reverse() {
        ListNode* prev = nullptr;
        ListNode* current = head;
        ListNode* next = nullptr;
        
        while (current) {
            next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
    
    void display() {
        ListNode* current = head;
        while (current) {
            cout << current->val << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};`
          }
        },
        learningObjectives: [
          "Implement linked list operations",
          "Understand pointer manipulation",
          "Compare with array trade-offs"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "Stacks and Queues Implementation",
        description: "Learn stack and queue data structures with practical implementations and applications",
        course: dsaCourse._id,
        order: 4,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 70,
        xpReward: 85,
        content: {
          text: "Master stack and queue data structures and their real-world applications."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Trees and Binary Search Trees",
        description: "Understand tree structures, binary trees, BST operations, and tree traversals",
        course: dsaCourse._id,
        order: 5,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 90,
        xpReward: 100,
        content: {
          text: "Learn tree data structures and implement efficient search operations."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Graph Algorithms and BFS/DFS",
        description: "Master graph representations and fundamental graph algorithms",
        course: dsaCourse._id,
        order: 6,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 110,
        xpReward: 120,
        content: {
          text: "Explore graph algorithms including breadth-first and depth-first search."
        },
        isPublished: true,
        isActive: true
      }
    ];

    const savedDsaLessons = await Lesson.insertMany(dsaLessons);
    console.log(`📖 Created ${savedDsaLessons.length} DSA lessons`);

    // System Design Course Lessons
    const systemDesignCourse = savedCourses.find(c => c.title.includes("System Design"));
    const systemDesignLessons = [
      {
        title: "Scalability Fundamentals",
        description: "Understanding horizontal vs vertical scaling, load balancing, and system architecture principles",
        course: systemDesignCourse._id,
        order: 1,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 60,
        xpReward: 70,
        content: {
          text: `System scalability is the ability to handle increased load by adding resources to the system.

**Types of Scaling:**

**Vertical Scaling (Scale Up)**
• Adding more power (CPU, RAM) to existing machines
• Pros: Simple, no application changes needed
• Cons: Hardware limits, single point of failure
• Example: Upgrading from 8GB to 32GB RAM

**Horizontal Scaling (Scale Out)**
• Adding more machines to the pool of resources
• Pros: Virtually unlimited scaling, fault tolerance
• Cons: Complex application design, data consistency challenges
• Example: Adding more web servers behind a load balancer

**Key Principles:**
• Stateless services for easy horizontal scaling
• Database sharding and replication
• Caching strategies (Redis, Memcached)
• Content Delivery Networks (CDNs)
• Message queues for async processing

**Load Balancing Strategies:**
• Round Robin: Requests distributed equally
• Least Connections: Route to server with fewest active connections
• IP Hash: Route based on client IP
• Geographic: Route based on client location`,
        },
        learningObjectives: [
          "Understand scaling strategies",
          "Learn load balancing techniques",
          "Design fault-tolerant systems"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "Database Design and Sharding",
        description: "Learn database scaling techniques including replication, sharding, and choosing between SQL and NoSQL",
        course: systemDesignCourse._id,
        order: 2,
        type: "theory",
        difficulty: "advanced",
        estimatedTime: 90,
        xpReward: 90,
        content: {
          text: `Database scaling is crucial for handling large amounts of data and high traffic.

**Database Replication:**
• Master-Slave: One write node, multiple read replicas
• Master-Master: Multiple write nodes with conflict resolution
• Use cases: Read-heavy applications, geographic distribution

**Database Sharding:**
• Horizontal partitioning of data across multiple databases
• Sharding strategies:
  - Range-based: Partition by data range (e.g., user ID 1-1000)
  - Hash-based: Use hash function to determine shard
  - Directory-based: Lookup service to find data location

**SQL vs NoSQL:**

**SQL Databases (RDBMS)**
• ACID properties (Atomicity, Consistency, Isolation, Durability)
• Complex queries with JOINs
• Strong consistency
• Examples: PostgreSQL, MySQL
• Use cases: Financial systems, traditional applications

**NoSQL Databases**
• Eventual consistency
• Horizontal scaling
• Flexible schema
• Types:
  - Document: MongoDB, CouchDB
  - Key-Value: Redis, DynamoDB
  - Column-family: Cassandra, HBase
  - Graph: Neo4j, Amazon Neptune

**CAP Theorem:**
You can only guarantee 2 out of 3:
• Consistency: All nodes see the same data simultaneously
• Availability: System remains operational
• Partition tolerance: System continues despite network failures`,
        },
        learningObjectives: [
          "Design scalable database architectures",
          "Choose appropriate database technologies",
          "Implement sharding strategies"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "Caching Strategies and CDN",
        description: "Learn caching mechanisms, Redis, Memcached, and Content Delivery Networks",
        course: systemDesignCourse._id,
        order: 3,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 75,
        xpReward: 85,
        content: {
          text: "Master caching strategies to improve application performance and user experience."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Microservices Architecture",
        description: "Design microservices architecture with service communication and API gateways",
        course: systemDesignCourse._id,
        order: 4,
        type: "theory",
        difficulty: "advanced",
        estimatedTime: 100,
        xpReward: 110,
        content: {
          text: "Learn to design and implement microservices architecture for scalable applications."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Message Queues and Event-Driven Architecture",
        description: "Implement asynchronous communication using message queues and event streaming",
        course: systemDesignCourse._id,
        order: 5,
        type: "theory",
        difficulty: "advanced",
        estimatedTime: 85,
        xpReward: 95,
        content: {
          text: "Master asynchronous communication patterns using message queues and event systems."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "System Design Case Studies",
        description: "Design real-world systems: social media, e-commerce, and messaging platforms",
        course: systemDesignCourse._id,
        order: 6,
        type: "theory",
        difficulty: "advanced",
        estimatedTime: 120,
        xpReward: 130,
        content: {
          text: "Apply system design principles to build large-scale applications like Twitter, Amazon, and WhatsApp."
        },
        isPublished: true,
        isActive: true
      }
    ];

    const savedSystemLessons = await Lesson.insertMany(systemDesignLessons);
    console.log(`🏗️ Created ${savedSystemLessons.length} System Design lessons`);

    // 3. Full Stack Web Development Course Lessons
    const webDevCourse = savedCourses.find(c => c.title.includes("Full Stack"));
    const webDevLessons = [
      {
        title: "React Fundamentals and JSX",
        description: "Learn React basics, components, JSX syntax, and virtual DOM concepts",
        course: webDevCourse._id,
        order: 1,
        type: "code",
        difficulty: "beginner",
        estimatedTime: 90,
        xpReward: 85,
        content: {
          text: "Learn React fundamentals including components, JSX, and the virtual DOM."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "React Hooks and State Management",
        description: "Master useState, useEffect, useContext, and custom hooks for state management",
        course: webDevCourse._id,
        order: 2,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 110,
        xpReward: 120,
        content: {
          text: "Master React hooks for effective state management in modern React applications."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "React Router and Navigation",
        description: "Implement client-side routing with React Router for single-page applications",
        course: webDevCourse._id,
        order: 3,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 75,
        xpReward: 80,
        content: {
          text: "Implement navigation and routing in React applications using React Router."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Node.js and Express Setup",
        description: "Set up Node.js backend with Express framework, middleware, and routing",
        course: webDevCourse._id,
        order: 4,
        type: "code",
        difficulty: "beginner",
        estimatedTime: 85,
        xpReward: 90,
        content: {
          text: "Set up a robust backend server using Node.js and Express framework."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "RESTful API Development",
        description: "Build RESTful APIs with CRUD operations, error handling, and validation",
        course: webDevCourse._id,
        order: 5,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 120,
        xpReward: 130,
        content: {
          text: "Build complete RESTful APIs with proper CRUD operations and error handling."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "MongoDB and Database Integration",
        description: "Connect to MongoDB, design schemas with Mongoose, and implement database operations",
        course: webDevCourse._id,
        order: 6,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 100,
        xpReward: 110,
        content: {
          text: "Integrate MongoDB database with your backend using Mongoose ODM."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Authentication with JWT",
        description: "Implement user authentication using JSON Web Tokens and bcrypt for password hashing",
        course: webDevCourse._id,
        order: 7,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 95,
        xpReward: 105,
        content: {
          text: "Implement secure user authentication using JWT tokens and bcrypt hashing."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Testing and Deployment",
        description: "Write unit tests with Jest, integration tests, and deploy to Heroku/AWS",
        course: webDevCourse._id,
        order: 8,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 135,
        xpReward: 145,
        content: {
          text: "Learn testing strategies and deployment options for full-stack applications."
        },
        isPublished: true,
        isActive: true
      }
    ];

    const savedWebDevLessons = await Lesson.insertMany(webDevLessons);
    console.log(`💻 Created ${savedWebDevLessons.length} Web Development lessons`);

    // 4. DevOps Course Lessons
    const devOpsCourse = savedCourses.find(c => c.title.includes("DevOps"));
    const devOpsLessons = [
      {
        title: "Docker Fundamentals",
        description: "Learn containerization with Docker: images, containers, Dockerfile, and Docker Compose",
        course: devOpsCourse._id,
        order: 1,
        type: "code",
        difficulty: "beginner",
        estimatedTime: 95,
        xpReward: 100,
        content: {
          text: "Master Docker containerization for modern application deployment and development."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Container Orchestration with Kubernetes",
        description: "Deploy and manage containers with Kubernetes: pods, services, deployments, and scaling",
        course: devOpsCourse._id,
        order: 2,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 140,
        xpReward: 160,
        content: {
          text: "Learn Kubernetes for orchestrating containerized applications at scale."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "CI/CD with GitHub Actions",
        description: "Build automated CI/CD pipelines with GitHub Actions for testing and deployment",
        course: devOpsCourse._id,
        order: 3,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 110,
        xpReward: 120,
        content: {
          text: "Implement continuous integration and deployment pipelines using GitHub Actions."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "AWS Cloud Services",
        description: "Learn AWS fundamentals: EC2, S3, RDS, Lambda, and basic cloud architecture",
        course: devOpsCourse._id,
        order: 4,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 125,
        xpReward: 135,
        content: {
          text: "Explore Amazon Web Services and learn to deploy applications on the cloud."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Infrastructure as Code with Terraform",
        description: "Manage cloud infrastructure with Terraform: providers, resources, and state management",
        course: devOpsCourse._id,
        order: 5,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 115,
        xpReward: 125,
        content: {
          text: "Learn Infrastructure as Code principles using Terraform for cloud resource management."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Monitoring and Logging",
        description: "Implement monitoring with Prometheus, Grafana, and centralized logging solutions",
        course: devOpsCourse._id,
        order: 6,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 90,
        xpReward: 95,
        content: {
          text: "Set up comprehensive monitoring and logging for production applications."
        },
        isPublished: true,
        isActive: true
      }
    ];

    const savedDevOpsLessons = await Lesson.insertMany(devOpsLessons);
    console.log(`⚙️ Created ${savedDevOpsLessons.length} DevOps lessons`);

    // 5. Machine Learning Course Lessons
    const mlCourse = savedCourses.find(c => c.title.includes("Machine Learning"));
    const mlLessons = [
      {
        title: "ML Fundamentals and Linear Regression",
        description: "Introduction to machine learning concepts, supervised learning, and linear regression implementation",
        course: mlCourse._id,
        order: 1,
        type: "theory",
        difficulty: "beginner",
        estimatedTime: 105,
        xpReward: 110,
        content: {
          text: "Learn the fundamentals of machine learning and implement linear regression algorithms."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Data Preprocessing and Feature Engineering",
        description: "Clean and prepare data: handling missing values, scaling, encoding, and feature selection",
        course: mlCourse._id,
        order: 2,
        type: "code",
        difficulty: "beginner",
        estimatedTime: 95,
        xpReward: 100,
        content: {
          text: "Master data preprocessing techniques essential for successful machine learning projects."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Classification Algorithms",
        description: "Implement classification models: logistic regression, decision trees, and random forests",
        course: mlCourse._id,
        order: 3,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 120,
        xpReward: 130,
        content: {
          text: "Build and evaluate classification models using various machine learning algorithms."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Neural Networks with TensorFlow",
        description: "Build and train neural networks using TensorFlow and Keras for deep learning",
        course: mlCourse._id,
        order: 4,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 150,
        xpReward: 170,
        content: {
          text: "Dive into deep learning with TensorFlow and build sophisticated neural network models."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Model Evaluation and Validation",
        description: "Learn cross-validation, metrics evaluation, and hyperparameter tuning techniques",
        course: mlCourse._id,
        order: 5,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 85,
        xpReward: 90,
        content: {
          text: "Learn techniques for evaluating model performance and optimizing hyperparameters."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "ML Model Deployment",
        description: "Deploy ML models using Flask APIs, Docker containers, and cloud platforms",
        course: mlCourse._id,
        order: 6,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 130,
        xpReward: 145,
        content: {
          text: "Learn to deploy machine learning models to production environments."
        },
        isPublished: true,
        isActive: true
      }
    ];

    const savedMlLessons = await Lesson.insertMany(mlLessons);
    console.log(`🤖 Created ${savedMlLessons.length} Machine Learning lessons`);

    // 6. Database/SQL Course Lessons
    const dbCourse = savedCourses.find(c => c.title.includes("Database"));
    const dbLessons = [
      {
        title: "SQL Basics and Data Types",
        description: "Learn SQL fundamentals: SELECT, INSERT, UPDATE, DELETE operations and data types",
        course: dbCourse._id,
        order: 1,
        type: "code",
        difficulty: "beginner",
        estimatedTime: 80,
        xpReward: 75,
        content: {
          text: "Master fundamental SQL operations for creating, reading, updating, and deleting data."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "JOINs and Relationships",
        description: "Master different types of JOINs: INNER, LEFT, RIGHT, FULL OUTER and table relationships",
        course: dbCourse._id,
        order: 2,
        type: "code",
        difficulty: "intermediate",
        estimatedTime: 95,
        xpReward: 100,
        content: {
          text: "Learn advanced SQL techniques including complex joins and table relationships."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Advanced SQL Queries",
        description: "Learn subqueries, window functions, CTEs, and complex query optimization",
        course: dbCourse._id,
        order: 3,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 110,
        xpReward: 120,
        content: {
          text: "Master advanced SQL query techniques including subqueries and window functions."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Database Design and Normalization",
        description: "Design efficient database schemas using ER diagrams and normalization principles",
        course: dbCourse._id,
        order: 4,
        type: "theory",
        difficulty: "intermediate",
        estimatedTime: 90,
        xpReward: 95,
        content: {
          text: "Learn database design principles and normalization techniques for efficient data storage."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Indexing and Performance Optimization",
        description: "Optimize database performance with proper indexing strategies and query analysis",
        course: dbCourse._id,
        order: 5,
        type: "theory",
        difficulty: "advanced",
        estimatedTime: 85,
        xpReward: 90,
        content: {
          text: "Learn database optimization techniques including indexing strategies and query performance."
        },
        isPublished: true,
        isActive: true
      },
      {
        title: "Stored Procedures and Transactions",
        description: "Implement stored procedures, functions, triggers, and understand ACID transactions",
        course: dbCourse._id,
        order: 6,
        type: "code",
        difficulty: "advanced",
        estimatedTime: 100,
        xpReward: 110,
        content: {
          text: "Master advanced database features including stored procedures and transaction management."
        },
        isPublished: true,
        isActive: true
      }
    ];

    const savedDbLessons = await Lesson.insertMany(dbLessons);
    console.log(`🗃️ Created ${savedDbLessons.length} Database lessons`);

    // Create sample quizzes
    const sampleQuizzes = [
      {
        title: "Arrays and Time Complexity Quiz",
        description: "Test your understanding of array operations and time complexity analysis",
        course: dsaCourse._id,
        type: "lesson-quiz",
        difficulty: "intermediate",
        category: "data-structures",
        timeLimit: 15,
        passingScore: 70,
        xpReward: 100,
        questions: [
          {
            question: "What is the time complexity of accessing an element in an array by index?",
            type: "multiple-choice",
            options: [
              { text: "O(1)", isCorrect: true },
              { text: "O(log n)", isCorrect: false },
              { text: "O(n)", isCorrect: false },
              { text: "O(n²)", isCorrect: false }
            ],
            explanation: "Array access by index is O(1) because arrays store elements in contiguous memory locations, allowing direct calculation of memory address.",
            points: 1
          },
          {
            question: "In the worst case, what is the time complexity of inserting an element at the beginning of a dynamic array?",
            type: "multiple-choice",
            options: [
              { text: "O(1)", isCorrect: false },
              { text: "O(log n)", isCorrect: false },
              { text: "O(n)", isCorrect: true },
              { text: "O(n log n)", isCorrect: false }
            ],
            explanation: "Inserting at the beginning requires shifting all existing elements one position to the right, which takes O(n) time.",
            points: 1
          },
          {
            question: "Which technique is most efficient for finding two numbers in a sorted array that sum to a target?",
            type: "multiple-choice",
            options: [
              { text: "Brute force nested loops", isCorrect: false },
              { text: "Two pointers technique", isCorrect: true },
              { text: "Binary search", isCorrect: false },
              { text: "Hash table", isCorrect: false }
            ],
            explanation: "Two pointers technique works optimally on sorted arrays, achieving O(n) time complexity compared to O(n²) brute force.",
            points: 1
          }
        ],
        isPublished: true,
        isActive: true
      }
    ];

    const savedQuizzes = await Quiz.insertMany(sampleQuizzes);
    console.log(`❓ Created ${savedQuizzes.length} quizzes`);

    // Sample engineering user
    const engineeringUser = new User({
      username: "engineer_alex",
      email: "alex@engineer.com",
      password: "securepass123",
      profile: {
        firstName: "Alex",
        lastName: "Engineer",
        bio: "Software engineer passionate about system design and algorithms"
      },
      progress: {
        totalXP: 850,
        level: 8,
        completedCourses: [
          {
            courseId: dsaCourse._id,
            completedAt: new Date(),
            finalScore: 92
          }
        ],
        completedLessons: [
          {
            lessonId: savedDsaLessons[0]._id,
            completedAt: new Date(),
            score: 95
          },
          {
            lessonId: savedDsaLessons[1]._id,
            completedAt: new Date(),
            score: 88
          }
        ],
        badges: [
          {
            name: "Algorithm Master",
            description: "Complete all DSA fundamentals",
            icon: "🧮"
          },
          {
            name: "Code Warrior",
            description: "Solve 50+ coding problems",
            icon: "⚔️"
          },
          {
            name: "System Architect",
            description: "Complete system design course",
            icon: "🏗️"
          }
        ],
        streakDays: 21
      },
      analytics: {
        topicsProgress: [
          { topic: "Data Structures", score: 92 },
          { topic: "Algorithms", score: 89 },
          { topic: "System Design", score: 78 },
          { topic: "Database Design", score: 85 },
          { topic: "Web Development", score: 76 }
        ],
        timeSpent: {
          total: 480, // 8 hours
          weekly: 120 // 2 hours per week
        },
        loginStreak: {
          current: 21,
          longest: 35
        }
      },
      preferences: {
        language: "cpp",
        difficulty: "advanced",
        learningGoals: ["system-design", "algorithms", "interview-prep"]
      }
    });

    const savedEngineerUser = await engineeringUser.save();
    console.log(`👨‍� Created engineering user: ${savedEngineerUser.username}`);

    // Update course statistics with realistic engineering data
    for (let course of savedCourses) {
      course.stats.enrolledStudents = Math.floor(Math.random() * 2000) + 500; // 500-2500 students
      course.stats.completedStudents = Math.floor(course.stats.enrolledStudents * 0.65); // 65% completion rate
      course.stats.averageRating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0 rating
      course.stats.totalRatings = Math.floor(course.stats.enrolledStudents * 0.8); // 80% rate the course
      course.stats.averageCompletionTime = course.estimatedTime.hours + (Math.random() * 2 - 1); // ±1 hour variance
      await course.save();
    }

    console.log('📊 Updated engineering course statistics');
    console.log('\n🎉 Engineering database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`• ${savedCourses.length} technical courses created`);
    console.log(`• Comprehensive lessons created for ALL courses:`);
    console.log(`  - DSA: ${savedDsaLessons.length} lessons`);
    console.log(`  - System Design: ${savedSystemLessons.length} lessons`);
    console.log(`  - Web Development: ${savedWebDevLessons.length} lessons`);
    console.log(`  - DevOps: ${savedDevOpsLessons.length} lessons`);
    console.log(`  - Machine Learning: ${savedMlLessons.length} lessons`);
    console.log(`  - Database/SQL: ${savedDbLessons.length} lessons`);
    console.log(`• 1 engineering user created with progress data`);
    console.log(`• Courses cover: DSA, System Design, Web Dev, DevOps, ML, Databases`);

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
