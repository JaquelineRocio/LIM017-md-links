/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint linebreak-style: ["error", "windows"] */

import {
  isvalidPath, getPathOfMdFiles, readFileMd, getLinks, getDataHttpRequest,
} from './md-links.js';

const mdLinks = (path, options = { validate: true }) => new Promise((resolve, reject) => {
  if (isvalidPath(path).valid) {
    const arrayMdFiles = getPathOfMdFiles(isvalidPath(path).pathAbsolute);
    if (arrayMdFiles === 'empty') { reject('Error: Directorio Vacío'); }

    const dataArray = arrayMdFiles.map((pathMdFile) => {
      const itemsLink = getLinks(readFileMd(pathMdFile));
      return (itemsLink !== 'No se encontraron links') ? { file: pathMdFile, links: { ...itemsLink } } : reject('Error: Archivo vacío');
    });
    const resultados = dataArray.filter((e) => e !== '');
    if (options.validate) {
      resolve(getDataHttpRequest(resultados).then((arrayHttpRequest) => {
        let lengthObj = 0;
        resultados.forEach((obj) => {
          for (const key in obj.links) {
            if (Object.prototype.hasOwnProperty.call(obj.links, key)) {
              const statusLink = 'status';
              const okLink = 'ok';
              obj.links[key][statusLink] = arrayHttpRequest[lengthObj][0];
              obj.links[key][okLink] = arrayHttpRequest[lengthObj][1];
              lengthObj += 1;
            }
          }
        });
        return resultados;
      }));
    } else {
      resolve(resultados);
    }
  }
  reject('Invalid path');
});
export default mdLinks;
