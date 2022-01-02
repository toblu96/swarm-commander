import { gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker secrets.
        """
        secrets(
            filter: SecretFilter,
        ): [Secret]
    }

    type Mutation {
        createSecret(input: SecretInput): String
        # """
        # Currently, only the Labels field can be updated. All other fields must remain unchanged from the SecretInspect endpoint response values.
        # """
        # updateSecret(id: ID!, version: Int!, input: SecretInput): String
        deleteSecret(id: ID!): String
    }

    type Secret {
        """
        The ID of the secret.
        """
        ID: ID!
        """
        The version number of the object such as node, service, etc. This is needed to avoid conflicting writes. The client must send the version number along with the modified specification when updating these objects. This approach ensures safe concurrency and determinism in that the change on the object may not be applied if the version number has changed from the last read. In other words, if two update requests specify the same base version, only one of the requests can succeed. As a result, two separate update requests that happen at the same time will not unintentionally overwrite each other.
        """
        Version: JSONObject!
        """
        Date and time at which the secret was added to the swarm in RFC 3339 format with nano-seconds.
        """
        CreatedAt: DateTime!
        """
        Date and time at which the secret was added to the swarm in RFC 3339 format with nano-seconds.
        """
        UpdatedAt: DateTime!
        """
        User modifiable secret configuration.
        """
        Spec: JSONObject!
    }

    input SecretFilter {
                """
        ~~~
        <secret id>
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
        <secret name>
        ~~~
        """
        name: [String]
        """
        ~~~
        <secret name>
        ~~~
        """
        names: [String]
    }

    input SecretInput {
        """
        User-defined name of the secret.
        """
        Name: String
        """
        User-defined key/value metadata.
        """
        Labels: JSONObject
        """
        Base64-url-safe-encoded (RFC 4648) data to store as secret.
        This field is only used to create a secret, and is not returned by other endpoints.
        """
        Data: String
        # Driver: JSONObject
        # Templating: JSONObject
    }
`;

export default typeDefs