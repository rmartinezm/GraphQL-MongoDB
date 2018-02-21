import express from 'express';
import mongoose from 'mongoose';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import User from './model/user';
import Course from './model/course';
import userTypeDefs from './schemas/userSchema';
import userResolvers from './resolvers/userResolvers';
import courseTypeDefs from './schemas/courseSchema';
import courseResolvers from './resolvers/courseResolvers';

const app = express();
mongoose.connect('mongodb://localhost/exampleDatabase').then( 
    (res) => {
        console.log('MongoDB Connected');
}).catch(
    (err) => {
        console.log(err); 
});
 
// Express Configurations
app.set('port', process.env.PORT || 3000);

// Schemas
const userSchema = makeExecutableSchema({
    typeDefs: userTypeDefs,
    resolvers: userResolvers
});
const courseSchema = makeExecutableSchema({
    typeDefs: courseTypeDefs,
    resolvers: courseResolvers
});
// MainSchema
const schema = mergeSchemas({
    schemas: [userSchema, courseSchema],
  });
// GraphQL Route
app.use('/graphql', express.json(), graphqlExpress({
    schema,
    context: {
        User,
        Course
    }
}));
// Launch Express
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});