let fs = require('fs');
let path = require('path');
let matches = {files: [], folders:[]}

export default function searchFiles(name, currDir) {
  fs.readdir(currDir, { withFileTypes: true }, (err, files) => {
    for (let dir of files) {
      if (dir.name.toLowerCase().includes(name.toLowerCase())) {
        matches.files.push(dir);
      }
      if (dir.isDirectory()) {
        searchFiles(name, path.join(currDir, dir.name));
      }
    }
  });
}

