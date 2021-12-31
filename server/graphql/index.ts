import { createApplication } from 'graphql-modules';
import { ContainerModule } from './modules/container';
import { ImagesModule } from './modules/images';
import { ServicesModule } from './modules/services';
import { VolumesModule } from './modules/volumes';

export const application = createApplication({
    modules: [ContainerModule, ImagesModule, ServicesModule, VolumesModule],
});

