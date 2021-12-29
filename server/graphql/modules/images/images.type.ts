import { createModule, gql } from 'graphql-modules';

const typeDefs = gql`
    scalar DateTime
    scalar JSONObject

    type Query {
        """
        List of Docker images.
        """
        images(
            """
            Show all images. Only images from a final layer (no children) are shown by default.
            ~~~
            Default: false
            ~~~
            """
            all: Boolean,
            filter: ImageFilter,
            """
            Show digest information as a RepoDigests field on each image.
            ~~~
            Default: false
            ~~~
            """
            digests: Boolean
        ): [Image]
    }

    type Image {
        Id: ID!
        ParentId: String!
        RepoTags: [String!]
        RepoDigests: [String!]
        """
        When the image was created (Unix epoch time format)
        """
        Created: Int!
        Size: Int!
        SharedSize: Int!
        VirtualSize: Int!
        Labels: JSONObject
        Containers: Int!
    }

    input ImageFilter {
        """
        ~~~
        <image-name>[:<tag>], <image id> or <image@digest>
        ~~~
        """
        before: [String]
        """
        When set to true, returns all images that are not in use by a container. When set to false, only images that are in use by one or more containers are returned.
        ~~~
        true, false
        ~~~
        """
        dangling: Boolean
        """
        ~~~
        label=key or label="key=value" of an image label
        ~~~
        """
        label: [String]
        """
        ~~~
        <image-name>[:<tag>]
        ~~~
        """
        reference: [String]
        """
        ~~~
        <image-name>[:<tag>], <image id> or <image@digest>
        ~~~
        """
        since: [String]
    }
`;

export default typeDefs