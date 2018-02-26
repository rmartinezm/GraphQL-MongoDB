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
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

var cors = require('cors');

const app = express();
mongoose.connect('mongodb://localhost/exampleDatabase').then( 
    (res) => {
        console.log('MongoDB Connected');
}).catch(
    (err) => {
        console.log(err); 
});
 
// Express Configurations
app.set('port', process.env.PORT || 3300);

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
app.use(cors());
app.use('/graphql', express.json(), graphqlExpress({
    schema,
    context: {
        User,
        Course
    }
}));

const server = createServer(app);
// Launch Server
server.listen(app.get('port'), () => {
    console.log(`GraphQL Server is now running on http://localhost:${app.get('port')}`);
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server,
      path: '/subscriptions',
    });
});