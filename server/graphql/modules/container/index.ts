import { createModule } from 'graphql-modules';
import typeDefs from './container.type';

const container = [
  {
    _id: 'first',
    name: 'container name',
  },
  {
    _id: 'second',
    name: 'container name 2',
  },
  {
    _id: 'third',
    name: 'container name 3',
  }
]

export const UserModule = createModule({
  id: 'container',
  typeDefs: [typeDefs],
  resolvers: {
    Query: {
      user(root, { id }) {
        return {
          _id: id,
          username: 'jhon',
        };
      },
      container(root, { filter }) {
        return container.filter(x => x._id == filter.id);
      }
    },
    Mutation: {
      createContainer(container) {
        return {
          _id: container.id,
          name: 'some data'
        }
      }
    },
    Container: {
      id(container) {
        return container._id
      },
      name(container) {
        return container.name
      }
    },
    User: {
      id(user) {
        return user._id;
      },
      username(user) {
        return user.username;
      },
    },
  },
});

function buildFilters({ OR = [], description_contains, url_contains }) {
  const filter = (description_contains || url_contains) ? { description: {}, url: {} } : null;
  if (description_contains) {
    filter.description = { $regex: `.*${description_contains}.*` };
  }
  if (url_contains) {
    filter.url = { $regex: `.*${url_contains}.*` };
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(buildFilters(OR[i]));
  }
  return filters;
}
