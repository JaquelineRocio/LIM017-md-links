import fs from 'fs';
import path, { join ,resolve} from 'path';

const rootPath = 'folderExample';
export const isAbsolutePath=(pathRoot)=>{
        return path.isAbsolute(pathRoot);
}
export const convertToAbsolutePath = (pathRoot) =>{
    return resolve(pathRoot);
}
export const getPathFiles=(pathRoot)=>{
    const fileNames = fs.readdirSync(pathRoot);
    const arrFiles = fileNames.map(fileName => {
                                const filePath = join(pathRoot, fileName);
                                const statFile = fs.statSync(filePath);
                                return (statFile.isDirectory())? getPathFilesSync(filePath): filePath;
                              })
    return arrFiles.flat();
  }
  

  
  console.log(isAbsolutePath(rootPath));
