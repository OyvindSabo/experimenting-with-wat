# Experimenting with the WebAssembly text format

### Create a WebAssembly module in a .wat file

Create a WebAssembly module ([I got some inspiration here](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)) in the WebAssembly text format. We'll call it `add.wat`, because it exports a function which adds two numbers together.

```
;; add.wat

(module
  (func $add (param $firstParam i32) (param $secondParam i32) (result i32)
    local.get $firstParam
    local.get $secondParam
    i32.add)
  (export "add" (func $add))
)
```

### Convert the module to binary

Use wat2wasm to convert the file from a .wat format to a binary .wasm format. To use wat2wasm, [wabt](https://github.com/WebAssembly/wabt) has to be installed.

```
$ wat2wasm add.wat -o add.wasm
```

This will produce an add.wasm file containing the binary representation of our WebAssembly module

### Load and call the binary WebAssembly module with JavaScript

To test that our module works, we load it into a JavaScript program, and then use it to print the sum of 8 and 5.

```
// add.js

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
```

### Run the program using Node.js

```
$ node add
13
```
