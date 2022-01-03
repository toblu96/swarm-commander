import { docker } from '../../../../docker/index'

export const MutationResolver = {
    Mutation: {
        async createVolume(root, args) {
            try {
                let volume = await docker.createVolume({
                    Name: args.input?.Name,
                    Driver: args.input?.Driver,
                    DriverOpts: args.input?.DriverOpts,
                    Labels: args.input?.Labels
                })
                return volume.name
            } catch (err) {
                throw Error(err)
            }
        },
        async deleteVolume(root, args) {
            try {
                let volume = docker.getVolume(args.name)
                await volume.remove({
                    _query: { force: args.force },
                })
                return volume.name
            } catch (err) {
                throw Error(err)
            }
        },
        async pruneVolumes(root, args) {
            try {
                return await docker.pruneVolumes(args.name)
            } catch (err) {
                throw Error(err)
            }
        }
    },
}