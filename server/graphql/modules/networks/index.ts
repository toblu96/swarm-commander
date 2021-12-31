import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './networks.type';
import { docker } from '../../../docker/index'

export const NetworksModule = createModule({
  id: 'networks',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
      async networks(root, { filter }) {

        try {
          let filterObj = {}
          if (filter) {
            'driver' in filter ? filterObj['driver'] = filter.driver : ''
            'id' in filter ? filterObj['id'] = filter.id : ''
            'label' in filter ? filterObj['label'] = filter.label : ''
            'name' in filter ? filterObj['name'] = filter.name : ''
            'scope' in filter ? filterObj['scope'] = filter.scope : ''
            'type' in filter ? filterObj['type'] = filter.type : ''
          }

          return await docker.listNetworks({
            filters: JSON.stringify(filterObj),
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Network: {
      Name(network) {
        return network.Name
      },
      Id(network) {
        return network.Id
      },
      Created(network) {
        return network.Created
      },
      Scope(network) {
        return network.Scope
      },
      Driver(network) {
        return network.Driver
      },
      EnableIPv6(network) {
        return network.EnableIPv6
      },
      IPAM(network) {
        return network.IPAM
      },
      Internal(network) {
        return network.Internal
      },
      Attachable(network) {
        return network.Attachable
      },
      Ingress(network) {
        return network.Ingress
      },
      Containers(network) {
        return network.Containers
      },
      Options(network) {
        return network.Options
      },
      Labels(network) {
        return network.Labels
      },
    },
  },
});
