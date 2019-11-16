const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const WebAssemblyFunctions = {};

init = async () =>
  readFile('./add.wasm')
    .then(WebAssembly.instantiate)
    .then(({ instance }) =>
      Object.assign(WebAssemblyFunctions, instance.exports)
    );

init().then(() => {
  console.log(WebAssemblyFunctions.add(8, 5));
});
