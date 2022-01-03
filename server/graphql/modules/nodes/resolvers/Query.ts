import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import { docker } from '../../../../docker/index'

export const QueryResolver = {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
        async nodes(root, { filter }) {

            try {
                let filterObj = {}
                if (filter) {
                    'id' in filter ? filterObj['id'] = filter.id : ''
                    'label' in filter ? filterObj['label'] = filter.label : ''
                    'membership' in filter ? filterObj['membership'] = filter.membership : ''
                    'name' in filter ? filterObj['name'] = filter.name : ''
                    'role' in filter ? filterObj['role'] = filter.role : ''
                }

                return await docker.listNodes({
                    filters: JSON.stringify(filterObj),
                })
            } catch (err) {
                console.error(err)
                throw Error(err)
            }
        }
    },
    Node: {
        ID(node) {
            return node.ID
        },
        Version(node) {
            return node.Version
        },
        CreatedAt(node) {
            return node.CreatedAt
        },
        UpdatedAt(node) {
            return node.UpdatedAt
        },
        Spec(node) {
            return node.Spec
        },
        Description(node) {
            return node.Description
        },
        Status(node) {
            return node.Status
        },
        ManagerStatus(node) {
            return node.ManagerStatus
        },
    },
}