// import { request } from 'https';

// const options = {
//   hostname: 'example.com',
//   port: 443,
//   path: '/todos',
//   method: 'GET',
// };

// const req = request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`);

//   res.on('data', d => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', error => {
//   console.error(error);
// });

// req.end();
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { readdir, stat } from 'fs/promises';

const getFilesFromDirectory = async (directoryPath) => {
  const filesInDirectory = await readdir(directoryPath);
  const files = await Promise.all(
      filesInDirectory.map(async (file) => {
          const filePath = join(directoryPath, file);
          const stats = await stat(filePath);
          
          if (stats.isDirectory()) {
              return getFilesFromDirectory(filePath);
          } else {
              return filePath;
          }
      })
  );
  console.log(files)
  return files.filter((file) => file.length); // return with empty arrays removed
};

const displayFiles = async () => {
  console.log(await getFilesFromDirectory('folderExample'));
};

displayFiles();
// Function to get current filenames
// in directory with "withFileTypes"
// set to "true" 
  
fs.readdir('folderExample', 
  { withFileTypes: true },
  (err, files) => {
  console.log("\nCurrent directory files:");
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      console.log(file);
    })
  }
})
export const getPathFilesAsync = (directoryPath) =>{
  return readdir(directoryPath)
        .then(files=>{
          return Promise.all(files.map(file =>{
              const filePath = join(directoryPath, file);
              return stat(filePath)
                    .then(
                      stats=>{
                        if(stats.isDirectory())
                        {
                          return getPathFilesAsync(filePath);
                        }
                        else
                        {
                            return Promise.resolve(filePath);
                        }
                      }
                    )
                    .catch(
                      error=> error
                    )
            })
          ).then(
            paths => paths.flat()
          );
        })
        .catch(error=>error)
}