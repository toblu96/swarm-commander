import { createApplication } from 'graphql-modules';
import { ContainerModule } from './modules/container';
import { ImagesModule } from './modules/images';
import { ServicesModule } from './modules/services';
import { NodesModule } from './modules/nodes';
import { TasksModule } from './modules/tasks';
import { SecretsModule } from './modules/secrets';
import { ConfigsModule } from './modules/configs';
import { PluginsModule } from './modules/plugins';
import { VolumesModule } from './modules/volumes';
import { NetworksModule } from './modules/networks';

export const application = createApplication({
    modules: [
        ContainerModule,
        ImagesModule,
        ServicesModule,
        NodesModule,
        TasksModule,
        SecretsModule,
        ConfigsModule,
        PluginsModule,
        VolumesModule,
        NetworksModule
    ],
});

