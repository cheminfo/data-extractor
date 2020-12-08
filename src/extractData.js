import { writeFileSync } from 'fs';
import { join } from 'path';

import { getCandidates } from './getCandidates';
import { getXMLFiles } from './getXMLFiles';
import { parseProducts } from './parseProducts';
import { splitCandidates } from './splitCandidates';

export async function extractData(homeDir) {
  const filenames = getXMLFiles(homeDir);
  let products = [];
  for (let filename of filenames) {
    let candidates = getCandidates(filename);
    let singleProducts = splitCandidates(candidates);
    let parsedProducts = await parseProducts(singleProducts, {
      debug: true,
    });
    products = await products.concat(parsedProducts);
  }
  console.log(
    `Found ${products.length} products over ${filenames.length} files.`,
  );

  return products;
}
