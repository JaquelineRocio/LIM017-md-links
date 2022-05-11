import fs from 'fs';
import path, { join ,resolve} from 'path';

const rootPath = 'folderExample';
export const isAbsolutePath=(pathRoot)=>{
        return path.isAbsolute(pathRoot);
}
export const convertToAbsolutePath = (pathRoot) =>{
    return resolve(pathRoot);
}

