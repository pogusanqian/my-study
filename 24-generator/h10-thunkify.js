const fs = require('fs');
const thunkify = require('thunkify');

const readFile = thunkify(fs.readFile);
readFile('./hello.txt')((err, buf) => console.log(buf.toString()));