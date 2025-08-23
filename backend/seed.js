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
                input: "addCarAtFront('Alice', 1); addCarAtEnd('Bob', 2);",
                expectedOutput: "🚂 ENGINE -> [Car #1: Alice] -> [Car #2: Bob] -> 🏁 END",
                description: "Test adding passengers to front and end"
              },
              {
                input: "addCarAtFront('Charlie', 3); reverseTrain();",
                expectedOutput: "Train direction should be completely reversed",
                description: "Test train reversal functionality"
              },
              {
                input: "removePassenger('Alice');",
                expectedOutput: "Alice should be removed from the train",
                description: "Test passenger removal"
              },
              {
                input: "findPassenger('Bob');",
                expectedOutput: "✅ Found Bob in car #2 at position X!",
                description: "Test passenger search"
              }
            ]
          },
          interactiveElements: [
            {
              type: "visualization",
              title: "🎬 Train Animation",
              description: "Watch how your train changes as you add/remove cars!",
              component: "LinkedListVisualizer"
            },
            {
              type: "quiz",
              title: "🧠 Quick Check!",
              questions: [
                {
                  question: "🤔 What happens when you add a car at the front?",
                  options: [
                    "The new car becomes the engine",
                    "The car goes to the end",
                    "Nothing happens",
                    "The train explodes 💥"
                  ],
                  correct: 0,
                  explanation: "Correct! When adding at front, the new car becomes the new 'head' or engine! 🚂"
                }
              ]
            },
            {
              type: "challenge",
              title: "🏆 BONUS CHALLENGE",
              description: "Add a function to find the middle car of your train in ONE pass!",
              hint: "Use two pointers - one slow (1 step) and one fast (2 steps)! 🐢🐰"
            }
          ]
        },
        learningObjectives: [
          "🎯 Build a train system using linked lists",
          "🚂 Master node insertion and deletion", 
          "🔄 Understand pointer manipulation",
          "🔍 Implement search algorithms",
          "🎮 Apply data structures to real scenarios"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "🔗 Linked Lists: Build a Train System!",
        description: "🚂 Build an interactive train system to master linked lists! Each train car is a node connected to the next one!",
        course: dsaCourse._id,
        order: 3,
        type: "interactive",
        difficulty: "intermediate",
        estimatedTime: 75,
        xpReward: 80,
        content: {
          text: `🎯 **MISSION: Build a Digital Train System!**

**🤔 Real-World Connection:**
Think of a train! Each car is connected to the next one. That's exactly how a Linked List works!
- Train Engine = Head node
- Train Cars = Data nodes  
- Couplers = Pointers/Links

**🎮 Interactive Challenge:**
आज आप एक Train Conductor बनेंगे और अपनी train को manage करेंगे!

**🚀 What You'll Build:**
1. Add new train cars (Insert nodes)
2. Remove broken cars (Delete nodes)
3. Reverse your entire train direction!
4. Find specific passengers in cars

**💡 Why Linked Lists?**
- Dynamic size (add cars as needed!)
- Efficient insertion/deletion
- Used in: Music playlists, Browser history, Undo operations`,
          code: {
            language: "cpp",
            starterCode: `#include <iostream>
#include <string>
using namespace std;

// 🚂 Train Car Structure
struct TrainCar {
    string passenger;
    int carNumber;
    TrainCar* nextCar;
    
    TrainCar(string name, int num) : passenger(name), carNumber(num), nextCar(nullptr) {}
};

// 🚂 Train Management System
class TrainSystem {
private:
    TrainCar* engine; // Head of our train
    
public:
    TrainSystem() : engine(nullptr) {
        cout << "🚂 New Train System Created! All aboard! 🎫" << endl;
    }
    
    // 🎯 CHALLENGE 1: Add a new passenger car to the front
    void addCarAtFront(string passenger, int carNum) {
        cout << "🚂 Adding " << passenger << " to car #" << carNum << " at the front!" << endl;
        // TODO: Your code here!
        // Hint: Create new car, link it to current engine, update engine
    }
    
    // 🎯 CHALLENGE 2: Add a car at the end of the train
    void addCarAtEnd(string passenger, int carNum) {
        cout << "🚃 Adding " << passenger << " to car #" << carNum << " at the end!" << endl;
        // TODO: Your code here!
        // Hint: Traverse to the last car, then add new car
    }
    
    // 🎯 CHALLENGE 3: Remove a specific car (passenger leaves!)
    void removePassenger(string passenger) {
        cout << "👋 " << passenger << " is leaving the train!" << endl;
        // TODO: Your code here!
        // Hint: Find the car, update links, delete the car
    }
    
    // 🎯 CHALLENGE 4: Reverse the entire train direction!
    void reverseTrain() {
        cout << "🔄 REVERSING TRAIN DIRECTION! Choo choo!" << endl;
        // TODO: Your code here!
        // Hint: Use three pointers: previous, current, next
    }
    
    // 🚂 Display the entire train
    void showTrain() {
        cout << "\n🚂 CURRENT TRAIN STATUS:" << endl;
        cout << "ENGINE";
        TrainCar* current = engine;
        while (current) {
            cout << " -> [Car #" << current->carNumber << ": " << current->passenger << "]";
            current = current->nextCar;
        }
        cout << " -> 🏁 END" << endl << endl;
    }
    
    // 🔍 Find a passenger in the train
    bool findPassenger(string passenger) {
        TrainCar* current = engine;
        int position = 1;
        while (current) {
            if (current->passenger == passenger) {
                cout << "✅ Found " << passenger << " in car #" << current->carNumber 
                     << " at position " << position << "!" << endl;
                return true;
            }
            current = current->nextCar;
            position++;
        }
        cout << "❌ " << passenger << " not found on this train!" << endl;
        return false;
    }
};

// 🎮 Interactive Demo Function
void runTrainDemo() {
    cout << "\n🎮 === WELCOME TO TRAIN LINKED LIST SIMULATOR === 🚂" << endl;
    cout << "You are the Train Conductor! Manage your passengers wisely!" << endl;
    
    TrainSystem myTrain;
    
    // Step-by-step tutorial
    cout << "\n📚 TUTORIAL: Let's add some passengers..." << endl;
    myTrain.addCarAtFront("Alice", 1);
    myTrain.showTrain();
    
    myTrain.addCarAtEnd("Bob", 2);
    myTrain.showTrain();
    
    myTrain.addCarAtFront("Charlie", 3);
    myTrain.showTrain();
    
    cout << "\n🔍 SEARCHING for passengers..." << endl;
    myTrain.findPassenger("Alice");
    myTrain.findPassenger("David");
    
    cout << "\n🔄 REVERSING the train..." << endl;
    myTrain.reverseTrain();
    myTrain.showTrain();
    
    cout << "\n👋 Charlie is leaving..." << endl;
    myTrain.removePassenger("Charlie");
    myTrain.showTrain();
}`,
            solutionCode: `// 🎯 COMPLETE SOLUTION - Train Linked List System

class TrainSystem {
private:
    TrainCar* engine;
    
public:
    TrainSystem() : engine(nullptr) {
        cout << "🚂 New Train System Created! All aboard! 🎫" << endl;
    }
    
    // ✅ SOLUTION 1: Add car at front
    void addCarAtFront(string passenger, int carNum) {
        cout << "🚂 Adding " << passenger << " to car #" << carNum << " at the front!" << endl;
        TrainCar* newCar = new TrainCar(passenger, carNum);
        newCar->nextCar = engine;
        engine = newCar;
        cout << "✅ " << passenger << " successfully boarded!" << endl;
    }
    
    // ✅ SOLUTION 2: Add car at end
    void addCarAtEnd(string passenger, int carNum) {
        cout << "🚃 Adding " << passenger << " to car #" << carNum << " at the end!" << endl;
        TrainCar* newCar = new TrainCar(passenger, carNum);
        
        if (!engine) {
            engine = newCar;
            cout << "✅ " << passenger << " is now in the engine car!" << endl;
            return;
        }
        
        TrainCar* current = engine;
        while (current->nextCar) {
            current = current->nextCar;
        }
        current->nextCar = newCar;
        cout << "✅ " << passenger << " successfully boarded at the end!" << endl;
    }
    
    // ✅ SOLUTION 3: Remove passenger
    void removePassenger(string passenger) {
        cout << "👋 " << passenger << " is leaving the train!" << endl;
        
        if (!engine) {
            cout << "❌ Train is empty!" << endl;
            return;
        }
        
        // If passenger is in the engine car
        if (engine->passenger == passenger) {
            TrainCar* temp = engine;
            engine = engine->nextCar;
            delete temp;
            cout << "✅ " << passenger << " has left the train!" << endl;
            return;
        }
        
        // Search for passenger in other cars
        TrainCar* current = engine;
        while (current->nextCar && current->nextCar->passenger != passenger) {
            current = current->nextCar;
        }
        
        if (current->nextCar) {
            TrainCar* temp = current->nextCar;
            current->nextCar = current->nextCar->nextCar;
            delete temp;
            cout << "✅ " << passenger << " has left the train!" << endl;
        } else {
            cout << "❌ " << passenger << " not found on this train!" << endl;
        }
    }
    
    // ✅ SOLUTION 4: Reverse train
    void reverseTrain() {
        cout << "🔄 REVERSING TRAIN DIRECTION! Choo choo!" << endl;
        
        TrainCar* previous = nullptr;
        TrainCar* current = engine;
        TrainCar* next = nullptr;
        
        while (current) {
            next = current->nextCar;  // Store next car
            current->nextCar = previous;  // Reverse the link
            previous = current;  // Move previous forward
            current = next;  // Move current forward
        }
        
        engine = previous;  // Update engine to the new front
        cout << "✅ Train direction reversed! 🔄" << endl;
    }
    
    // Display, search functions remain same...
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
        title: "🥞 Stacks & Queues: Restaurant Management Game!",
        description: "🍽️ Run a busy restaurant! Use stacks for plates and queues for customer orders. Master LIFO and FIFO!",
        course: dsaCourse._id,
        order: 4,
        type: "interactive",
        difficulty: "intermediate",
        estimatedTime: 70,
        xpReward: 85,
        content: {
          text: `🎯 **MISSION: Manage a Busy Restaurant!**

**🍽️ Real-World Scenario:**
You're managing "DevShiksha Diner" - the hottest restaurant in town!
- **Stack of Plates** 🥞: Last plate in, first plate out (LIFO)
- **Customer Queue** 👥: First customer in, first served (FIFO)

**🎮 Your Challenges:**
1. **Plate Manager**: Stack clean plates efficiently
2. **Order Queue**: Handle customer orders fairly  
3. **Kitchen Stack**: Manage cooking orders
4. **Emergency Situations**: Handle rush hours!

**💡 Why These Matter?**
- **Stacks**: Undo operations, Browser history, Function calls
- **Queues**: Print jobs, CPU scheduling, BFS algorithms`,
          code: {
            language: "cpp",
            starterCode: `#include <iostream>
#include <string>
#include <queue>
#include <stack>
using namespace std;

// 🥞 Plate Stack Manager
class PlateStack {
private:
    stack<string> plates;
    
public:
    // 🎯 CHALLENGE 1: Add a clean plate to the stack
    void addPlate(string plateType) {
        cout << "🍽️ Adding " << plateType << " plate to stack!" << endl;
        // TODO: Add plate to stack
    }
    
    // 🎯 CHALLENGE 2: Take a plate from the top
    string takePlate() {
        cout << "👨‍🍳 Chef needs a plate!" << endl;
        // TODO: Remove and return top plate
        // Remember to check if stack is empty!
        return "";
    }
    
    // 📊 Show current plates
    void showPlates() {
        stack<string> temp = plates;
        cout << "🥞 PLATES STACK (top to bottom): ";
        while (!temp.empty()) {
            cout << temp.top() << " | ";
            temp.pop();
        }
        cout << "🔚" << endl;
    }
    
    bool isEmpty() { return plates.empty(); }
    int size() { return plates.size(); }
};

// 👥 Customer Queue Manager  
class CustomerQueue {
private:
    queue<string> customers;
    
public:
    // 🎯 CHALLENGE 3: Add customer to queue
    void addCustomer(string customerName) {
        cout << "👋 Welcome " << customerName << "! Please wait in line." << endl;
        // TODO: Add customer to queue
    }
    
    // 🎯 CHALLENGE 4: Serve the next customer
    string serveCustomer() {
        cout << "🍽️ Serving next customer..." << endl;
        // TODO: Remove and return first customer in queue
        // Remember to check if queue is empty!
        return "";
    }
    
    // 📊 Show current queue
    void showQueue() {
        queue<string> temp = customers;
        cout << "👥 CUSTOMER QUEUE (front to back): ";
        while (!temp.empty()) {
            cout << temp.front() << " -> ";
            temp.pop();
        }
        cout << "🔚" << endl;
    }
    
    bool isEmpty() { return customers.empty(); }
    int size() { return customers.size(); }
};

// 🍽️ Restaurant Management System
class RestaurantManager {
private:
    PlateStack plateStack;
    CustomerQueue customerQueue;
    stack<string> kitchenOrders; // Cooking orders (LIFO - latest order priority)
    
public:
    // 🎮 Interactive Restaurant Simulation
    void runRestaurant() {
        cout << "\n🎮 === WELCOME TO DEVSHIKSHA DINER === 🍽️" << endl;
        cout << "You are the Restaurant Manager! Handle plates and customers wisely!" << endl;
        
        // Morning setup
        cout << "\n🌅 MORNING SETUP..." << endl;
        plateStack.addPlate("Dinner");
        plateStack.addPlate("Salad"); 
        plateStack.addPlate("Dessert");
        plateStack.showPlates();
        
        // Customers arrive
        cout << "\n👥 CUSTOMERS ARRIVING..." << endl;
        customerQueue.addCustomer("Alice");
        customerQueue.addCustomer("Bob");
        customerQueue.addCustomer("Charlie");
        customerQueue.showQueue();
        
        // Service simulation
        cout << "\n🍽️ STARTING SERVICE..." << endl;
        serveOneCustomer();
        serveOneCustomer();
        
        // Rush hour challenge!
        cout << "\n⚡ RUSH HOUR CHALLENGE!" << endl;
        handleRushHour();
    }
    
    // 🎯 CHALLENGE 5: Serve one complete customer
    void serveOneCustomer() {
        cout << "\n--- SERVING CUSTOMER ---" << endl;
        // TODO: 
        // 1. Get customer from queue
        // 2. Take plate from stack
        // 3. Show service completion
    }
    
    // 🎯 CHALLENGE 6: Handle rush hour efficiently
    void handleRushHour() {
        cout << "⚡ Multiple orders coming in fast!" << endl;
        // TODO: Add multiple kitchen orders to stack
        // Then process them in LIFO order (latest first)
    }
};`,
            solutionCode: `// 🎯 COMPLETE SOLUTION - Restaurant Management System

class PlateStack {
private:
    stack<string> plates;
    
public:
    // ✅ SOLUTION 1: Add plate
    void addPlate(string plateType) {
        cout << "🍽️ Adding " << plateType << " plate to stack!" << endl;
        plates.push(plateType);
        cout << "✅ Plate added! Stack size: " << plates.size() << endl;
    }
    
    // ✅ SOLUTION 2: Take plate
    string takePlate() {
        cout << "👨‍🍳 Chef needs a plate!" << endl;
        if (plates.empty()) {
            cout << "❌ No plates available! Need to wash more!" << endl;
            return "NO_PLATE";
        }
        string plate = plates.top();
        plates.pop();
        cout << "✅ Gave " << plate << " plate to chef!" << endl;
        return plate;
    }
    
    void showPlates() {
        stack<string> temp = plates;
        cout << "🥞 PLATES STACK (top to bottom): ";
        if (temp.empty()) {
            cout << "EMPTY!";
        }
        while (!temp.empty()) {
            cout << temp.top() << " | ";
            temp.pop();
        }
        cout << "🔚" << endl;
    }
    
    bool isEmpty() { return plates.empty(); }
    int size() { return plates.size(); }
};

class CustomerQueue {
private:
    queue<string> customers;
    
public:
    // ✅ SOLUTION 3: Add customer
    void addCustomer(string customerName) {
        cout << "👋 Welcome " << customerName << "! Please wait in line." << endl;
        customers.push(customerName);
        cout << "✅ " << customerName << " added to queue! Position: " << customers.size() << endl;
    }
    
    // ✅ SOLUTION 4: Serve customer
    string serveCustomer() {
        cout << "🍽️ Serving next customer..." << endl;
        if (customers.empty()) {
            cout << "❌ No customers waiting!" << endl;
            return "NO_CUSTOMER";
        }
        string customer = customers.front();
        customers.pop();
        cout << "✅ Now serving: " << customer << "!" << endl;
        return customer;
    }
    
    void showQueue() {
        queue<string> temp = customers;
        cout << "👥 CUSTOMER QUEUE (front to back): ";
        if (temp.empty()) {
            cout << "EMPTY!";
        }
        while (!temp.empty()) {
            cout << temp.front() << " -> ";
            temp.pop();
        }
        cout << "🔚" << endl;
    }
    
    bool isEmpty() { return customers.empty(); }
    int size() { return customers.size(); }
};

// Complete restaurant manager implementation...
class RestaurantManager {
    // ✅ SOLUTION 5: Serve complete customer
    void serveOneCustomer() {
        cout << "\n--- SERVING CUSTOMER ---" << endl;
        string customer = customerQueue.serveCustomer();
        string plate = plateStack.takePlate();
        
        if (customer != "NO_CUSTOMER" && plate != "NO_PLATE") {
            cout << "🎉 Successfully served " << customer << " with " << plate << " plate!" << endl;
        } else {
            cout << "❌ Service failed - missing customer or plate!" << endl;
        }
        
        cout << "📊 Current Status:" << endl;
        customerQueue.showQueue();
        plateStack.showPlates();
    }
    
    // ✅ SOLUTION 6: Rush hour handling
    void handleRushHour() {
        cout << "⚡ Multiple orders coming in fast!" << endl;
        
        // Add orders to kitchen stack (LIFO - latest first)
        kitchenOrders.push("Burger");
        kitchenOrders.push("Pizza");
        kitchenOrders.push("Pasta");
        
        cout << "📋 Kitchen Orders (latest first):" << endl;
        stack<string> temp = kitchenOrders;
        while (!temp.empty()) {
            cout << "🍳 Cooking: " << temp.top() << endl;
            temp.pop();
        }
    }
};`
          }
        },
        learningObjectives: [
          "🥞 Master Stack operations (LIFO)",
          "👥 Understand Queue operations (FIFO)", 
          "🍽️ Apply data structures to real scenarios",
          "⚡ Handle complex restaurant operations",
          "🎮 Build interactive management systems"
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "🌳 Trees & BST: Build a Family Tree Explorer!",
        description: "👨‍👩‍👧‍👦 Create an interactive family tree! Learn tree traversals, BST operations, and genealogy algorithms!",
        course: dsaCourse._id,
        order: 5,
        type: "interactive",
        difficulty: "intermediate",
        estimatedTime: 90,
        xpReward: 100,
        content: {
          text: `🎯 **MISSION: Build a Digital Family Tree!**

**👨‍👩‍👧‍👦 Real-World Connection:**
Ever wondered how ancestry websites work? They use Tree data structures!
- **Root**: Oldest ancestor
- **Nodes**: Family members  
- **Children**: Direct descendants
- **Leaves**: Current generation

**🎮 Your Family Tree Features:**
1. **Add Family Members**: Insert new relatives
2. **Family Search**: Find any relative quickly
3. **Generation Explorer**: Traverse different generations
4. **Family Statistics**: Count descendants, ancestors

**💡 Why Trees Matter?**
- **File Systems**: Folders and subfolders
- **Decision Making**: Game AI, Machine Learning
- **Databases**: Efficient searching and sorting`,
          code: {
            language: "cpp",
            starterCode: `#include <iostream>
#include <string>
#include <queue>
using namespace std;

// 👨‍👩‍👧‍👦 Family Member Structure
struct FamilyMember {
    string name;
    int age;
    string relationship; // "parent", "child", "grandparent", etc.
    FamilyMember* left;   // First child or younger sibling
    FamilyMember* right;  // Next sibling
    
    FamilyMember(string n, int a, string rel) : 
        name(n), age(a), relationship(rel), left(nullptr), right(nullptr) {}
};

// 🌳 Family Tree Manager
class FamilyTree {
private:
    FamilyMember* root; // Family patriarch/matriarch
    
public:
    FamilyTree() : root(nullptr) {
        cout << "👨‍👩‍👧‍👦 New Family Tree Created! Let's build your genealogy! 📜" << endl;
    }
    
    // 🎯 CHALLENGE 1: Add the family founder (root)
    void addFounder(string name, int age) {
        cout << "👑 Adding family founder: " << name << " (age " << age << ")" << endl;
        // TODO: Create root node with founder's info
    }
    
    // 🎯 CHALLENGE 2: Add a family member to the tree
    FamilyMember* addMember(FamilyMember* current, string name, int age, string relationship) {
        cout << "👶 Adding " << name << " as " << relationship << endl;
        // TODO: Implement BST insertion based on age
        // Younger members go left, older go right
        return current;
    }
    
    // 🎯 CHALLENGE 3: Find a family member
    FamilyMember* findMember(FamilyMember* current, string name) {
        cout << "🔍 Searching for " << name << " in the family tree..." << endl;
        // TODO: Implement tree search
        return nullptr;
    }
    
    // 🎯 CHALLENGE 4: Family reunion! (Inorder traversal)
    void familyReunion(FamilyMember* current) {
        cout << "🎉 FAMILY REUNION! Meeting everyone in age order..." << endl;
        // TODO: Implement inorder traversal (left -> root -> right)
        // This will show family members from youngest to oldest!
    }
    
    // 🎯 CHALLENGE 5: Generation explorer (Level order traversal)
    void exploreGenerations() {
        cout << "🏠 Exploring family by generations..." << endl;
        // TODO: Implement level-order traversal using queue
        // Show each generation separately!
    }
    
    // 📊 Family Statistics
    int countFamilyMembers(FamilyMember* current) {
        // TODO: Count total family members
        return 0;
    }
    
    int findOldestAge(FamilyMember* current) {
        // TODO: Find age of oldest family member
        return 0;
    }
    
    // 🎮 Interactive Family Demo
    void familyDemo() {
        cout << "\n🎮 === FAMILY TREE BUILDER === 👨‍👩‍👧‍👦" << endl;
        cout << "Let's build the Smith family tree!" << endl;
        
        // Building the family tree
        addFounder("Grandpa Smith", 85);
        
        cout << "\n👨‍👩‍👧‍👦 Adding family members..." << endl;
        root = addMember(root, "Dad Smith", 55, "son");
        root = addMember(root, "Uncle Bob", 60, "son");
        root = addMember(root, "Little Timmy", 8, "grandson");
        root = addMember(root, "Sister Sarah", 25, "daughter");
        
        cout << "\n🎉 Family reunion time!" << endl;
        familyReunion(root);
        
        cout << "\n🏠 Exploring generations..." << endl;
        exploreGenerations();
        
        cout << "\n🔍 Finding family members..." << endl;
        FamilyMember* found = findMember(root, "Little Timmy");
        if (found) {
            cout << "✅ Found " << found->name << "! He's the " << found->relationship << endl;
        }
        
        cout << "\n📊 Family Statistics:" << endl;
        cout << "👥 Total family members: " << countFamilyMembers(root) << endl;
        cout << "👴 Oldest member age: " << findOldestAge(root) << endl;
    }
};`,
            solutionCode: `// 🎯 COMPLETE SOLUTION - Family Tree System

class FamilyTree {
private:
    FamilyMember* root;
    
public:
    FamilyTree() : root(nullptr) {
        cout << "👨‍👩‍👧‍👦 New Family Tree Created! Let's build your genealogy! 📜" << endl;
    }
    
    // ✅ SOLUTION 1: Add founder
    void addFounder(string name, int age) {
        cout << "👑 Adding family founder: " << name << " (age " << age << ")" << endl;
        root = new FamilyMember(name, age, "founder");
        cout << "✅ " << name << " is now the family patriarch/matriarch!" << endl;
    }
    
    // ✅ SOLUTION 2: Add family member (BST insertion)
    FamilyMember* addMember(FamilyMember* current, string name, int age, string relationship) {
        cout << "👶 Adding " << name << " as " << relationship << endl;
        
        // Base case: create new member
        if (current == nullptr) {
            FamilyMember* newMember = new FamilyMember(name, age, relationship);
            cout << "✅ " << name << " joined the family!" << endl;
            return newMember;
        }
        
        // BST insertion based on age
        if (age < current->age) {
            current->left = addMember(current->left, name, age, relationship);
        } else {
            current->right = addMember(current->right, name, age, relationship);
        }
        
        return current;
    }
    
    // ✅ SOLUTION 3: Find family member
    FamilyMember* findMember(FamilyMember* current, string name) {
        if (current == nullptr) {
            cout << "❌ " << name << " not found in family tree!" << endl;
            return nullptr;
        }
        
        if (current->name == name) {
            cout << "✅ Found " << name << "! Age: " << current->age << endl;
            return current;
        }
        
        // Search both subtrees
        FamilyMember* leftResult = findMember(current->left, name);
        if (leftResult != nullptr) return leftResult;
        
        return findMember(current->right, name);
    }
    
    // ✅ SOLUTION 4: Family reunion (Inorder traversal)
    void familyReunion(FamilyMember* current) {
        if (current == nullptr) return;
        
        // Left subtree (younger members)
        familyReunion(current->left);
        
        // Current member
        cout << "👋 " << current->name << " (age " << current->age 
             << ", " << current->relationship << ")" << endl;
        
        // Right subtree (older members)
        familyReunion(current->right);
    }
    
    // ✅ SOLUTION 5: Generation explorer (Level order)
    void exploreGenerations() {
        if (root == nullptr) return;
        
        queue<FamilyMember*> q;
        q.push(root);
        int generation = 1;
        
        while (!q.empty()) {
            int levelSize = q.size();
            cout << "🏠 Generation " << generation << ": ";
            
            for (int i = 0; i < levelSize; i++) {
                FamilyMember* current = q.front();
                q.pop();
                
                cout << current->name << "(" << current->age << ") ";
                
                if (current->left) q.push(current->left);
                if (current->right) q.push(current->right);
            }
            cout << endl;
            generation++;
        }
    }
    
    // Family statistics implementations...
    int countFamilyMembers(FamilyMember* current) {
        if (current == nullptr) return 0;
        return 1 + countFamilyMembers(current->left) + countFamilyMembers(current->right);
    }
    
    int findOldestAge(FamilyMember* current) {
        if (current == nullptr) return 0;
        
        // In BST, rightmost node has maximum value
        while (current->right != nullptr) {
            current = current->right;
        }
        return current->age;
    }
};`
          }
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

    // Create comprehensive quizzes for all courses
    const sampleQuizzes = [
      // DSA Course Quizzes
      {
        title: "🚂 Linked Lists Train System Quiz",
        description: "🎯 Test your train conductor skills! Master linked lists through fun scenarios!",
        course: dsaCourse._id,
        type: "lesson-quiz",
        difficulty: "intermediate",
        category: "data-structures",
        timeLimit: 15,
        passingScore: 70,
        xpReward: 120,
        questions: [
          {
            question: "🚂 Your train has cars: Engine -> [Alice] -> [Bob] -> [Charlie] -> End. If you add [David] at the front, what's the new order?",
            type: "multiple-choice",
            options: [
              { text: "Engine -> [David] -> [Alice] -> [Bob] -> [Charlie] -> End", isCorrect: true },
              { text: "Engine -> [Alice] -> [Bob] -> [Charlie] -> [David] -> End", isCorrect: false },
              { text: "Engine -> [Alice] -> [David] -> [Bob] -> [Charlie] -> End", isCorrect: false },
              { text: "The train explodes! 💥", isCorrect: false }
            ],
            explanation: "🎯 Perfect! When you add a car at the front, it becomes the new head (right after the engine). This is like inserting at the beginning of a linked list!",
            points: 2
          },
          {
            question: "🔄 Time to reverse your train! If your current train is: Engine -> [A] -> [B] -> [C] -> End, what happens after reversing?",
            type: "multiple-choice",
            options: [
              { text: "Engine -> [C] -> [B] -> [A] -> End", isCorrect: true },
              { text: "Engine -> [A] -> [B] -> [C] -> End", isCorrect: false },
              { text: "End -> [A] -> [B] -> [C] -> Engine", isCorrect: false },
              { text: "The train goes backward physically 🚂💨", isCorrect: false }
            ],
            explanation: "🔄 Excellent! Reversing a linked list means changing all the pointer directions. The last element becomes first!",
            points: 3
          },
          {
            question: "🔍 Detective Time! You're searching for passenger 'Bob' in your train. Which traversal method will you use?",
            type: "multiple-choice",
            options: [
              { text: "Start from engine and check each car one by one", isCorrect: true },
              { text: "Check random cars hoping to find Bob", isCorrect: false },
              { text: "Ask all passengers to shout their names at once", isCorrect: false },
              { text: "Use magic 🪄", isCorrect: false }
            ],
            explanation: "🔍 Smart detective work! In a linked list, you must traverse sequentially from the head until you find your target. No random access like arrays!",
            points: 2
          }
        ],
        isPublished: true,
        isActive: true
      },
      {
        title: "🥞 Restaurant Stacks & Queues Quiz",
        description: "🍽️ Test your restaurant management skills with stacks and queues!",
        course: dsaCourse._id,
        type: "lesson-quiz", 
        difficulty: "intermediate",
        category: "data-structures",
        timeLimit: 12,
        passingScore: 75,
        xpReward: 150,
        questions: [
          {
            question: "🥞 You have plates stacked: [Bottom] Dinner, Salad, Dessert [Top]. Chef needs a plate. Which one do you give?",
            type: "multiple-choice",
            options: [
              { text: "Dessert plate (from top)", isCorrect: true },
              { text: "Dinner plate (from bottom)", isCorrect: false },
              { text: "Salad plate (from middle)", isCorrect: false },
              { text: "Break all plates and start fresh 💥", isCorrect: false }
            ],
            explanation: "🥞 Correct! Stacks work on LIFO principle - Last In, First Out. The top plate (Dessert) was added last, so it comes out first!",
            points: 2
          },
          {
            question: "👥 Customer queue: [Front] Alice, Bob, Charlie [Back]. Who gets served first?",
            type: "multiple-choice", 
            options: [
              { text: "Alice (first in line)", isCorrect: true },
              { text: "Charlie (last in line)", isCorrect: false },
              { text: "Bob (in the middle)", isCorrect: false },
              { text: "Whoever yells loudest 📢", isCorrect: false }
            ],
            explanation: "👥 Perfect! Queues follow FIFO - First In, First Out. Alice arrived first, so she gets served first. Fair and square!",
            points: 2
          },
          {
            question: "⚡ Rush hour! Orders coming fast: Burger, Pizza, Pasta. Kitchen uses stack for orders. Which gets cooked first?",
            type: "multiple-choice",
            options: [
              { text: "Pasta (latest order, highest priority)", isCorrect: true },
              { text: "Burger (first order received)", isCorrect: false },
              { text: "Pizza (middle order)", isCorrect: false },
              { text: "Cook all at once! 🔥", isCorrect: false }
            ],
            explanation: "⚡ Smart! Kitchen stack prioritizes latest orders (LIFO). Pasta was ordered last, so it gets urgent attention first!",
            points: 3
          }
        ],
        isPublished: true,
        isActive: true
      },
      // System Design Course Quiz
      {
        title: "🏗️ System Design Fundamentals Quiz",
        description: "Test your knowledge of scalability, databases, and system architecture",
        course: systemDesignCourse._id,
        type: "lesson-quiz",
        difficulty: "advanced",
        category: "system-design",
        timeLimit: 20,
        passingScore: 80,
        xpReward: 200,
        questions: [
          {
            question: "What is the main advantage of horizontal scaling over vertical scaling?",
            type: "multiple-choice",
            options: [
              { text: "Better fault tolerance and virtually unlimited scaling", isCorrect: true },
              { text: "Easier to implement and manage", isCorrect: false },
              { text: "Lower cost and complexity", isCorrect: false },
              { text: "Faster single-machine performance", isCorrect: false }
            ],
            explanation: "Horizontal scaling provides better fault tolerance because if one machine fails, others continue running. It also offers virtually unlimited scaling potential.",
            points: 2
          },
          {
            question: "Which database type is best suited for applications requiring strict ACID properties?",
            type: "multiple-choice",
            options: [
              { text: "SQL/Relational databases", isCorrect: true },
              { text: "NoSQL document stores", isCorrect: false },
              { text: "Key-value stores", isCorrect: false },
              { text: "Graph databases", isCorrect: false }
            ],
            explanation: "SQL databases are designed with ACID properties (Atomicity, Consistency, Isolation, Durability) as core features, making them ideal for applications requiring strict data consistency.",
            points: 2
          }
        ],
        isPublished: true,
        isActive: true
      },
      // Web Development Course Quiz
      {
        title: "⚛️ React & MERN Stack Quiz", 
        description: "Test your full-stack web development knowledge",
        course: webDevCourse._id,
        type: "lesson-quiz",
        difficulty: "intermediate",
        category: "web-development", 
        timeLimit: 18,
        passingScore: 75,
        xpReward: 180,
        questions: [
          {
            question: "What is the correct way to handle state in a React functional component?",
            type: "multiple-choice",
            options: [
              { text: "Using useState hook", isCorrect: true },
              { text: "Using this.setState", isCorrect: false },
              { text: "Direct variable assignment", isCorrect: false },
              { text: "Using global variables", isCorrect: false }
            ],
            explanation: "useState hook is the proper way to manage state in React functional components. It returns current state and a setter function.",
            points: 2
          },
          {
            question: "Which HTTP method is typically used to create a new resource in a RESTful API?",
            type: "multiple-choice",
            options: [
              { text: "POST", isCorrect: true },
              { text: "GET", isCorrect: false },
              { text: "PUT", isCorrect: false },
              { text: "DELETE", isCorrect: false }
            ],
            explanation: "POST is used to create new resources. GET retrieves, PUT updates completely, and DELETE removes resources.",
            points: 2
          }
        ],
        isPublished: true,
        isActive: true
      },
      // DevOps Course Quiz
      {
        title: "🐳 DevOps & Cloud Quiz",
        description: "Test your DevOps, Docker, and cloud engineering knowledge",
        course: devOpsCourse._id,
        type: "lesson-quiz",
        difficulty: "advanced",
        category: "devops",
        timeLimit: 15,
        passingScore: 80,
        xpReward: 170,
        questions: [
          {
            question: "What is the primary benefit of containerization with Docker?",
            type: "multiple-choice",
            options: [
              { text: "Application consistency across different environments", isCorrect: true },
              { text: "Faster code compilation", isCorrect: false },
              { text: "Better code syntax highlighting", isCorrect: false },
              { text: "Automatic bug detection", isCorrect: false }
            ],
            explanation: "Docker ensures your application runs the same way across development, staging, and production environments by packaging everything needed to run the application.",
            points: 2
          },
          {
            question: "In Kubernetes, what is a Pod?",
            type: "multiple-choice",
            options: [
              { text: "The smallest deployable unit that can contain one or more containers", isCorrect: true },
              { text: "A cluster of machines", isCorrect: false },
              { text: "A networking component", isCorrect: false },
              { text: "A storage volume", isCorrect: false }
            ],
            explanation: "A Pod is the basic execution unit in Kubernetes, typically containing one container but can have multiple tightly coupled containers.",
            points: 2
          }
        ],
        isPublished: true,
        isActive: true
      },
      // Machine Learning Course Quiz
      {
        title: "🤖 Machine Learning Fundamentals Quiz",
        description: "Test your ML algorithms and deployment knowledge",
        course: savedCourses.find(c => c.title.includes("Machine Learning"))._id,
        type: "lesson-quiz",
        difficulty: "advanced",
        category: "ai-ml",
        timeLimit: 25,
        passingScore: 75,
        xpReward: 220,
        questions: [
          {
            question: "What is the main difference between supervised and unsupervised learning?",
            type: "multiple-choice",
            options: [
              { text: "Supervised learning uses labeled data, unsupervised doesn't", isCorrect: true },
              { text: "Supervised learning is faster to train", isCorrect: false },
              { text: "Unsupervised learning is more accurate", isCorrect: false },
              { text: "There is no significant difference", isCorrect: false }
            ],
            explanation: "Supervised learning algorithms learn from labeled training data to make predictions, while unsupervised learning finds patterns in unlabeled data.",
            points: 2
          },
          {
            question: "Which metric is most appropriate for evaluating a binary classification model with imbalanced classes?",
            type: "multiple-choice",
            options: [
              { text: "F1-score or AUC-ROC", isCorrect: true },
              { text: "Accuracy only", isCorrect: false },
              { text: "Mean squared error", isCorrect: false },
              { text: "R-squared", isCorrect: false }
            ],
            explanation: "F1-score balances precision and recall, while AUC-ROC is robust to class imbalance. Accuracy can be misleading with imbalanced datasets.",
            points: 3
          }
        ],
        isPublished: true,
        isActive: true
      },
      // Database Course Quiz
      {
        title: "🗃️ SQL & Database Design Quiz",
        description: "Test your database design and SQL optimization skills",
        course: savedCourses.find(c => c.title.includes("Database"))._id,
        type: "lesson-quiz",
        difficulty: "intermediate",
        category: "database",
        timeLimit: 20,
        passingScore: 75,
        xpReward: 160,
        questions: [
          {
            question: "What is the purpose of database normalization?",
            type: "multiple-choice",
            options: [
              { text: "Reduce data redundancy and improve data integrity", isCorrect: true },
              { text: "Increase query performance", isCorrect: false },
              { text: "Make databases larger", isCorrect: false },
              { text: "Simplify database structure", isCorrect: false }
            ],
            explanation: "Normalization reduces data redundancy and dependency by organizing data into well-structured tables, improving data integrity and reducing storage space.",
            points: 2
          },
          {
            question: "Which SQL clause is used to filter groups in an aggregate query?",
            type: "multiple-choice",
            options: [
              { text: "HAVING", isCorrect: true },
              { text: "WHERE", isCorrect: false },
              { text: "GROUP BY", isCorrect: false },
              { text: "ORDER BY", isCorrect: false }
            ],
            explanation: "HAVING filters groups after GROUP BY is applied, while WHERE filters individual rows before grouping.",
            points: 2
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
