import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UsersListComponent.css';
// GraphQL
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Material UI
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

class UsersListComponent extends Component {
  
    render() {
      if (this.props.data.loading) 
        return (<div>Loading . . .</div>);
      if (this.props.data.error != null)
        return (<p>{this.props.data.error}</p>);
      
      let users = this.props.data.allUsers;
      let n = 0;      
      return (
        <div className="listContent">
          <p className="title"><b>All Users</b></p>
          <Divider/>          
          <List className="list">
            {users.map(user => 
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

const UsersListWithData = graphql(ALL_USERS)(UsersListComponent);

export default UsersListWithData;
