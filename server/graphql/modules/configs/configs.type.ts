import { gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker configs.
        """
        configs(
            filter: ConfigFilter,
        ): [Config]
    }

    type Config {
        """
        The ID of the config.
        """
        ID: ID!
        """
        The version number of the object such as node, service, etc. This is needed to avoid conflicting writes. The client must send the version number along with the modified specification when updating these objects. This approach ensures safe concurrency and determinism in that the change on the object may not be applied if the version number has changed from the last read. In other words, if two update requests specify the same base version, only one of the requests can succeed. As a result, two separate update requests that happen at the same time will not unintentionally overwrite each other.
        """
        Version: JSONObject!
        """
        Date and time at which the config was added to the swarm in RFC 3339 format with nano-seconds.
        """
        CreatedAt: DateTime!
        """
        Date and time at which the config was added to the swarm in RFC 3339 format with nano-seconds.
        """
        UpdatedAt: DateTime!
        """
        User modifiable config configuration.
        """
        Spec: JSONObject!
    }

    input ConfigFilter {
                """
        ~~~
        <config id>
        ~~~
        """
        id: [String]
        """
        ~~~
        label=key or label="key=value"
        ~~~
        """
        label: [String]
        """
        ~~~
        <config name>
        ~~~
        """
        name: [String]
        """
        ~~~
        <config name>
        ~~~
        """
        names: [String]
    }
`;

export default typeDefs