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

    // Create Practical Programming Courses
    const courses = [
      {
        title: "JavaScript Fundamentals with Real Projects",
        description: "Learn JavaScript through hands-on projects including a calculator, todo app, and interactive games",
        shortDescription: "Master JavaScript by building real applications",
        category: "programming",
        difficulty: "beginner",
        language: "javascript",
        tags: ["javascript", "web-development", "projects", "frontend"],
        icon: "Code",
        color: "bg-yellow-500",
        estimatedTime: { hours: 6, minutes: 0 },
        xpReward: 500,
        learningObjectives: [
          "Master JavaScript syntax and fundamentals",
          "Build interactive web applications",
          "Handle DOM manipulation and events",
          "Create dynamic user interfaces",
          "Implement local storage and data persistence"
        ],
        syllabus: [
          {
            title: "Variables and Data Types",
            description: "Learn variables, strings, numbers, and arrays",
            estimatedTime: 45
          },
          {
            title: "Functions and Control Flow",
            description: "Master if statements, loops, and functions",
            estimatedTime: 60
          },
          {
            title: "DOM Manipulation",
            description: "Create interactive web pages",
            estimatedTime: 75
          },
          {
            title: "Building a Calculator",
            description: "Complete calculator project with all operations",
            estimatedTime: 90
          },
          {
            title: "Todo List Application",
            description: "Full-featured todo app with local storage",
            estimatedTime: 120
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      },
      {
        title: "Python Data Science Bootcamp",
        description: "Learn Python for data science with NumPy, Pandas, Matplotlib, and real data analysis projects",
        shortDescription: "Complete Python data science course with practical projects",
        category: "ai-ml",
        difficulty: "intermediate",
        language: "python",
        tags: ["python", "data-science", "pandas", "numpy", "visualization"],
        icon: "BarChart3",
        color: "bg-green-500",
        estimatedTime: { hours: 8, minutes: 0 },
        xpReward: 600,
        learningObjectives: [
          "Master Python programming fundamentals",
          "Learn data manipulation with Pandas",
          "Create visualizations with Matplotlib",
          "Perform statistical analysis",
          "Build data science projects"
        ],
        syllabus: [
          {
            title: "Python Basics",
            description: "Variables, lists, dictionaries, functions",
            estimatedTime: 60
          },
          {
            title: "NumPy for Numerical Computing",
            description: "Arrays, mathematical operations, data processing",
            estimatedTime: 75
          },
          {
            title: "Pandas Data Analysis",
            description: "DataFrames, data cleaning, manipulation",
            estimatedTime: 90
          },
          {
            title: "Data Visualization",
            description: "Charts, plots, and interactive visualizations",
            estimatedTime: 85
          },
          {
            title: "Real Dataset Analysis",
            description: "Complete data analysis project",
            estimatedTime: 110
          }
        ],
        instructor: new mongoose.Types.ObjectId(),
        isPublished: true,
        isActive: true,
        publishedAt: new Date()
      }
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log('✅ Created courses');

    // Create practical lessons with working code
    const lessons = [];

    // JavaScript Course Lessons
    const jsCourse = createdCourses[0];
    
    // Lesson 1: Variables and Data Types
    lessons.push({
      title: "JavaScript Variables and Data Types",
      description: "Learn how to declare variables and work with different data types in JavaScript",
      course: jsCourse._id,
      order: 1,
      type: "code",
      difficulty: "beginner",
      estimatedTime: 45,
      xpReward: 50,
      content: {
        text: `Welcome to JavaScript fundamentals! In this lesson, you'll learn about variables and data types.

## Variables in JavaScript

JavaScript uses three keywords to declare variables:
- \`let\` - for variables that can change
- \`const\` - for constants that won't change
- \`var\` - older way (avoid using this)

## Data Types

JavaScript has several built-in data types:
1. **Numbers** - for numerical values
2. **Strings** - for text
3. **Booleans** - true/false values
4. **Arrays** - lists of values
5. **Objects** - collections of key-value pairs

## Practice Exercise

Try creating different types of variables and logging them to the console!`,
        code: {
          language: "javascript",
          starterCode: `// Create variables of different types
let name = "John";
const age = 25;
let isStudent = true;
let hobbies = ["reading", "coding", "gaming"];

// Log variables to console
console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Hobbies:", hobbies);

// Try creating your own variables
let yourName = "";
let yourAge = 0;
let yourHobbies = [];

console.log("Your name:", yourName);`,
          solutionCode: `// Create variables of different types
let name = "John";
const age = 25;
let isStudent = true;
let hobbies = ["reading", "coding", "gaming"];

// Log variables to console
console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);
console.log("Hobbies:", hobbies);

// Create your own variables
let yourName = "Alice";
let yourAge = 28;
let yourHobbies = ["swimming", "photography"];

console.log("Your name:", yourName);
console.log("Your age:", yourAge);
console.log("Your hobbies:", yourHobbies);`
        }
      },
      learningObjectives: [
        "Understand variable declaration with let and const",
        "Work with different JavaScript data types",
        "Use console.log for output"
      ],
      isPublished: true,
      isActive: true,
      nextLesson: null // Will be set after all lessons are created
    });

    // Lesson 2: Functions and Control Flow
    lessons.push({
      title: "JavaScript Functions and If Statements",
      description: "Master JavaScript functions and conditional logic",
      course: jsCourse._id,
      order: 2,
      type: "code",
      difficulty: "beginner",
      estimatedTime: 60,
      xpReward: 60,
      content: {
        text: `Now let's learn about functions and control flow in JavaScript!

## Functions

Functions are reusable blocks of code. You can create them using:
- Function declarations
- Arrow functions

## If Statements

Use if statements to make decisions in your code:
- \`if\` - execute code when condition is true
- \`else if\` - check additional conditions
- \`else\` - fallback when all conditions are false

## Practice Exercise

Create functions that use conditional logic!`,
        code: {
          language: "javascript",
          starterCode: `// Function to check if a number is positive, negative, or zero
function checkNumber(num) {
    if (num > 0) {
        return "positive";
    } else if (num < 0) {
        return "negative";
    } else {
        return "zero";
    }
}

// Test the function
console.log(checkNumber(5));
console.log(checkNumber(-3));
console.log(checkNumber(0));

// Arrow function to calculate grade
const getGrade = (score) => {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else {
        return "F";
    }
};

// Test the grade function
console.log("Score 95:", getGrade(95));
console.log("Score 85:", getGrade(85));
console.log("Score 65:", getGrade(65));`,
          solutionCode: `// Function to check if a number is positive, negative, or zero
function checkNumber(num) {
    if (num > 0) {
        return "positive";
    } else if (num < 0) {
        return "negative";
    } else {
        return "zero";
    }
}

// Test the function
console.log(checkNumber(5));   // "positive"
console.log(checkNumber(-3));  // "negative" 
console.log(checkNumber(0));   // "zero"

// Arrow function to calculate grade
const getGrade = (score) => {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else {
        return "F";
    }
};

// Test the grade function
console.log("Score 95:", getGrade(95)); // "A"
console.log("Score 85:", getGrade(85)); // "B"
console.log("Score 65:", getGrade(65)); // "F"`
        }
      },
      learningObjectives: [
        "Create and use JavaScript functions",
        "Implement conditional logic with if statements",
        "Use arrow function syntax"
      ],
      isPublished: true,
      isActive: true
    });

    // Lesson 3: DOM Manipulation
    lessons.push({
      title: "Interactive Web Pages with DOM",
      description: "Learn to create interactive web pages by manipulating the DOM",
      course: jsCourse._id,
      order: 3,
      type: "code",
      difficulty: "beginner",
      estimatedTime: 75,
      xpReward: 70,
      content: {
        text: `Learn to make your web pages interactive with DOM manipulation!

## What is the DOM?

The Document Object Model (DOM) represents your HTML as JavaScript objects that you can modify.

## Common DOM Methods

- \`document.getElementById()\` - get element by ID
- \`document.querySelector()\` - get element by CSS selector
- \`element.innerHTML\` - change content
- \`element.style\` - change styles
- \`element.addEventListener()\` - respond to events

## Practice Exercise

Create an interactive button that changes text and colors!`,
        code: {
          language: "javascript",
          starterCode: `// Simulate DOM elements (in real browser, these would be HTML elements)
const button = {
    innerHTML: "Click me!",
    style: { backgroundColor: "blue", color: "white" },
    clickCount: 0,
    addEventListener: function(event, callback) {
        if (event === "click") {
            this.onClick = callback;
        }
    },
    click: function() {
        if (this.onClick) this.onClick();
    }
};

const output = {
    innerHTML: "Button not clicked yet",
    style: { color: "black" }
};

// Add click event listener
button.addEventListener("click", function() {
    button.clickCount++;
    
    if (button.clickCount === 1) {
        button.innerHTML = "Clicked once!";
        button.style.backgroundColor = "green";
        output.innerHTML = "Great! You clicked the button!";
    } else if (button.clickCount === 2) {
        button.innerHTML = "Clicked twice!";
        button.style.backgroundColor = "orange";
        output.innerHTML = "Awesome! Second click!";
    } else {
        button.innerHTML = \`Clicked \${button.clickCount} times!\`;
        button.style.backgroundColor = "purple";
        output.innerHTML = \`Amazing! \${button.clickCount} clicks!\`;
    }
});

// Simulate clicking the button
console.log("Initial state:");
console.log("Button:", button.innerHTML);
console.log("Output:", output.innerHTML);

button.click();
console.log("\\nAfter first click:");
console.log("Button:", button.innerHTML);
console.log("Output:", output.innerHTML);

button.click();
console.log("\\nAfter second click:");
console.log("Button:", button.innerHTML);
console.log("Output:", output.innerHTML);`,
          solutionCode: `// Simulate DOM elements (in real browser, these would be HTML elements)
const button = {
    innerHTML: "Click me!",
    style: { backgroundColor: "blue", color: "white" },
    clickCount: 0,
    addEventListener: function(event, callback) {
        if (event === "click") {
            this.onClick = callback;
        }
    },
    click: function() {
        if (this.onClick) this.onClick();
    }
};

const output = {
    innerHTML: "Button not clicked yet",
    style: { color: "black" }
};

// Add click event listener with more interactive features
button.addEventListener("click", function() {
    button.clickCount++;
    
    if (button.clickCount === 1) {
        button.innerHTML = "Clicked once! 🎉";
        button.style.backgroundColor = "green";
        output.innerHTML = "Great! You clicked the button!";
        output.style.color = "green";
    } else if (button.clickCount === 2) {
        button.innerHTML = "Clicked twice! 🚀";
        button.style.backgroundColor = "orange";
        output.innerHTML = "Awesome! Second click!";
        output.style.color = "orange";
    } else if (button.clickCount >= 5) {
        button.innerHTML = \`Master Clicker! \${button.clickCount} times! 🏆\`;
        button.style.backgroundColor = "gold";
        output.innerHTML = \`You're a clicking master! \${button.clickCount} clicks!\`;
        output.style.color = "gold";
    } else {
        button.innerHTML = \`Clicked \${button.clickCount} times! ⭐\`;
        button.style.backgroundColor = "purple";
        output.innerHTML = \`Amazing! \${button.clickCount} clicks!\`;
        output.style.color = "purple";
    }
});

// Simulate multiple clicks to show progression
console.log("Button Click Simulator:");
for (let i = 1; i <= 6; i++) {
    button.click();
    console.log(\`Click \${i}: \${button.innerHTML}\`);
    console.log(\`Output: \${output.innerHTML}\\n\`);
}`
        }
      },
      learningObjectives: [
        "Understand DOM manipulation concepts",
        "Handle click events",
        "Dynamically change content and styles"
      ],
      isPublished: true,
      isActive: true
    });

    // Python Course Lessons
    const pythonCourse = createdCourses[1];

    // Python Lesson 1: Python Basics
    lessons.push({
      title: "Python Fundamentals",
      description: "Learn Python syntax, variables, and basic data structures",
      course: pythonCourse._id,
      order: 1,
      type: "code",
      difficulty: "beginner",
      estimatedTime: 60,
      xpReward: 60,
      content: {
        text: `Welcome to Python programming! Let's start with the basics.

## Python Variables

Python is dynamically typed - you don't need to declare variable types:
- Variables are created when you assign values
- Use descriptive names
- Follow snake_case convention

## Data Structures

Python has powerful built-in data structures:
- **Lists** - ordered, mutable collections
- **Dictionaries** - key-value pairs
- **Sets** - unique elements
- **Tuples** - immutable sequences

## Practice Exercise

Let's create and manipulate different data structures!`,
        code: {
          language: "python",
          starterCode: `# Python Variables and Data Structures
name = "Alice"
age = 28
height = 5.6

# Lists - ordered and mutable
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Dictionary - key-value pairs
person = {
    "name": "Bob",
    "age": 30,
    "city": "New York"
}

# Print basic information
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")

# Work with lists
print(f"Fruits: {fruits}")
fruits.append("grape")
print(f"After adding grape: {fruits}")

# Work with dictionary
print(f"Person info: {person}")
person["job"] = "Engineer"
print(f"After adding job: {person}")

# List comprehension
squared_numbers = [x**2 for x in numbers]
print(f"Squared numbers: {squared_numbers}")`,
          solutionCode: `# Python Variables and Data Structures
name = "Alice"
age = 28
height = 5.6

# Lists - ordered and mutable
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]

# Dictionary - key-value pairs
person = {
    "name": "Bob",
    "age": 30,
    "city": "New York"
}

# Print basic information
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}")

# Work with lists
print(f"\\nFruits: {fruits}")
fruits.append("grape")
print(f"After adding grape: {fruits}")

# More list operations
print(f"First fruit: {fruits[0]}")
print(f"Last fruit: {fruits[-1]}")
print(f"Number of fruits: {len(fruits)}")

# Work with dictionary
print(f"\\nPerson info: {person}")
person["job"] = "Engineer"
person["salary"] = 75000
print(f"After adding job and salary: {person}")

# Dictionary methods
print(f"Keys: {list(person.keys())}")
print(f"Values: {list(person.values())}")

# List comprehension and advanced operations
squared_numbers = [x**2 for x in numbers]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(f"\\nSquared numbers: {squared_numbers}")
print(f"Even number squares: {even_squares}")

# String methods
print(f"\\nName in uppercase: {name.upper()}")
print(f"Name length: {len(name)}")`
        }
      },
      learningObjectives: [
        "Understand Python variable assignment",
        "Work with lists and dictionaries",
        "Use f-strings for formatting",
        "Apply list comprehensions"
      ],
      isPublished: true,
      isActive: true
    });

    // Python Lesson 2: NumPy Arrays
    lessons.push({
      title: "NumPy for Data Processing",
      description: "Master NumPy arrays and mathematical operations for data science",
      course: pythonCourse._id,
      order: 2,
      type: "code",
      difficulty: "intermediate",
      estimatedTime: 75,
      xpReward: 75,
      content: {
        text: `NumPy is the foundation of data science in Python!

## What is NumPy?

NumPy provides:
- Fast numerical arrays
- Mathematical functions
- Broadcasting capabilities
- Linear algebra operations

## Key Concepts

- **Arrays** - homogeneous data containers
- **Shape** - dimensions of arrays
- **Broadcasting** - operations on different sized arrays
- **Vectorization** - operations on entire arrays

## Practice Exercise

Let's create and manipulate NumPy arrays for data analysis!`,
        code: {
          language: "python",
          starterCode: `# Simulate NumPy functionality (in real environment, you'd import numpy)
import math

class SimpleArray:
    def __init__(self, data):
        if isinstance(data, list):
            self.data = data
        else:
            self.data = [data]
        self.shape = (len(self.data),)
    
    def __repr__(self):
        return f"Array({self.data})"
    
    def __add__(self, other):
        if isinstance(other, SimpleArray):
            return SimpleArray([a + b for a, b in zip(self.data, other.data)])
        else:
            return SimpleArray([x + other for x in self.data])
    
    def __mul__(self, other):
        if isinstance(other, SimpleArray):
            return SimpleArray([a * b for a, b in zip(self.data, other.data)])
        else:
            return SimpleArray([x * other for x in self.data])
    
    def sum(self):
        return sum(self.data)
    
    def mean(self):
        return sum(self.data) / len(self.data)
    
    def sqrt(self):
        return SimpleArray([math.sqrt(x) for x in self.data])

# Create arrays
temperatures = SimpleArray([23.5, 25.1, 24.8, 26.2, 22.9])
humidity = SimpleArray([45, 50, 48, 52, 44])

print("Temperature data:", temperatures)
print("Humidity data:", humidity)

# Basic statistics
print(f"Average temperature: {temperatures.mean():.2f}°C")
print(f"Total humidity readings: {humidity.sum()}")

# Array operations
temp_fahrenheit = temperatures * 9/5 + 32
print(f"Temperatures in Fahrenheit: {temp_fahrenheit}")

# Create a comfort index (simplified)
comfort_index = (temperatures + humidity) / 2
print(f"Comfort index: {comfort_index}")`,
          solutionCode: `# Simulate NumPy functionality with enhanced features
import math

class SimpleArray:
    def __init__(self, data):
        if isinstance(data, list):
            self.data = data
        else:
            self.data = [data]
        self.shape = (len(self.data),)
    
    def __repr__(self):
        return f"Array({self.data})"
    
    def __add__(self, other):
        if isinstance(other, SimpleArray):
            return SimpleArray([a + b for a, b in zip(self.data, other.data)])
        else:
            return SimpleArray([x + other for x in self.data])
    
    def __mul__(self, other):
        if isinstance(other, SimpleArray):
            return SimpleArray([a * b for a, b in zip(self.data, other.data)])
        else:
            return SimpleArray([x * other for x in self.data])
    
    def __truediv__(self, other):
        if isinstance(other, SimpleArray):
            return SimpleArray([a / b for a, b in zip(self.data, other.data)])
        else:
            return SimpleArray([x / other for x in self.data])
    
    def sum(self):
        return sum(self.data)
    
    def mean(self):
        return sum(self.data) / len(self.data)
    
    def std(self):
        mean_val = self.mean()
        variance = sum((x - mean_val) ** 2 for x in self.data) / len(self.data)
        return math.sqrt(variance)
    
    def sqrt(self):
        return SimpleArray([math.sqrt(x) for x in self.data])
    
    def max(self):
        return max(self.data)
    
    def min(self):
        return min(self.data)

# Weather data analysis
temperatures = SimpleArray([23.5, 25.1, 24.8, 26.2, 22.9, 27.1, 25.8])
humidity = SimpleArray([45, 50, 48, 52, 44, 55, 49])
wind_speed = SimpleArray([5.2, 3.8, 4.1, 6.3, 7.1, 4.9, 5.5])

print("=== Weather Data Analysis ===")
print(f"Temperature data: {temperatures}")
print(f"Humidity data: {humidity}")
print(f"Wind speed data: {wind_speed}")

# Statistical analysis
print(f"\\n=== Temperature Statistics ===")
print(f"Average: {temperatures.mean():.2f}°C")
print(f"Standard deviation: {temperatures.std():.2f}°C")
print(f"Min: {temperatures.min():.1f}°C")
print(f"Max: {temperatures.max():.1f}°C")

# Unit conversions
temp_fahrenheit = temperatures * 9/5 + 32
print(f"\\n=== Temperature Conversions ===")
print(f"Celsius: {temperatures}")
print(f"Fahrenheit: {temp_fahrenheit}")

# Weather comfort index calculation
# Formula: (normalized temp + normalized humidity - wind_factor) / scale
normalized_temp = (temperatures + (-20)) / 30  # Normalize to 0-1
normalized_humidity = humidity / 100
wind_factor = wind_speed / 10

comfort_index = (normalized_temp * 40 + normalized_humidity * 30 + (SimpleArray([1]*7) - wind_factor) * 30)
print(f"\\n=== Comfort Analysis ===")
print(f"Comfort index (0-100): {comfort_index}")
print(f"Average comfort: {comfort_index.mean():.1f}/100")

# Data insights
if comfort_index.mean() > 70:
    print("Overall weather conditions: Excellent!")
elif comfort_index.mean() > 50:
    print("Overall weather conditions: Good")
else:
    print("Overall weather conditions: Fair")`
        }
      },
      learningObjectives: [
        "Understand NumPy array concepts",
        "Perform mathematical operations on arrays",
        "Calculate statistical measures",
        "Apply vectorized operations"
      ],
      isPublished: true,
      isActive: true
    });

    const createdLessons = await Lesson.insertMany(lessons);
    console.log('✅ Created lessons');

    // Set up lesson navigation (next/prev lesson references)
    for (let i = 0; i < createdLessons.length; i++) {
      const currentLesson = createdLessons[i];
      
      // Find next lesson in the same course
      const nextLesson = createdLessons.find(l => 
        l.course.toString() === currentLesson.course.toString() && 
        l.order === currentLesson.order + 1
      );
      
      // Find previous lesson in the same course
      const prevLesson = createdLessons.find(l => 
        l.course.toString() === currentLesson.course.toString() && 
        l.order === currentLesson.order - 1
      );
      
      // Update lesson with navigation
      await Lesson.findByIdAndUpdate(currentLesson._id, {
        nextLesson: nextLesson ? nextLesson._id : null,
        prevLesson: prevLesson ? prevLesson._id : null
      });
    }

    // Update courses with lesson references
    for (const course of createdCourses) {
      const courseLessons = createdLessons.filter(l => 
        l.course.toString() === course._id.toString()
      );
      
      await Course.findByIdAndUpdate(course._id, {
        lessons: courseLessons.map(l => l._id),
        totalLessons: courseLessons.length
      });
    }

    // Create sample quizzes
    const quizzes = [
      {
        title: "JavaScript Fundamentals Quiz",
        description: "Test your knowledge of JavaScript basics",
        course: createdCourses[0]._id,
        type: "lesson-quiz",
        difficulty: "beginner",
        category: "programming",
        timeLimit: 15,
        questions: [
          {
            question: "Which keyword is used to declare a constant in JavaScript?",
            type: "multiple-choice",
            options: [
              { text: "var", isCorrect: false },
              { text: "let", isCorrect: false },
              { text: "const", isCorrect: true },
              { text: "final", isCorrect: false }
            ],
            explanation: "const is used to declare constants that cannot be reassigned.",
            difficulty: "easy"
          },
          {
            question: "What will console.log(typeof [1, 2, 3]) output?",
            type: "multiple-choice",
            options: [
              { text: "array", isCorrect: false },
              { text: "object", isCorrect: true },
              { text: "list", isCorrect: false },
              { text: "undefined", isCorrect: false }
            ],
            explanation: "Arrays in JavaScript are actually objects, so typeof returns 'object'.",
            difficulty: "medium"
          },
          {
            question: "Which method adds an element to the end of an array?",
            type: "multiple-choice",
            options: [
              { text: "push()", isCorrect: true },
              { text: "pop()", isCorrect: false },
              { text: "shift()", isCorrect: false },
              { text: "unshift()", isCorrect: false }
            ],
            explanation: "push() adds elements to the end of an array.",
            difficulty: "easy"
          }
        ],
        passingScore: 70,
        xpReward: 30
      },
      {
        title: "Python Data Structures Quiz",
        description: "Test your understanding of Python data structures",
        course: createdCourses[1]._id,
        type: "lesson-quiz",
        difficulty: "beginner",
        category: "programming",
        timeLimit: 20,
        questions: [
          {
            question: "Which data structure is mutable in Python?",
            type: "multiple-choice",
            options: [
              { text: "tuple", isCorrect: false },
              { text: "string", isCorrect: false },
              { text: "list", isCorrect: true },
              { text: "int", isCorrect: false }
            ],
            explanation: "Lists are mutable, meaning you can change their contents after creation.",
            difficulty: "easy"
          },
          {
            question: "What is the output of len([1, 2, [3, 4]])?",
            type: "multiple-choice",
            options: [
              { text: "2", isCorrect: false },
              { text: "3", isCorrect: true },
              { text: "4", isCorrect: false },
              { text: "5", isCorrect: false }
            ],
            explanation: "The list has 3 elements: 1, 2, and [3, 4]. Nested lists count as one element.",
            difficulty: "medium"
          },
          {
            question: "Which operator is used for exponentiation in Python?",
            type: "multiple-choice",
            options: [
              { text: "^", isCorrect: false },
              { text: "**", isCorrect: true },
              { text: "pow", isCorrect: false },
              { text: "exp", isCorrect: false }
            ],
            explanation: "** is the exponentiation operator in Python (e.g., 2**3 = 8).",
            difficulty: "easy"
          }
        ],
        passingScore: 70,
        xpReward: 40
      }
    ];

    await Quiz.insertMany(quizzes);
    console.log('✅ Created quizzes');

    // Create sample user
    const user = new User({
      username: "demo_user",
      email: "demo@example.com",
      password: "password123",
      profile: {
        firstName: "Demo",
        lastName: "User"
      }
    });

    await user.save();
    console.log('✅ Created sample user');

    console.log('\\n🎉 Database seeded successfully!');
    console.log('\\n📚 Created courses:');
    createdCourses.forEach(course => {
      console.log(`  - ${course.title} (${course.language})`);
    });
    
    console.log('\\n📖 Created lessons:');
    createdLessons.forEach(lesson => {
      console.log(`  - ${lesson.title} (${lesson.type})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = { seedDatabase };
