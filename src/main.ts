import { bootstrapApplication } from '@angular/platform-browser';
import { AppCmp } from './app/app.cmp';
import { appConfig } from './app/app.config';

bootstrapApplication(AppCmp, appConfig).catch((err) => console.error(err));
