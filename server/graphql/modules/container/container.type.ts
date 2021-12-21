import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    type Query {
        user(id: ID!): User
        container(filter: ContainerFilter): [Container]
    }

    type User {
        id: ID!
        username: String!
    }

    type Mutation {
        createContainer: Container
    }

    type Container {
        id: ID!
        name: String
    }

    input ContainerFilter {
        id: String
        name: String
    }
`;

export default typeDefs