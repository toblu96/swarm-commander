import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import { docker } from '../../../../docker/index'

export const QueryResolver = {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
        async configs(root, { filter }) {

            try {
                let filterObj = {}
                if (filter) {
                    'id' in filter ? filterObj['id'] = filter.id : ''
                    'label' in filter ? filterObj['label'] = filter.label : ''
                    'name' in filter ? filterObj['name'] = filter.name : ''
                    'names' in filter ? filterObj['names'] = filter.names : ''
                }

                return await docker.listConfigs({
                    filters: JSON.stringify(filterObj),
                })
            } catch (err) {
                throw Error(err)
            }
        }
    },
    Config: {
        ID(config) {
            return config.ID
        },
        Version(config) {
            return config.Version
        },
        CreatedAt(config) {
            return config.CreatedAt
        },
        UpdatedAt(config) {
            return config.UpdatedAt
        },
        Spec(config) {
            return config.Spec
        },
    },
}