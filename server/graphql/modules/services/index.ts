import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './services.type';
import { docker } from '../../../docker/index'

export const ServicesModule = createModule({
  id: 'services',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
      async services(root, { filter }) {

        try {
          let filterObj = {}
          if (filter) {
            'id' in filter ? filterObj['id'] = filter.id : ''
            'label' in filter ? filterObj['label'] = filter.label : ''
            'mode' in filter ? filterObj['mode'] = filter.mode : ''
            'name' in filter ? filterObj['name'] = filter.name : ''
          }

          console.log(await docker.listServices({
            filters: JSON.stringify(filterObj),
          }))

          return await docker.listServices({
            filters: JSON.stringify(filterObj),
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Service: {
      ID(service) {
        return service.ID
      },
      Version(service) {
        return service.Version
      },
      CreatedAt(service) {
        return service.CreatedAt
      },
      UpdatedAt(service) {
        return service.UpdatedAt
      },
      Spec(service) {
        return service.Spec
      },
      Endpoint(service) {
        return service.Endpoint
      },
      UpdateStatus(service) {
        return service.UpdateStatus
      },
    },
  },
});
