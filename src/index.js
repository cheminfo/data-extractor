import { readFileSync, readdir } from 'fs';
import { join } from 'path';
import { checkProduct } from './checkProduct';
import { enhanceProduct } from './enhanceProduct';
import { getJSONFromXML } from './getJSONFromXML';
import { getXMLFiles } from './getXMLfiles';

export function myModule() {
  const basedir = join(__dirname, '../data');

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
