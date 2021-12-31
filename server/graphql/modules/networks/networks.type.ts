import { gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker networks.
        """
        networks(
            filter: NetworkFilter,
        ): [Network]
    }

    type Network {
        """
        The name of the network.
        """
        Name: String
        """
        The ID of the network.
        """
        Id: ID!
        """
        Date and time at which the network was added to the swarm in RFC 3339 format.
        """
        Created: DateTime
        
        Scope: String
        Driver: String
        EnableIPv6: Boolean
        IPAM: JSONObject
        Internal: Boolean
        Attachable: Boolean
        Ingress: Boolean
        Containers: JSONObject
        Options: JSONObject
        Labels: JSONObject
    }

    input NetworkFilter {
        """
        Matches a network's driver.
        ~~~
        <driver-name>
        ~~~
        """
        driver: [String]
        """
        Matches all or part of a network ID.
        ~~~
        <network-id>
        ~~~
        """
        id: [String]
        """
        Matches a network label.
        ~~~
        label=<key> or label=<key>=<value>
        ~~~
        """
        label: [String]
        """
        Matches all or part of a network name.
        ~~~
        <network-name>
        ~~~
        """
        name: [String]
        """
        Filters networks by scope (swarm, global, or local).
        ~~~
        ["swarm"|"global"|"local"]
        ~~~
        """
        scope: [String]
        """
        Filters networks by type. The custom keyword returns all user-defined networks.
        ~~~
        ["custom"|"builtin"]
        ~~~
        """
        type: [String]
    }
`;

export default typeDefs