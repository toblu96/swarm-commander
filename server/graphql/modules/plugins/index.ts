import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './plugins.type';
import { docker } from '../../../docker/index'

export const PluginsModule = createModule({
  id: 'plugins',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
      async plugins(root, { filter }) {

        try {
          let filterObj = {}
          if (filter) {
            'capability' in filter ? filterObj['capability'] = filter.capability : ''
            'enable' in filter ? filterObj['enable'] = [`${filter.enable}`] : ''
          }

          return await docker.listPlugins({
            filters: JSON.stringify(filterObj),
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Plugin: {
      Id(plugin) {
        return plugin.Id
      },
      Name(plugin) {
        return plugin.Name
      },
      Enabled(plugin) {
        return plugin.Enabled
      },
      Settings(plugin) {
        return plugin.Settings
      },
      PluginReference(plugin) {
        return plugin.PluginReference
      },
      Config(plugin) {
        return plugin.Config
      },
    },
  },
});
