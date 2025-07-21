require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('./src/models/Lesson');
const Course = require('./src/models/Course');

async function checkDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check courses
    const courses = await Course.find();
    console.log('\n📚 Courses found:', courses.length);
    courses.forEach(c => console.log(`- ${c.title} (ID: ${c._id})`));
    
    // Check lessons
    const lessons = await Lesson.find().populate('course', 'title');
    console.log('\n📖 Lessons found:', lessons.length);
    lessons.forEach(l => console.log(`- ${l.title} (Course: ${l.course ? l.course.title : 'No course'}, Published: ${l.isPublished}, Active: ${l.isActive})`));
    
    // Check lesson-course relationships with filters
    for (const course of courses) {
      const courseLessons = await Lesson.find({ 
        course: course._id,
        isPublished: true,
        isActive: true 
      });
      console.log(`\n🔗 Course "${course.title}" has ${courseLessons.length} published/active lessons`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkDatabase();
