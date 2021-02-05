# data-extractor

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

This code is intended for the extraction of spectral and physical properties used in the dertermination of chemical products from the literature. In particular it provides parsing modules for NMR,IR spectral anaylsis, elemental analysis, physical properties (boiling and melting points) and will provide (if possible) a molfile for the product, provided that the product's name is provided using IUPAC standards.

## Installation

`$ npm i data-extractor`

## Usage
The whole recognition and parsing processes are triggered by the extractData() method in extractData.js, that can be incorporated in any .js script located at the 'src' repository level using an asyn function as follows :
```js
import { extractData } from 'data-extractor/src/extractData.js'

async function data-extractor() {
    const fileLocation = '/MY-PATH-TO-FILES/';
    let result = await extractData(fileLocation);
    return result;
}

const products = data-extractor();
```
The retruned result is an array of object, each object represents a product identified by its name and the DOI of the publication it was found in, along with the filename the literature originates from.

The returned array can easily be stored in a JSON file using the little hand-coded module 'createJSON()' in examples/createJSON.js:

```js
import  { createJSON } from 'data-extractor/examples/createJSON.js';

const object = {}; //Your object
const targetDirectory = ''; //PATH to the destination
const filename = ''; //name of the JSON-file

createJSON(object,targetDirectory,filename);
```

For the simplest usage and as an example a little code called 'example.js' has been created in the examples/ repository. This code will scann all the files located in /data/data and parse all the products assigned to a spectral or physical analysis and create a JSON file named 'result-test.json' containing those products and their parsed spectral and physical  analysis.

## [API Documentation](https://cheminfo.github.io/data-extractor/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/data-extractor.svg
[npm-url]: https://www.npmjs.com/package/data-extractor
[ci-image]: https://github.com/cheminfo/data-extractor/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/data-extractor/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/data-extractor.svg
[codecov-url]: https://codecov.io/gh/cheminfo/data-extractor
[download-image]: https://img.shields.io/npm/dm/data-extractor.svg
[download-url]: https://www.npmjs.com/package/data-extractor
