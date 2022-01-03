import { createModule } from 'graphql-modules';
import typeDefs from './volumes.type';
import { QueryResolver } from './resolvers/Query'
import { MutationResolver } from './resolvers/Mutation'

export const VolumesModule = createModule({
    id: 'volumes',
    typeDefs: [typeDefs],
    resolvers: [QueryResolver, MutationResolver]
});

