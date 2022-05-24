/* eslint-disable import/extensions */
/* eslint linebreak-style: ["error", "windows"] */
import { resolve } from 'path';
import {
  getLinks, getPathOfMdFiles, isMdFile, isvalidPath,
} from '../md-links.js';

describe('mdLinks', () => {
  it('La ruta no es valida', () => {
    const fakePath = 'fakePath';
    expect(isvalidPath(fakePath)).toEqual({
      valid: false,
      pathAbsolute: resolve(fakePath),
    });
  });
  it('Retorna un array de paths relativos de los archivos .md', () => {
    const filesName = getPathOfMdFiles('folderExample');
    isMdFile(filesName);
    expect(isMdFile(filesName)).toEqual([
      'folderExample\\folder1\\file1.md',
      'folderExample\\folder3\\file2.md',
    ]);
  });
  it('Retorna un objeto de links y sus propiedades', () => {
    const file = ' * [Empezando con Jest - Documentación oficial](https://jestjs.io/docs/es-ES/getting-started)';
    expect(getLinks(file)).toEqual({
      'Link 1': {
        href: 'https://jestjs.io/docs/es-ES/getting-started',
        text: 'Empezando con Jest - Documentación oficial',
      },
    });
  });
  it('Muestra un mensaje de error', () => {
    const fileEmpty = ' ';
    expect(getLinks(fileEmpty)).toEqual('No se encontraron links');
  });
});
