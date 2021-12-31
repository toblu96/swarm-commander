import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './tasks.type';
import { docker } from '../../../docker/index'

export const TasksModule = createModule({
  id: 'tasks',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
      async tasks(root, { filter }) {

        try {
          let filterObj = {}
          if (filter) {
            'desired-state' in filter ? filterObj['desired-state'] = filter.desired_state : ''
            'id' in filter ? filterObj['id'] = filter.id : ''
            'label' in filter ? filterObj['label'] = filter.label : ''
            'name' in filter ? filterObj['name'] = filter.name : ''
            'node' in filter ? filterObj['node'] = filter.node : ''
            'service' in filter ? filterObj['service'] = filter.service : ''
          }

          return await docker.listTasks({
            filters: JSON.stringify(filterObj),
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Task: {
      ID(task) {
        return task.ID
      },
      Version(task) {
        return task.Version
      },
      CreatedAt(task) {
        return task.CreatedAt
      },
      UpdatedAt(task) {
        return task.UpdatedAt
      },
      Name(task) {
        return task.Name
      },
      Labels(task) {
        return task.Labels
      },
      Spec(task) {
        return task.Spec
      },
      ServiceID(task) {
        return task.ServiceID
      },
      Slot(task) {
        return task.Slot
      },
      NodeID(task) {
        return task.NodeID
      },
      AssignedGenericResources(task) {
        return task.AssignedGenericResources
      },
      Status(task) {
        return task.Status
      },
      DesiredState(task) {
        return task.DesiredState
      },
    },
  },
});
