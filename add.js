const fs = require('fs');

const WebAssemblyFunctions = {};

init = async () => {
  const bytes = fs.readFileSync('./add.wasm');
  return WebAssembly.instantiate(bytes).then(({ instance }) =>
    Object.assign(WebAssemblyFunctions, instance.exports)
  );
};

init().then(() => {
  console.log(WebAssemblyFunctions.add(8, 5));
});
