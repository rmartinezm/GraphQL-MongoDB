export default `

    type User {
        _id: String!
        email: String!
        password: String!
        username: String
        courses: [String]
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(email: String!, password: String!) : User!
    }

`;