import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { List, ListItem } from 'material-ui';
import * as Icons from 'material-ui/svg-icons';
import './UsersListComponent.css';


class UsersListComponent extends Component {
  
    render() {
      let users = this.props.data.allUsers;
      if (users == null)
        return (<div>Loading . . .</div>);
      return (
        <div className="listContent">
          <p className="title"><b>All Users</b></p>
          <List className="list">
            {users.map(user => <ListItem key={user._id} onClick={this.printUser.bind(this, user)} primaryText={user.username} leftIcon={<Icons.ActionFace />}></ListItem>)}
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
