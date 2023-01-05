
import fs from 'fs';

fs.readFile('RejseplanenStoppesteder.csv', function (err, data) {

    if (err) {
        return console.error(err);
    }

    //Convert and store csv information into a buffer. 
    const bufferString = data.toString();
    const bufferArray = bufferString.split('\n');
    bufferArray.shift();
    console.log(bufferArray[0]);
});