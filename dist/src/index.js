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

const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3300/graphql' }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
