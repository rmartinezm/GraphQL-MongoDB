import React, { Component } from 'react';
import './UsersListComponent.css';
// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Material UI
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class UsersListComponent extends Component {

  constructor(props){
    super(props);
    this.subscription = null;
  }

  componentWillMount() {
    // USER ADDED SUBSCRIPTION
    this.props.data.subscribeToMore({
      document: USER_ADDED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.userAdded) {
          return prev;
        }
        const newUser = subscriptionData.userAdded;
        return Object.assign({}, prev, {
          allUsers: [ ...prev.allUsers, newUser]
        });
      }
    });
    // USER REMOVED:
    this.props.data.subscribeToMore({
      document: USER_REMOVED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.userRemoved)
          return prev;
        const removedUser = subscriptionData.userRemoved;
        let newArray = [];
        prev.allUsers.forEach(user => {
          if (user._id !== removedUser._id)
            newArray.push(user);
        });
        return Object.assign({}, prev, {
          allUsers: newArray
        });
      }
    });
  }

  render() {
    if (!this.props.data.allUsers || this.props.data.loading) 
        return (<div>Loading . . .</div>);
      if (this.props.data.error != null)
        return (<p>{this.props.data.error}</p>);
      return (
        <div className="listContent">
          <p className="title"><b>All Users</b></p>
          <Divider/>          
          <List className="list">  
            {this.props.data.allUsers.map(user =>
              <div key={user._id}>
                <ListItem button onClick={this.printUser.bind(this, user)}>
                  <ListItemText primary={user.username} />
                </ListItem>
                <Divider/>
              </div>
            )}
          </List>
        </div>
      );
    }

    printUser(user) {
      console.log(user);
    }
}

const ALL_USERS = gql`
  query {
    allUsers {
      _id
      username
    }
  }
`;

const USER_ADDED = gql`
  subscription {
    userAdded {
      _id
      username
    }
  }
`;

const USER_REMOVED = gql`
  subscription {
    userRemoved {
      _id
      username
    }
  }
`;

const UsersListWithData = graphql(ALL_USERS)(UsersListComponent);

export default UsersListWithData;
