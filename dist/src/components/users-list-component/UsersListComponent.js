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
    console.log(props);
  }

  componentWillMount() {
    this.props.subscribeToNewUsers();
}

  render() {
    if (!this.props.allUsers || this.props.loading) 
        return (<div>Loading . . .</div>);
      if (this.props.error != null)
        return (<p>{this.props.error}</p>);
      return (
        <div className="listContent">
          <p className="title"><b>All Users</b></p>
          <Divider/>          
          <List className="list">  
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

const UsersListWithData = graphql(ALL_USERS, {
  name: 'allUsers',
  props: props => {
    return {
      ...props,
      subscribeToNewUsers: () => {
        return props.allUsers.subscribeToMore({
          document: USER_ADDED,
          updateQuery: (prev, { subscriptionData }) => {
            console.log(prev);
            console.log(subscriptionData);
            console.log(props);
          }
        })
      }
    }
  }

})(UsersListComponent);

export default UsersListWithData;
