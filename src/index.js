import { readFileSync, readdir } from 'fs';
import { join } from 'path';

import { recursiveReaddirSync } from 'recursive-readdir-sync';

import { getCandidates } from './getCandidates';
import { enhanceProduct } from './enhanceProduct';
import { getJSONFromXML } from './getJSONFromXML';
import { getXMLFiles } from './getXMLFiles';

export function extractData(homeDir) {
  const filenames = getXMLFiles(homeDir);
  for (let filename of filenames) {
    let candidates = getCandidates(filename);
    let cleanedCandidates = cleanCandidates(candidates);
    let parsedCandidates = parseCandidates(cleanedCandidates);
  }

  const basedir = join(__dirname, '../data');
  /*
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
*/

  return 42;
}
