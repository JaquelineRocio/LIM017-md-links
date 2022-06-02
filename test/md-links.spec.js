/* eslint-disable import/extensions */
/* eslint linebreak-style: ["error", "windows"] */
import { resolve } from 'path';
import {
  getLinks, getPathOfMdFiles, isMdFile, isvalidPath, getDataHttpRequest,
} from '../md-links.js';

jest.mock('node-fetch');
describe('md-links', () => {
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
  it('Retorna un array con el status y ok del link', () => {
    const arrObj = [
      {
        file: 'D:\\LABORATORIA\\PROYECTOS\\LIM017-md-links\\folderExample\\folder1\\file1.md',
        links: {
          'Link 1': { href: 'https://es.wikipedia.org/wiki/Markdown', text: 'Markdown' },
          'Link 2': { href: 'https://nodejs.org/es/', text: 'Node.js' },
        },
      }];
    const results = [[200, 'ok'], [200, 'ok']];
    return getDataHttpRequest(arrObj).then((arrayStatus) => {
      expect(arrayStatus).toStrictEqual(results);
    });
  });
});
