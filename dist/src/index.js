import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Apollo imports
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const query = gql`
query {
  allUsers {
    username
    courses
  }
}
`;

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3300/graphql' }),
    cache: new InMemoryCache()
});

client.query({
    query
}).then(res => console.log(res.data));

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
