import { gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker plugins.
        """
        plugins(
            filter: PluginFilter,
        ): [Plugin]
    }

    type Plugin {
        """
        The ID of the plugin.
        """
        Id: ID!
        """
        The name of the plugin.
        """
        Name: String!
        """
        True if the plugin is running. False if the plugin is not running, only installed.
        """
        Enabled: Boolean!
        """
        Settings that can be modified by users.
        """
        Settings: JSONObject!
        """
        Plugin remote reference used to push/pull the plugin.
        """
        PluginReference: String!
        """
        The config of a plugin.
        """
        Config: JSONObject!
    }

    input PluginFilter {
        """
        ~~~
        <capability name>
        ~~~
        """
        capability: [String]
        """
        ~~~
        <true>|<false>
        ~~~
        """
        enable: Boolean
    }
`;

export default typeDefs