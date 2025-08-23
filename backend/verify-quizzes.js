const mongoose = require('mongoose');
const Course = require('./src/models/Course');
const { Quiz } = require('./src/models/Quiz');

async function verifyQuizzes() {
  try {
    await mongoose.connect('mongodb://localhost:27017/learnquest');
    console.log('✅ Connected to MongoDB');
    
    const courses = await Course.find({});
    console.log(`\n📚 Found ${courses.length} courses:`);
    
    let totalQuizzes = 0;
    
    for (const course of courses) {
      const quizzes = await Quiz.find({ course: course._id });
      console.log(`\n🎯 ${course.title}:`);
      console.log(`   📊 Category: ${course.category}`);
      console.log(`   📈 Difficulty: ${course.difficulty}`);
      console.log(`   🧩 Quizzes: ${quizzes.length}`);
      
      if (quizzes.length > 0) {
        quizzes.forEach(quiz => {
          console.log(`      ✅ ${quiz.title} (${quiz.questions.length} questions)`);
        });
      } else {
        console.log(`      ❌ No quiz found!`);
      }
      
      totalQuizzes += quizzes.length;
    }
    
    console.log(`\n🎉 Total quizzes: ${totalQuizzes}`);
    
    if (totalQuizzes === courses.length) {
      console.log('✅ All courses have quizzes!');
    } else {
      console.log('⚠️ Some courses are missing quizzes');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyQuizzes();
