export default `
type Course {
    _id: String!
    name: String!
    startDate: String!,
    finishDate: String!,
    likes: Int!
}

type Query {
    allCourses: [Course!]!
    getCourse(id: String!): Course
}

type Mutation {
    createCourse(name: String!, startDate: String!, finishDate: String!) : Course!
    removeCourse(id: String!): Course
    clearCoursesDatabase: [Course!]!
    updateStartDate(id: String!, startDate: String!): Course
    updateFinishDate(id: String!, finishDate: String!): Course
    addLike(id: String!): Course
    removeLike(id: String!): Course
}
`;