export default {
    Query: {
        allUsers: async (parent, args, { User }) => {
            return await User.find();
        },
        getUser: async (parent, { id }, { User }) => {
            return await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
        }
    },
    Mutation: {
        createUser: async (parent, args, { User }) => {
            return await new User(args).save();
        },
        removeUser: async (parent, { id }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            return user == null? null: await user.remove();
        },
        clearUsersDatabase: async (parent, args, { User }) => {
            let any = await User.remove({});
            return await User.find();
        },
        updateEmal: async (parent, { id, email }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            if (user == null)
                return null;
            user.email = email;
            return await user.save();
        },
        updatePassword: async (parent, { id, password }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            if (user == null)
                return null;
            user.password = password;
            return await user.save();
        },
        updateUsername: async (parent, { id, username }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            if (user == null)
                return null;
            user.username = username;
            return await user.save();
        },
        addCourseToThisUser: async (parent, { id, course }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            if (user == null)
                return null;
            let flag = true;
            user.courses.forEach( eachCourse => {
                if(eachCourse == course) flag = false;
            });
            if (flag)
                user.courses.push(course);
            return await user.save();
        },
        removeCourseToThisUser: async (parent, { id, course }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            if (user == null)
                return null;
            let flag = false;
            user.courses.forEach( eachCourse => {
                if(eachCourse == course) flag = true;
            });
            if (flag)
                user.courses.splice(user.courses.indexOf(course), 1);
            return await user.save();
        },
        clearCoursesToThisUser: async (parent, { id }, { User }) => {
            let user = await User.findOne({'_id': id})
                /* USER NOT FOUND*/
                .catch(err => null);
            if (user == null)
                return null;
            user.courses.splice(0);
            return await user.save();
        }
    }
}