#!/usr/bin/env node
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint linebreak-style: ["error", "windows"] */

import chalk from 'chalk';
import boxen from 'boxen';
import { argv } from 'node:process';
import mdLinks from './index.js';

const textForInvalid = 'Command not found. To see list of available commands, use \'mdLinks --help\'.';
const help = {
  '--validate': { Description: 'Show you additional information: status, ok/fail' },
  '--stats': { Description: 'Show the total number of links and unique links' },
  '--validate --stats or --stats --validate': { Description: 'Show the total number of links (total), unique links (unique) and broken links (broken).' },
};

// const path = argv[2];
const args = argv;
console.log(argv);
const stats = (path, broken) => mdLinks(path)
  .then((objArray) => {
    objArray.map((obj) => {
      console.log(chalk.hex('#a2d2ff')(obj.file));
      const total = Object.keys(obj.links).length;
      console.log('Total', total);
      const array = Object.values(obj.links).map((e) => e.href);
      const uniqueCount = new Set(array).size;
      console.log('Unique', uniqueCount);
      if (broken) {
        console.log('Broken', Object.values(obj.links).filter((objLink) => objLink.ok === 'fail').length);
      }
    });
  })
  .catch(
    (e) => console.error(e),
  );

const validate = () => {
  mdLinks(argv[2])
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
      (e) => console.error(e),
    );
};
const validateFalse = () => {
  mdLinks(argv[2], false)
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
      (e) => console.error(e),
    );
};
switch (true) {
  case (args.length === 2 || args[3] === '--help' || args[2] === '--help'):
    console.log(boxen(chalk.hex('#a2d2ff')('You can use mdLinks with the following options:'), {
      title: 'mdLinks', titleAlignment: 'center', borderColor: 'cyan',
    }));
    console.table(help);
    break;
  case (args.length === 4 && args[3] === '--stats'):
    stats(args[2], false);
    break;
  case ((args[3] === '--stats' && args[4] === '--validate') || (args[4] === '--stats' && args[3] === '--validate')):
    stats(args[2], true);
    break;
  case ((args[3]) === '--validate'):
    validate();
    break;
  case (args.length === 3):
    validateFalse();
    break;
  default:
    console.log(textForInvalid);
    break;
}
