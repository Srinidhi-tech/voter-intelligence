const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('../Election process education initial requirements.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
});
