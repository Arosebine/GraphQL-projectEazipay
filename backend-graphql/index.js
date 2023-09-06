require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const defTypes = require('../schema-graphql/typeDef'); 
const resolvers = require('./resolver/user'); 

const server = new ApolloServer({
  typeDefs: defTypes,
  resolvers,
});

const port = process.env.PORT || 5000;

server.listen(port).then(({ url }) => {
  console.log(`Server started at ${url}`);
});
