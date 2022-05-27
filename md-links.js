/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint linebreak-style: ["error", "windows"] */
import fs from 'fs';
import path, { join, resolve } from 'path';
import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

export const isvalidPath = (pathRoot) => {
  const pathAbsolute = (path.isAbsolute(pathRoot)) ? pathRoot : resolve(pathRoot);
  const valid = fs.existsSync(pathAbsolute);
  return { valid, pathAbsolute };
};
export const isMdFile = (arrPaths) => arrPaths.filter((direction) => path.extname(direction) === '.md');

export const getPathOfMdFiles = (pathRoot) => {
  const firstStatFile = fs.statSync(pathRoot);
  if (firstStatFile.isFile()) return [pathRoot];
  const fileNames = fs.readdirSync(pathRoot);

  if (fileNames.length !== 0) {
    const arrFiles = fileNames.map((fileName) => {
      const filePath = join(pathRoot, fileName);
      const statFile = fs.statSync(filePath);
      return (statFile.isDirectory()) ? getPathOfMdFiles(filePath) : filePath;
    });
    return isMdFile(arrFiles.flat());
  }
  return 'empty';
};

export const readFileMd = (pathRoot) => fs.readFileSync(pathRoot, 'utf8', (err, data) => {
  if (err) throw err;
  return (data);
});

export const getLinks = (dataFile) => {
  const md = new MarkdownIt();
  const dataHTML = md.render(dataFile);
  const arrayTags = dataHTML.match(/<a\shref="http*.*>.*?<\/a>/g);
  if (arrayTags !== null) {
    const arrayObj = arrayTags.map((tag) => {
      const dom = new JSDOM(`<!DOCTYPE html>${tag}`);
      const link = dom.window.document.querySelector('a').href;
      const textLink = dom.window.document.querySelector('a').textContent;

      return { href: link, text: textLink.slice(0, 50) };
    });
    const dataBylinks = {};
    arrayObj.forEach((e, i) => {
      dataBylinks[`Link ${i + 1}`] = e;
    });
    return dataBylinks;
  }
  return 'No se encontraron links';
};
export const getHttpRequest = (url) => fetch(url)
  .then((res) => [res.status, (res.ok) ? 'ok' : 'fail'])
  .catch((e) => console.error(e));

export const getDataHttpRequest = (arrayObj) => {
  const hrefs = [];
  arrayObj.forEach((obj) => {
    for (const key in obj.links) {
      if (Object.prototype.hasOwnProperty.call(obj.links, key)) {
        hrefs.push(obj.links[key].href);
      }
    }
  });
  return Promise.all(hrefs.map((href) => getHttpRequest(href).then((e) => e)))
    .then((values) => values);
};
