import { gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker services.
        """
        nodes(
            filter: NodeFilter,
        ): [Node]
    }

    type Node {
        ID: ID!
        """
        The version number of the object such as node, service, etc. This is needed to avoid conflicting writes. The client must send the version number along with the modified specification when updating these objects. This approach ensures safe concurrency and determinism in that the change on the object may not be applied if the version number has changed from the last read. In other words, if two update requests specify the same base version, only one of the requests can succeed. As a result, two separate update requests that happen at the same time will not unintentionally overwrite each other.
        """
        Version: JSONObject!
        """
        Date and time at which the node was added to the swarm in RFC 3339 format with nano-seconds.
        """
        CreatedAt: DateTime!
        """
        Date and time at which the node was added to the swarm in RFC 3339 format with nano-seconds.
        """
        UpdatedAt: DateTime!
        """
        User modifiable configuration for a node.
        """
        Spec: JSONObject!
        """
        NodeDescription encapsulates the properties of the Node as reported by the agent.
        """
        Description: JSONObject!
        """
        NodeStatus represents the status of a node.

        It provides the current status of the node, as seen by the manager.
        """
        Status: JSONObject!
        """
        ManagerStatus represents the status of a manager.

        It provides the current status of a node's manager component, if the node is a manager.
        """
        ManagerStatus: JSONObject
    }

    input NodeFilter {
        """
        ~~~
        <node id>
        ~~~
        """
        id: [String]
        """
        ~~~
        <engine label>
        ~~~
        """
        label: [String]
        """
        ~~~
        ["accepted"|"pending"]
        ~~~
        """
        membership: [String]
        """
        ~~~
        <node name>
        ~~~
        """
        name: [String]
        """
        ~~~
        ["manager"|"worker"]
        ~~~
        """
        role: [String]
    }
`;

export default typeDefs