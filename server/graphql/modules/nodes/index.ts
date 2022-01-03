import { createModule } from 'graphql-modules';
import typeDefs from './nodes.type';
import { QueryResolver } from './resolvers/Query'
import { MutationResolver } from './resolvers/Mutation'

export const NodesModule = createModule({
  id: 'nodes',
  typeDefs: [typeDefs],
  resolvers: [QueryResolver, MutationResolver]
});
