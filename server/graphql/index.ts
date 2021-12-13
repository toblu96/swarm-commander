import { createApplication } from 'graphql-modules';
import { UserModule } from './modules/container';

export const application = createApplication({
    modules: [UserModule],
});

