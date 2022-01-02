import { docker } from '../../../../docker/index'

export const MutationResolver = {
    Mutation: {
        async createSecret(root, args) {
            try {
                let secret = await docker.createSecret({
                    Name: args.input.Name,
                    Data: args.input.Data,
                    Labels: args.input.Labels
                })
                return secret.id
            } catch (err) {
                throw Error(err)
            }
        },
        /*
        async updateSecret(root, args) {
            try {
                console.log(args.input.Labels)
                let secret = docker.getSecret(args.id)
                await secret.update({
                    _query: { version: args.version },
                    _body: { Labels: args.input.Labels },
                    // Name: args.input.Name,
                    // Data: args.input.Data,
                })
                return secret.id
            } catch (err) {
                throw Error(err)
            }
        },
        */
        async deleteSecret(root, args) {
            try {
                let secret = docker.getSecret(args.id)
                await secret.remove()
                return secret.id
            } catch (err) {
                throw Error(err)
            }
        }
    },
}