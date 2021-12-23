import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './volumes.type';
import { docker } from '../../../docker/index'

export const VolumesModule = createModule({
    id: 'volumes',
    typeDefs: [typeDefs],
    resolvers: {
        DateTime: DateTimeResolver,
        JSONObject: JSONObjectResolver,
        Query: {
            async volumes(root, { filter }) {

                try {
                    let filterObj = {}
                    if (filter) {
                        'dangling' in filter ? filterObj['dangling'] = [`${filter.dangling}`] : ''
                        'driver' in filter ? filterObj['driver'] = filter.driver : ''
                        'label' in filter ? filterObj['label'] = filter.label : ''
                        'name' in filter ? filterObj['name'] = filter.name : ''
                    }

                    const volArr = await docker.listVolumes({
                        filters: JSON.stringify(filterObj),
                    })

                    return (volArr.Warnings ? Error(volArr.Warnings) : volArr.Volumes)
                } catch (err) {
                    throw Error(err)
                }
            }
        },
        Volume: {
            Name(volume) {
                return volume.Name
            },
            Driver(volume) {
                return volume.Driver
            },
            Mountpoint(volume) {
                return volume.Mountpoint
            },
            CreatedAt(volume) {
                return volume.CreatedAt
            },
            Labels(volume) {
                return volume.Labels
            },
            Scope(volume) {
                return volume.Scope
            },
            Options(volume) {
                return volume.Options
            },
        },
    },
});

