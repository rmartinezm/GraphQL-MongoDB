import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: String,
    startDate: String,
    finishDate: String,
    likes: Number
});

const Course = mongoose.model('courses', CourseSchema);

export default Course;