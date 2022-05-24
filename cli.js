#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint linebreak-style: ["error", "windows"] */

// eslint-disable-next-line import/extensions

import chalk from 'chalk';
import boxen from 'boxen';
import { argv } from 'node:process';
import mdLinks from './index.js';

const linksFeatures = mdLinks(argv[2], argv[3]);
linksFeatures
  .then((e) => {
    e.forEach((element) => {
      console.log(boxen(chalk.hex('#a2d2ff')(element.file), {
        title: 'File path', titleAlignment: 'center', borderColor: 'cyan',
      }));
      console.group();
      console.table(element.links);
      console.groupEnd();
    });
  })
  .catch(
    () => console.log('Tienes que colacar una ruta'),
  );
