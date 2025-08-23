const mongoose = require('mongoose');
const Quiz = require('./src/models/Quiz');

async function checkQuizzes() {
  try {
    await mongoose.connect('mongodb://localhost:27017/learn-quest');
    const quizzes = await Quiz.find({}).populate('course', 'title');
    console.log(`📝 Total Quizzes: ${quizzes.length}`);
    
    const courseGroups = {};
    quizzes.forEach(quiz => {
      const courseTitle = quiz.course ? quiz.course.title : 'No Course';
      if (!courseGroups[courseTitle]) {
        courseGroups[courseTitle] = [];
      }
      courseGroups[courseTitle].push(quiz);
    });
    
    console.log('\n📊 Quizzes by Course:');
    Object.keys(courseGroups).forEach(courseTitle => {
      console.log(`  ${courseTitle}: ${courseGroups[courseTitle].length} quizzes`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkQuizzes();
