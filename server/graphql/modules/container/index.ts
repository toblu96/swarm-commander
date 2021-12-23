import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver, IPv4Resolver, IPv6Resolver } from 'graphql-scalars';
import typeDefs from './container.type';
import { docker } from '../../../docker/index'

export const ContainerModule = createModule({
  id: 'container',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    IPv4IPv6: [IPv4Resolver, IPv6Resolver],
    Query: {
      async container(root, { all, limit, size, filter }) {

        try {
          let filterObj = {}
          if (filter) {
            'ancestor' in filter ? filterObj['ancestor'] = filter.ancestor : ''
            'expose' in filter ? filterObj['expose'] = filter.expose : ''
            'health' in filter ? filterObj['health'] = filter.health : ''
            'id' in filter ? filterObj['id'] = filter.id : ''
            'is_task' in filter ? filterObj['is-task'] = [`${filter.is_task}`] : ''
            'name' in filter ? filterObj['name'] = filter.name : ''
            'network' in filter ? filterObj['network'] = filter.network : ''
            'status' in filter ? filterObj['status'] = filter.status : ''
            'volume' in filter ? filterObj['volume'] = filter.volume : ''
          }

          return await docker.listContainers({
            all,
            limit,
            size,
            filters: JSON.stringify(filterObj)
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Container: {
      Id(container) {
        return container.Id
      },
      Names(container) {
        return container.Names
      },
      Image(container) {
        return container.Image
      },
      ImageID(container) {
        return container.ImageID
      },
      Command(container) {
        return container.Command
      },
      Created(container) {
        return container.Created
      },
      State(container) {
        return container.State
      },
      Status(container) {
        return container.Status
      },
      Ports(container) {
        return container.Ports
      },
      Labels(container) {
        return container.Labels
      },
      SizeRw(container) {
        return container.SizeRw
      },
      SizeRootFs(container) {
        return container.SizeRootFs
      },
      HostConfig(container) {
        return container.HostConfig
      },
      NetworkSettings(container) {
        return container.NetworkSettings
      },
      Mounts(container) {
        return container.Mounts
      },
    },
  },
});


