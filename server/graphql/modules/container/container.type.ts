import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    scalar JSONObject
    scalar IPv4IPv6

    type Query {
        container(
            """
            Return all containers. By default, only running containers are shown
            ~~~
            Default: false
            ~~~
            """
            all: Boolean,
            """
            Return this number of most recently created containers, including non-running ones.
            """
            limit: Int, 
            """
            Return the size of container as fields SizeRw and SizeRootFs.
            ~~~
            Default: false
            ~~~
            """
            size: Boolean, 
            filter: ContainerFilter
        ): [Container]
    }

    type Container {
        """
        The ID of this container
        """
        Id: ID!
        """
        The names that this container has been given
        """
        Names: [String]
        """
        The name of the image used when creating this container
        """
        Image: String
        """
        The ID of the image that this container was created from
        """
        ImageID: String
        """
        Command to run when starting the container
        """
        Command: String
        """
        When the container was created (Unix epoch time format)
        """
        Created: Int
        """
        The state of this container (e.g. Exited)
        """
        State: String
        """
        Additional human-readable status of this container (e.g. Exit 0)
        """
        Status: String
        """
        The ports exposed by this container
        """
        Ports: [Port]
        """
        User-defined key/value metadata.
        """
        Labels: JSONObject
        """
        The size of files that have been created or changed by this container
        """
        SizeRw: Int
        """
        The total size of all the files in this container
        """
        SizeRootFs: Int
        
        HostConfig: JSONObject
        """
        A summary of the container's network settings
        """
        NetworkSettings: JSONObject
        
        Mounts: [Mount]
    }

    type Port {
        IP: IPv4IPv6
        PrivatePort: Int!
        PublicPort: Int
        Type: PORTTYPE!
    }

    type Mount {
        """
        Container path.
        """
        Target: String
        """
        Mount source (e.g. a volume name, a host path).
        """
        Source: String
        """
        The mount type. Available types:

        - bind: Mounts a file or directory from the host into the container. Must exist prior to creating the container.
        - volume: Creates a volume with the given name and options (or uses a pre-existing volume with the same name and options). These are not removed when the container is removed.
        - tmpfs: Create a tmpfs with the given options. The mount source cannot be specified for tmpfs.
        """
        Type: MOUNTTYPE
        """
        Whether the mount should be read-only.
        """
        ReadOnly: Boolean
        """
        The consistency requirement for the mount: default, consistent, cached, or delegated.
        """
        Consistency: String
        """
        Optional configuration for the bind type.
        """
        BindOptions: BINDOPTIONS
    }

    enum PORTTYPE {
        tcp
        udp
        sctp
    }

    enum MOUNTTYPE {
        bind
        volume
        tmpfs
    }

    enum BINDOPTIONS {
        private
        rprivate
        shared
        rshared
        slave
        rslave
    }

    enum CONTAINERHEALTH {
        starting
        healthy
        unhealthy
        none
    }

    enum CONTAINERSTATUS {
        created
        restarting
        running
        removing
        paused
        exited
        dead
    }

    """
    Please note that only some of the available filters are implemented!
    """
    input ContainerFilter {
        ancestor: [String]
        expose: [String]
        health: [CONTAINERHEALTH]
        id: [String]
        is_task: Boolean
        name: [String]
        network: [String]
        status: [CONTAINERSTATUS]
        volume: [String]
    }
`;

export default typeDefs