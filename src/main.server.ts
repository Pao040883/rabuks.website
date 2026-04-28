import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { ServerRoute, RenderMode } from '@angular/ssr';
import { App } from './app/app';
import { appConfig } from './app/app.config';

const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender },
];

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

const config = mergeApplicationConfig(appConfig, serverConfig);

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
