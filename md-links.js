/* eslint-disable consistent-return */
/* eslint linebreak-style: ["error", "windows"] */
import fs from 'fs';
import path, { join, resolve } from 'path';
import MarkdownIt from 'markdown-it';
import { JSDOM } from 'jsdom';

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
export const getArraysOfaTags = (arrayResults) => arrayResults.map((result) => result.match(/<a\shref="http*.*>.*?<\/a>/g)).filter((tag) => tag !== null);
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
    const links = {};
    arrayObj.forEach((e, i) => {
      links[`Link ${i + 1}`] = e;
    });
    return links;
  }
  return 'No se encontraron links';
};
