import { getCandidates } from './getCandidates';
import { getXMLFiles } from './getXMLFiles';
import { parseProducts } from './parseProducts';
import { splitCandidates } from './splitCandidates';

/**
 * This is the main module starting the data extraction from a starting path and returns and array of objects (founbd products).
 * @param {String} homeDir - this is the starting path from which the code will recursively recover each file (all files should be .xml).
 * @return {Array<Object>} products - those are the object-like recovered products in each .xml file.
 */

export async function extractData(homeDir) {
  //All files found starting from 'homeDir'
  const filenames = getXMLFiles(homeDir);
  let products = [];
  for (let filename of filenames) {
    //'candidates' are the block-produtcs of single or multiple products
    let candidates = getCandidates(filename);
    //'singleProducts' are single-product objects containing a name, a reference and a source.
    let singleProducts = splitCandidates(candidates);
    //The main parser module calls on specific parser for NMR, IR, mass -spectra, elenmental analysis and physical constants (see 'parser' repertory).
    let parsedProducts = await parseProducts(singleProducts, {
      debug: true,
    });
    products = await products.concat(parsedProducts);
  }
  console.log(
    `Found ${products.length} products over ${filenames.length} files.`,
  );
  // the object-like products containing all the parsed information (to be converted in JSON file in 'test.js').
  return products;
}
