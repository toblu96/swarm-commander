import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSON

    type Query {
        """
        List of Docker volumes.
        """
        volumes(filter: VolumeFilter): [Volume]
    }

    """
    Volumes are the preferred mechanism for persisting data generated by and used by Docker containers.
    """
    type Volume {
        Name: ID!
        Driver: String!
        Mountpoint: String!
        CreatedAt: DateTime!
        Labels: JSON
        Scope: String!
        Options: JSON
    }

    """
    JSON encoded value of the filters (a map[string][]string) to process on the volumes list. Available filters:
    """
    input VolumeFilter {
        """
        When set to true, returns all volumes that are not in use by a container. When set to false, only volumes that are in use by one or more containers are returned.
        ~~~
        true, false
        ~~~
        """
        dangling: Boolean
        """
        Matches volumes based on their driver.
        ~~~
        ["local"]
        ~~~
        """
        driver: [String]
        """
        Matches volumes based on the presence of a label alone or a label and a value.
        ~~~
        ["com.docker.compose.version","com.docker.compose.project=hasura"]
        ~~~
        """
        label: [String]
        """
        Matches all or part of a volume name.
        ~~~
        ["moleculer_data", "data"]
        ~~~
        """
        name: [String]
    }

`;

export default typeDefs