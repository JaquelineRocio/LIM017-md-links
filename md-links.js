/* eslint-disable consistent-return */
/* eslint linebreak-style: ["error", "windows"] */
import fs from 'fs';
import path, { join, resolve } from 'path';

export const isvalidPath = (pathRoot) => {
  const pathAbsolute = (path.isAbsolute(pathRoot)) ? pathRoot : resolve(pathRoot);
  const valid = fs.existsSync(pathAbsolute);
  return [valid, pathAbsolute];
};
export const isMdFile = (arrPaths) => arrPaths.filter((direction) => path.extname(direction) === '.md');
export const getPathOfMdFiles = (pathRoot) => {
  const firstStatFile = fs.statSync(pathRoot);

  if (firstStatFile.isFile()) return [pathRoot];
  const fileNames = fs.readdirSync(pathRoot);
  if (fileNames !== []) {
    const arrFiles = fileNames.map((fileName) => {
      const filePath = join(pathRoot, fileName);
      const statFile = fs.statSync(filePath);
      return (statFile.isDirectory()) ? getPathOfMdFiles(filePath) : filePath;
    });
    return isMdFile(arrFiles.flat());
  }

  console.log('Error: El directorio esta vacio');
};

export const readFileMd = (pathRoot) => fs.readFileSync(pathRoot, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
