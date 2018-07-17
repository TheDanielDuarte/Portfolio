import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(_ => {
      if (environment.production && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('/ngsw-worker.js');
      }
    })
    .catch(err => console.log(err));
});
