const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const Lesson = require('./src/models/Lesson');
const { Quiz } = require('./src/models/Quiz');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return updateInteractiveLessons();
  })
  .then(() => {
    console.log('✅ Interactive lessons updated successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });

async function updateInteractiveLessons() {
  try {
    // Find DSA course
    const dsaCourse = await Course.findOne({ title: { $regex: /Data Structures.*Algorithms/ } });
    if (!dsaCourse) {
      console.log('DSA course not found');
      return;
    }

    // Update Linked Lists Lesson
    const linkedListUpdate = await Lesson.findOneAndUpdate(
      { 
        course: dsaCourse._id,
        title: { $regex: /Linked Lists/ }
      },
      {
        title: "🔗 Linked Lists: Build a Train System!",
        description: "🚂 Build an interactive train system to master linked lists! Each train car is a node connected to the next one!",
        type: "interactive",
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
        ]
      },
      { new: true }
    );

    // Update Stacks and Queues Lesson
    const stackQueueUpdate = await Lesson.findOneAndUpdate(
      {
        course: dsaCourse._id,
        title: { $regex: /Stacks.*Queues/ }
      },
      {
        title: "🥞 Stacks & Queues: Restaurant Management Game!",
        description: "🍽️ Run a busy restaurant! Use stacks for plates and queues for customer orders. Master LIFO and FIFO!",
        type: "interactive",
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
          
          interactiveElements: [
            {
              type: "game",
              title: "🎮 Restaurant Rush!",
              description: "Handle the lunch rush efficiently using stacks and queues!",
              component: "RestaurantGame"
            },
            {
              type: "visualization", 
              title: "🥞 Stack vs Queue Demo",
              description: "See the difference between LIFO and FIFO operations!",
              component: "StackQueueVisualizer"
            }
          ]
        },
        learningObjectives: [
          "🥞 Master Stack operations (LIFO)",
          "👥 Understand Queue operations (FIFO)",
          "🍽️ Apply data structures to real scenarios",
          "⚡ Handle complex restaurant operations",
          "🎮 Build interactive management systems"
        ]
      },
      { new: true }
    );

    // Update Trees Lesson
    const treeUpdate = await Lesson.findOneAndUpdate(
      {
        course: dsaCourse._id, 
        title: { $regex: /Trees.*Binary/ }
      },
      {
        title: "🌳 Trees & BST: Build a Family Tree Explorer!",
        description: "👨‍👩‍👧‍👦 Create an interactive family tree! Learn tree traversals, BST operations, and genealogy algorithms!",
        type: "interactive",
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
          
          interactiveElements: [
            {
              type: "builder",
              title: "👨‍👩‍👧‍👦 Family Tree Builder",
              description: "Build and explore your own family tree!",
              component: "FamilyTreeBuilder"
            },
            {
              type: "traversal",
              title: "🚶‍♂️ Tree Walk Simulator", 
              description: "Experience different tree traversal methods!",
              component: "TreeTraversalDemo"
            }
          ]
        },
        learningObjectives: [
          "🌳 Master Binary Tree operations",
          "🔍 Implement efficient search algorithms",
          "👨‍👩‍👧‍👦 Build real-world tree applications", 
          "🎯 Understand tree traversal methods",
          "📊 Analyze tree performance"
        ]
      },
      { new: true }
    );

    console.log('🎮 Updated lessons:');
    if (linkedListUpdate) console.log('✅ Linked Lists → Interactive Train System');
    if (stackQueueUpdate) console.log('✅ Stacks & Queues → Restaurant Game');
    if (treeUpdate) console.log('✅ Trees → Family Tree Explorer');

    console.log('\n🎉 All lessons are now interactive and engaging!');
    
  } catch (error) {
    console.error('Error updating lessons:', error);
    throw error;
  }
}
