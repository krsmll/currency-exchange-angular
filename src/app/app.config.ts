import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ConfigLoaderService } from './services/config-loader.service';
import { Config } from './config/config';
import { provideHttpClient } from '@angular/common/http';

function configLoader(configLoader: ConfigLoaderService) {
	return () => configLoader.load();
}

function configFactory(configLoader: ConfigLoaderService) {
	return configLoader.getConfig();
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		{
			provide: APP_INITIALIZER,
			useFactory: configLoader,
			deps: [ConfigLoaderService],
			multi: true,
		},
		{
			provide: Config,
			useFactory: configFactory,
			deps: [ConfigLoaderService],
		},
		provideHttpClient(),
	],
};
