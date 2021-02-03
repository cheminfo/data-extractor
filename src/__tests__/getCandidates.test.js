import { profileEnd } from 'console';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { getCandidates } from '../getCandidates';
import { getXMLFiles } from '../getXMLFiles';
import { splitCandidates } from '../splitCandidates';

describe('getCandidates', () => {
  it('should return an array of DOM as products', () => {
    const homeDir = join(__dirname, '../../data/data');
    let files = getXMLFiles(homeDir);

    let candidates = [];
    let unmatched = 0;
    for (let file of files) {
      let results = getCandidates(file);
      if (results.length > 0) {
        results.forEach((element) => {
          candidates.push(element);
        });
      } else {
        unmatched++;
      }
    }
    // console.log(candidates[44]); // the title containing the name of the molecule is contained in the 'prev' element
    console.log(
      `${candidates.length} products found over ${files.length} files (${unmatched} discarted files).`,
    );
    expect(candidates.length).toBeGreaterThan(0);
  });
});
