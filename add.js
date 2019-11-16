const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const loadWebAssemblyFunctions = async path =>
  readFile(path)
    .then(WebAssembly.instantiate)
    .then(({ instance }) => instance.exports);

loadWebAssemblyFunctions('./add.wasm').then(WebAssemblyFunctions => {
  console.log(WebAssemblyFunctions.add(8, 5));
});
