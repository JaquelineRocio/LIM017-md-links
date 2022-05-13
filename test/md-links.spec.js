import {getPathOfMdFiles, isMdFile, readFileMd} from "../md-links.js";

describe('mdLinks', () => {

  it('debe retornar un array de paths relativos de los archivos .md', () => {

      const filesName = getPathOfMdFiles('folderExample');
      isMdFile(filesName);
      expect(isMdFile(filesName)).toEqual(    [
        'folderExample\\folder1\\file1.md',
        'folderExample\\folder3\\file2.md'
      ]);
  });
});