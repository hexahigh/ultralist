const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'lists');
const outputPath = path.join(__dirname, 'list.txt');

let lines = new Set();

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  files.forEach((file) => {
    let data = fs.readFileSync(path.join(directoryPath, file), 'utf8');
    let fileLines = data.split('\n');
    fileLines.forEach((line) => lines.add(line));
  });

  let uniqueLines = Array.from(lines).join('\n');
  fs.writeFileSync(outputPath, uniqueLines);
  console.log('All files merged into list.txt');
});
