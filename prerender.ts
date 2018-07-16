import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { join, resolve } from 'path';
import { enableProdMode } from '@angular/core';
import { readFileSync, mkdirSync, writeFile } from 'fs';
const APP_NAME = 'Portfolio';
const DIST_FOLDER = join(process.cwd(), 'dist');
const paths = [
  '/projects',
  '/contact',
  '/skills'
];

const index = readFileSync(resolve(`${DIST_FOLDER}/${APP_NAME}/index.html`), 'utf8');

const { AppServerModuleNgFactory } = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();

async function prerender(url: string, folder: string) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url,
    document: index
  }).then(html => {
    if (url !== '/index.html') {
      mkdirSync(folder);
      writeFile(`${folder}/index.html`, html, err => {
        if (err) {
          console.log(err);
        } else {
          console.log(`\x1b[32m\x1b[1mROUTE PRERENDERED SUCCESSFULLY:\x1b[0m\x1b[37m ${url}\x1b[0m`);
        }
      });
    }
  });
}

paths.forEach(path => prerender(path, join(DIST_FOLDER, APP_NAME, path)) );
