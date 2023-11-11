const fs = require('fs');

console.log("Sorting urls.json")
// Sort urls.json
fs.readFile('urls.json', 'utf8', function(err, data) {
    if (err) throw err;

    let array = JSON.parse(data);

    array.sort();

    // Write the sorted array back to the JSON file
    fs.writeFile('urls.json', JSON.stringify(array, null, 2), 'utf8', function(err) {
        if (err) throw err;
        console.log('The file has been saved with the sorted array!');
    });
});
