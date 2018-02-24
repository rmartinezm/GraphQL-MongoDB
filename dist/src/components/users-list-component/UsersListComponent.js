import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class UsersListComponent extends Component {
  
    render() {
      let users = this.props.data.allUsers;
      if (users == null)
        return (<div>Loading . . .</div>);
      return (
        <div>
          {users.map(user => <div key={user._id}>{user.username}</div>)}
        </div>
      );
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
