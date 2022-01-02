import { createModule } from 'graphql-modules';
import typeDefs from './secrets.type';
import { QueryResolver } from './resolvers/Query'
import { MutationResolver } from './resolvers/Mutation'

export const SecretsModule = createModule({
  id: 'secrets',
  typeDefs: [typeDefs],
  resolvers: [QueryResolver, MutationResolver]
});
