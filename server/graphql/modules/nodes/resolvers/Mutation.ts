import { docker } from '../../../../docker/index'

export const MutationResolver = {
    Mutation: {
        async updateNode(root, args) {
            try {
                let node = docker.getNode(args.id)
                await node.update({
                    _query: { version: args.version },
                    _body: {
                        Labels: args.input.Labels,
                        Role: args.input.Role,
                        Availability: args.input.Availability,
                        Name: args.input.Name,
                    },
                    // Data: args.input.Data,
                })
                return node.id
            } catch (err) {
                throw Error(err)
            }
        },
        async deleteNode(root, args) {
            try {
                let node = docker.getNode(args.id)
                await node.remove()
                return node.id
            } catch (err) {
                throw Error(err)
            }
        }
    },
}