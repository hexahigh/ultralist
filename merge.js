const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "temp");
const outputPath = path.join(__dirname, "lists/ultralist-UB.txt");
const prependFilePath = path.join(__dirname, "extra.txt");

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const formattedTime = currentDate.toLocaleTimeString("en-US", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
});
const formattedDateTime = `${formattedDate} ${formattedTime} UTC`;
const unixTime = Math.round(currentDate.getTime() / 1000);

let lines = new Set();

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  // Text to prepend
  let prependText = fs.readFileSync(prependFilePath, "utf8");

  // Replace the placeholder string with the current date and time
  prependText = prependText.replaceAll("%timeUpdated%", formattedDateTime);
  prependText = prependText.replace("%version%", unixTime);

  files.forEach((file) => {
    let data = fs.readFileSync(path.join(directoryPath, file), "utf8");
    let fileLines = data.split("\n");
    fileLines.forEach((line) => {
      // Only add the line if it is not a comment
      if (!line.startsWith("!") || line.startsWith("!#")) {
        lines.add(line);
      }
    });
    console.log(`Merged file: ${file}`);
  });

  let uniqueLines = prependText + Array.from(lines).join("\n"); // Prepend the text
  fs.writeFileSync(outputPath, uniqueLines);
  console.log("All files merged into list");
});
