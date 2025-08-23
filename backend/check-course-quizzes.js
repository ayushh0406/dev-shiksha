const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const { Quiz } = require('./src/models/Quiz');

async function checkCourseQuizzes() {
  try {
    await mongoose.connect('mongodb://localhost:27017/learn-quest');
    
    const courses = await Course.find({});
    console.log('📚 All Courses:');
    
    for (const course of courses) {
      const quizzes = await Quiz.find({ course: course._id });
      console.log(`   ${course.title}: ${quizzes.length} quiz(s)`);
      
      if (quizzes.length === 0) {
        console.log(`   ❌ No quiz found for: ${course.title}`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCourseQuizzes();
