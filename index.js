/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint linebreak-style: ["error", "windows"] */
import chalk from 'chalk';
import boxen from 'boxen';

import {
  isvalidPath, getPathOfMdFiles, readFileMd, getLinks,
} from './md-links.js';

const mdLinks = (path) => new Promise((resolve, reject) => {
  if (isvalidPath(path).valid) {
    const arrayMdFiles = getPathOfMdFiles(isvalidPath(path).pathAbsolute);
    if (arrayMdFiles === 'empty') { reject('Error: Directorio Vacío'); }

    const dataArray = arrayMdFiles.map((pathMdFile) => {
      const itemsLink = getLinks(readFileMd(pathMdFile));
      return (itemsLink !== 'No se encontraron links') ? { file: pathMdFile, links: { ...itemsLink } } : reject('Error: Archivo vacío');
    });
    const resultados = dataArray.filter((e) => e !== '');
    resolve(resultados);
  }
  reject('Ruta no valida');
});
export default mdLinks;
const links = mdLinks('emptyFile.md');
links
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
    (err) => console.log(err),
  );
