import React, { Component } from 'react';
import UsersListComponent  from './components/users-list-component/UsersListComponent'
import CreateUserComponent  from './components/create-user-component/CreateUserComponent'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to<br />React-GraphQL-MongoDB</h1>
          </header>
          <div className="App-intro">
            <UsersListComponent />
            <CreateUserComponent />
          </div>
        </div>
    );
  }
}

export default App;
