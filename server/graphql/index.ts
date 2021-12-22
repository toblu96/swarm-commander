import { createApplication } from 'graphql-modules';
import { UserModule } from './modules/container';
import { VolumesModule } from './modules/volumes';

export const application = createApplication({
    modules: [UserModule, VolumesModule],
});

