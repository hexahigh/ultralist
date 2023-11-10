const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'temp');
const outputPath = path.join(__dirname, 'lists/ultralist-UB.txt');
const prependFilePath = path.join(__dirname, 'extra.txt');

let lines = new Set();

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 

  // Text to prepend
  let prependText = fs.readFileSync(prependFilePath, 'utf8');

  files.forEach((file) => {
    let data = fs.readFileSync(path.join(directoryPath, file), 'utf8');
    let fileLines = data.split('\n');
    fileLines.forEach((line) => {
      // Only add the line if it doesn't start with "!"
      if (!line.startsWith('!')) {
        lines.add(line);
      }
    });
    console.log(`Merged file: ${file}`);
  });

  let uniqueLines = prependText + Array.from(lines).join('\n'); // Prepend the text
  fs.writeFileSync(outputPath, uniqueLines);
  console.log('All files merged into list');
});
