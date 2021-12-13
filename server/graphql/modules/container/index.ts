import { createModule, gql } from 'graphql-modules';
var __dirname = ''

export const UserModule = createModule({
  id: 'container',
  dirname: __dirname,
  typeDefs: gql`
    type Query {
      user(id: ID!): User
    }

    type User {
      id: ID!
      username: String!
    }
  `,
  resolvers: {
    Query: {
      user(root, { id }) {
        return {
          _id: id,
          username: 'jhon',
        };
      },
    },
    User: {
      id(user) {
        return user._id;
      },
      username(user) {
        return user.username;
      },
    },
  },
});
