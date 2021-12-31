import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './secrets.type';
import { docker } from '../../../docker/index'

export const SecretsModule = createModule({
  id: 'secrets',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
      async secrets(root, { filter }) {

        try {
          let filterObj = {}
          if (filter) {
            'id' in filter ? filterObj['id'] = filter.id : ''
            'label' in filter ? filterObj['label'] = filter.label : ''
            'name' in filter ? filterObj['name'] = filter.name : ''
            'names' in filter ? filterObj['names'] = filter.names : ''
          }

          return await docker.listSecrets({
            filters: JSON.stringify(filterObj),
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Secret: {
      ID(secret) {
        return secret.ID
      },
      Version(secret) {
        return secret.Version
      },
      CreatedAt(secret) {
        return secret.CreatedAt
      },
      UpdatedAt(secret) {
        return secret.UpdatedAt
      },
      Spec(secret) {
        return secret.Spec
      },
    },
  },
});
