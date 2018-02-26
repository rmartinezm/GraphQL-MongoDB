export default `
    type User {
        _id: String!
        email: String!
        password: String!
        username: String!
        courses: [String]!
    }

    type Query {
        allUsers: [User!]!
        getUser(id: String!): User
    }

    type Mutation {
        createUser(email: String!, password: String!, username: String!) : User!
        removeUser(id: String!): User
        clearUsersDatabase: [User!]        
        updateEmal(id: String!, email: String!): User
        updatePassword(id: String!, password: String!): User
        updateUsername(id: String!, username: String!): User
        addCourseToThisUser(id: String!, course: String!): User
        removeCourseToThisUser(id: String!, course: String!): User
        clearCoursesToThisUser(id: String!): User
    }

    type Subscription {
        userAdded: User
    }
`;