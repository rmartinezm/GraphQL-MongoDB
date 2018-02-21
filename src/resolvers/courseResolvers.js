export default {
    Query: {
        allCourses: async (parent, args, { Course }) => {
            return await Course.find();
        },
        getCourse: async (parent, { id }, { Course }) => {
            return await Course.findOne({'_id': id}).catch(err => null);
        }
    },
    Mutation: {
        createCourse: async (parent, args, { Course }) => {
            let course = new Course(args);
            course.likes = 0;
            return await course.save();
        },
        removeCourse: async (parent, { id }, { Course }) => {
            let course = await Course.findOne({'_id': id}).catch(err => null);
            return course == null? null: await course.remove();
        },
        clearCoursesDatabase: async (parent, args, { Course }) => {
            let any = await Course.remove({});
            return await Course.find();
        },
        updateStartDate: async (parent, { id, startDate }, { Course }) => {
            let course = await Course.findOne({'_id': id}).catch(err => null);
            if (course == null) return null;
            course.startDate = startDate;
            return await course.save();
        },
        updateFinishDate: async (parent, { id, finishDate }, { Course }) => {
            let course = await Course.findOne({'_id': id}).catch(err => null);
            if (course == null) return null;
            course.finishDate = finishDate;
            return await course.save();
        },
        addLike: async (parent, { id }, { Course }) => {
            let course = await Course.findOne({'_id': id}).catch(err => null);
            if (course == null) return null;
            course.likes += 1;
            return await course.save();
        },
        removeLike: async (parent, { id }, { Course }) => {
            let course = await Course.findOne({'_id': id}).catch(err => null);
            if (course == null) return null;
            course.likes -= 1;
            return await course.save();
        },
        
    }
}