const { gql } = require('apollo-server-express');

module.exports = gql`
type User {
    name: String
    username: String
    password: String
    email: String
    token: String 
},


type Query {
    user(id: ID): User
},


input UserRegisterInput {
    name: String
    username: String
    password: String
    email: String
},

input UserLoginInput {
    email: String
    password: String
},

type Mutation {
    userRegister(UserRegisterInput: UserRegisterInput): User
    userLogin(UserLoginInput: UserLoginInput): User
    user(id: ID): User

}

`