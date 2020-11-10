import { getCandidates } from './getCandidates';
import { getXMLFiles } from './getXMLFiles';
import { splitCandidates } from './splitCandidates';

export function extractData(homeDir) {
  const filenames = getXMLFiles(homeDir);
  let products = [];
  for (let filename of filenames) {
    let candidates = getCandidates(filename);
    let cleanedCandidates = splitCandidates(candidates);
    products.concat(cleanedCandidates);
    // let parsedCandidates = parseCandidates(cleanedCandidates);
  }
  console.log(`Found ${products.length} cleaned products`);


  return products;
}
