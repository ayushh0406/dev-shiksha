const mongoose = require('mongoose');
const Lesson = require('./src/models/Lesson');
const Course = require('./src/models/Course');

mongoose.connect('mongodb://localhost:27017/learnquest')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check all lessons first
    const allLessons = await Lesson.find({}).limit(5);
    console.log('All lessons:', allLessons.map(l => l.title));
    
    // Check Arrays lesson
    const arrayLesson = await Lesson.findOne({title: {$regex: /Array/}});
    if (!arrayLesson) {
      console.log('❌ No Arrays lesson found');
      process.exit(0);
    }
    console.log('\n🔍 ARRAYS LESSON ANALYSIS:');
    console.log('Title:', arrayLesson.title);
    console.log('Type:', arrayLesson.type);
    console.log('Has Text:', arrayLesson.content.text ? 'YES' : 'NO');
    console.log('Has Code:', arrayLesson.content.code ? 'YES' : 'NO');
    console.log('Has Interactive:', arrayLesson.content.interactive ? 'YES' : 'NO');
    console.log('Learning Objectives:', arrayLesson.learningObjectives || 'NONE');
    
    if (arrayLesson.content.text) {
      console.log('Text Preview:', arrayLesson.content.text.substring(0, 200) + '...');
    }
    
    // Check Linked List lesson
    const linkedLesson = await Lesson.findOne({title: {$regex: /Linked Lists/}});
    console.log('\n🔍 LINKED LIST LESSON ANALYSIS:');
    console.log('Title:', linkedLesson.title);
    console.log('Type:', linkedLesson.type);
    console.log('Has Text:', linkedLesson.content.text ? 'YES' : 'NO');
    console.log('Has Code:', linkedLesson.content.code ? 'YES' : 'NO');
    console.log('Has Interactive:', linkedLesson.content.interactive ? 'YES' : 'NO');
    console.log('Learning Objectives:', linkedLesson.learningObjectives || 'NONE');
    
    if (linkedLesson.content.text) {
      console.log('Text Preview:', linkedLesson.content.text.substring(0, 200) + '...');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
