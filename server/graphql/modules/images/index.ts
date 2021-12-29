import { createModule } from 'graphql-modules';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import typeDefs from './images.type';
import { docker } from '../../../docker/index'
import { resolveComponent } from 'nuxt3/dist/app/compat/capi';

let containerLinkedImages = []

export const ImagesModule = createModule({
  id: 'images',
  typeDefs: [typeDefs],
  resolvers: {
    DateTime: DateTimeResolver,
    JSONObject: JSONObjectResolver,
    Query: {
      async images(root, { all, filter, digests }) {

        try {
          let filterObj = {}
          if (filter) {
            'before' in filter ? filterObj['before'] = filter.before : ''
            'dangling' in filter ? filterObj['dangling'] = [`${filter.dangling}`] : ''
            'label' in filter ? filterObj['label'] = filter.label : ''
            'reference' in filter ? filterObj['reference'] = filter.reference : ''
            'since' in filter ? filterObj['since'] = filter.since : ''
          }

          return await docker.listImages({
            all,
            filters: JSON.stringify(filterObj),
            digests
          })
        } catch (err) {
          throw Error(err)
        }
      }
    },
    Image: {
      Id(image) {
        return image.Id
      },
      ParentId(image) {
        return image.ParentId
      },
      RepoTags(image) {
        return image.RepoTags
      },
      RepoDigests(image) {
        return image.RepoDigests
      },
      Created(image) {
        return image.Created
      },
      Size(image) {
        return image.Size
      },
      SharedSize(image) {
        return image.SharedSize
      },
      VirtualSize(image) {
        return image.VirtualSize
      },
      Labels(image) {
        return image.Labels
      },
      Containers(image) {
        return image.Containers
      },

    },
    Container: {
      linkedImages: async (container, args, context, info) => {
        try {
          const danglingImages = await getDanglingImages(info.path.prev.key)

          return danglingImages.filter((image) => image.Id === container.ImageID)
        } catch (err) {
          throw Error(err)
        }
      },
    },
  },
});

async function getDanglingImages(pathIdx) {

  // execute query only on first index to prevent loading data multiple times (on each container with linked images)
  if (pathIdx === 0) {
    containerLinkedImages = null
    containerLinkedImages = await docker.listImages({
      filters: "{\"dangling\":[\"false\"]}"
    })
  }

  // wait until data loaded globally
  while (containerLinkedImages == null)
    await new Promise(resolve => setTimeout(resolve, 100));

  return containerLinkedImages
}