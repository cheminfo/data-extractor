import { profileEnd } from 'console';
import { join } from 'path';

import { getCandidate } from '../getCandidate';
import { getSingleP } from '../getSingleP';
import { getXMLFiles } from '../getXMLFiles';

describe('getCandidate', () => {
  it('should return an array of DOM as products', () => {
    const homeDir = join(__dirname, '../../data/data');
    let files = getXMLFiles(homeDir);
    let candidate = [];
    let matched = [];
    let unmatched = [];
    for (let file of files) {
      let filename = /molecules-[^/]*.xml/.exec(file);
      let product = getCandidate(file);
      if (product.length > 0) {
        product.forEach((e) => {
          candidate.push({
            file: filename[0],
            DOM: e,
          });
        });
        matched.push(file);
      } else {
        unmatched.push(filename[0]);
      }
    }
    console.log(candidate[44]); // the title containing the name of the molecule is contained in the 'prev' element
    console.log(
      `${candidate.length} products found over ${matched.length} files (${files.length} scanned files).`,
    );

    let singles = [];
    candidate.forEach((e) => {
      let single = getSingleP(e);
      if (single) {
        singles.push(single);
      }
    });
    console.log(`Found ${singles.length} single products`);
    console.log(unmatched);
    console.log(singles[0]);
    let names = [];
    singles.forEach((e) => {
      if (/H-NMR.*δ[^;]*;/.exec(e.text)) {
        names.push(e.name);
      }
    });
    console.log(`${names.length} new single products`);
    expect(candidate.length).toBeGreaterThan(0);
  });
});
