import { docker } from '../../../../docker/index'

export const MutationResolver = {
    Mutation: {
        async createConfig(root, args) {
            try {
                let config = await docker.createConfig({
                    Name: args.input.Name,
                    Data: args.input.Data,
                    Labels: args.input.Labels
                })
                return config.id
            } catch (err) {
                throw Error(err)
            }
        },
        // async updateConfig(root, args) {
        //     try {
        //         let config = docker.getConfig(args.id)
        //         await config.update({
        //             _query: { version: args.version },
        //             _body: { Labels: args.input.Labels },
        //             // Name: args.input.Name,
        //             // Data: args.input.Data,
        //         })
        //         return config.id
        //     } catch (err) {
        //         throw Error(err)
        //     }
        // },
        async deleteConfig(root, args) {
            try {
                let config = docker.getConfig(args.id)
                await config.remove({})
                return config.id
            } catch (err) {
                throw Error(err)
            }
        }
    },
}