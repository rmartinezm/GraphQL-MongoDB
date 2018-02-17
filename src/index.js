import express from 'express';
import mongoose from 'mongoose';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import User from './model/user';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';

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

// Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// GraphQL Routes
app.use('/graphql', express.json(), graphqlExpress({
    schema,
    context: {
        User
    }
}));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// Launch Express
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});