
import fs from 'fs';

fs.readFile('RejseplanenStoppesteder.csv', {encoding: "latin1"}, function (err, data) {
    if (err) {
        return console.error(err);
    }

    // const bufferString = data.toString();
    const bufferString = data;
    const bufferArray = bufferString.split('\n');
    bufferArray.shift();

    for (let i = 0; i < bufferArray.length; i++) {
        const stuffs = bufferArray[i].split(';').slice(0, 2);
        if (stuffs[1]) {
            stuffs[1] = stuffs[1].replace(/['"]+/g, '');
            bufferArray[i] = {
                [stuffs[0]]: stuffs[1]
            }
        }
    }

    console.log(bufferArray[0]);

    fs.writeFile('RejseplanenStoppesteder.json', JSON.stringify(bufferArray), function (err) {
        if (err) {
            return console.error(err);
        }
    });
});