import { gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker tasks.
        """
        tasks(
            filter: TaskFilter,
        ): [Task]
    }

    type Task {
        """
        The ID of the task.
        """
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
        Name of the task.
        """
        Name: String!
        """
        User-defined key/value metadata.
        """
        Labels: JSONObject!
        """
        User modifiable task configuration.
        """
        Spec: JSONObject!
        """
        The ID of the service this task is part of
        """
        ServiceID: String!
        
        Slot: Int!
        """
        The ID of the node that this task is on.
        """
        NodeID: String!
        """
        User-defined resources can be either Integer resources (e.g, SSD=3) or String resources (e.g, GPU=UUID1)
        """
        AssignedGenericResources: [JSONObject]!
        
        """
        TaskStatus represents the status of a task.s
        """
        Status: JSONObject!
        DesiredState: TASKSTATE!
    }

    input TaskFilter {
        """
        ~~~
        ["running"|"shutdown"|"accepted"]
        ~~~
        """
        desired_state: [String]
        """
        ~~~
        <task id>
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
        <task name>
        ~~~
        """
        name: [String]
        """
        ~~~
        <node id or name>
        ~~~
        """
        node: [String]
        """
        ~~~
        <service name>
        ~~~
        """
        service: [String]
    }

    enum TASKSTATE {
        new
        allocated
        pending
        assigned
        accepted
        preparing
        ready
        starting
        running
        complete
        shutdown
        failed
        rejected
        remove
        orphaned
    }
`;

export default typeDefs