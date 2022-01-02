import { createModule } from 'graphql-modules';
import typeDefs from './configs.type';
import { QueryResolver } from './resolvers/Query'
import { MutationResolver } from './resolvers/Mutation'

export const ConfigsModule = createModule({
  id: 'configs',
  typeDefs: [typeDefs],
  resolvers: [QueryResolver, MutationResolver]
});
