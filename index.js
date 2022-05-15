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
    if (arrayMdFiles === 'empty') { reject('Error: Vacio'); }

    const dataArray = arrayMdFiles.map((pathMdFile) => {
      const itemsLink = getLinks(readFileMd(pathMdFile));
      return (itemsLink !== undefined) ? { file: pathMdFile, links: { ...itemsLink } } : '';
    });
    const resultados = dataArray.filter((e) => e !== '');
    resolve(resultados);
  }
});
export default mdLinks;
const links = mdLinks('folderExample');

links
  .then((e) => {
    e.forEach((element) => {
      console.log(boxen(chalk.hex('#a2d2ff')(element.file), {
        title: 'File path', titleAlignment: 'center', borderColor: '#ffc8dd', color: 'white',
      }));
      console.group();
      console.table(element.links);
      console.groupEnd();
    });
  })
  .catch(
    (err) => console.log(err),
  );
// const found = result.match(/<a\shref="http*.*>.*?<\/a>/g);

// const dom = new JSDOM(`<!DOCTYPE html>${found[0]}`);
// console.log(dom.window.document.querySelector('a').href);
