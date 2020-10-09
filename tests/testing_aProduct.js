import { readFileSync, readdir } from 'fs';
import { join } from 'path';

import { JSDOM } from 'jsdom';
import { recursiveReaddirSync } from 'recursive-readdir-sync';

import { getJSONFromXML } from './getJSONFromXML';
import { getProducts } from './getProducts';
import { getXMLFiles } from './getXMLFiles';

export function myModule() {
  const basedir = join(__dirname, '../data/NMR_extract');

  let files = getXMLFiles(basedir);
  files = files.slice(0, 10);
  for (const file of files) {
    let object = getJSONFromXML(file);
    let products = getProducts(object);
    for (const product of products) {
      enhanceProduct(product);
      checkProduct(product);
      //saveProduct(product);
    }
  }

  return 42;
}
