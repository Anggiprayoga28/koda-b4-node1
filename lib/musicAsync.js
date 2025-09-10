const fs = require('fs');
const path = require('path');

function artisAsync(callback) {
  const targetDir = "./music";

  fs.mkdir(targetDir, { recursive: true }, (err) => {
    if (err && err.code !== 'EEXIST') {
      return callback(err);
    }

    let completed = 0;
    const total = music.length;

    music.forEach(song => {
      const artistFolder = path.join(targetDir, song.artist);
      
      fs.mkdir(artistFolder, { recursive: true }, (err) => {
        if (err && err.code !== 'EEXIST') {
          return callback(err);
        }

        const filePath = path.join(artistFolder, song.fileName);
        fs.writeFile(filePath, "", "utf8", (err) => {
          if (err) return callback(err);
          
          console.log(`Created file: ${artistFolder}/${song.fileName}`);
          completed++;
          
          if (completed === total) {
            callback(null);
          }
        });
      });
    });
  });
}

artisAsync((err) => {
  if (err) console.error(err);
  else console.log('All files created!');
});