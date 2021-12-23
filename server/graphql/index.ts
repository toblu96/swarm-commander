import { createApplication } from 'graphql-modules';
import { ContainerModule } from './modules/container';
import { VolumesModule } from './modules/volumes';

export const application = createApplication({
    modules: [ContainerModule, VolumesModule],
});

