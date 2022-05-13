/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint linebreak-style: ["error", "windows"] */
import MarkdownIt from 'markdown-it';
import { isvalidPath, getPathOfMdFiles, readFileMd } from './md-links.js';

const mdLinks = (path, options) => {
  if (isvalidPath(path)[0]) {
    const arrayMdFiles = getPathOfMdFiles(isvalidPath(path)[1]);
    if (options === true) {
      const href = 'algoo';
    }
    const arrayDataFiles = arrayMdFiles.map((element) => readFileMd(element));
    return arrayDataFiles;
  }
};
export default mdLinks;
const links = mdLinks('README.md', true);

console.log(links);
