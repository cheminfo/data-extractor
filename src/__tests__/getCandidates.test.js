import { profileEnd } from 'console';
import { join } from 'path';

import { getCandidates } from '../getCandidates';
import { getXMLFiles } from '../getXMLFiles';
import { splitCandidates } from '../splitCandidates';

describe('getCandidates', () => {
  it('should return an array of DOM as products', () => {
    const homeDir = join(__dirname, '../../data/data');
    let files = getXMLFiles(homeDir);

    let candidates = [];
    let matched = [];
    let unmatched = [];
    for (let file of files) {
      let filename = /molecules-[^/]*.xml/.exec(file);
      let found = getCandidates(file);
      if (found.length > 0) {
        found.forEach((e) => {
          candidates.push({
            file: filename[0],
            DOM: e,
          });
        });
        matched.push(file);
      } else {
        unmatched.push(filename[0]);
      }
    }
    console.log(candidates[44]); // the title containing the name of the molecule is contained in the 'prev' element
    console.log(
      `${candidates.length} products found over ${matched.length} files (${files.length} scanned files).`,
    );

    let singles = splitCandidates(candidates);

    let names = [];
    let toCheck = [];
    singles.forEach((element) => {
      names.push(`${element.name} ------ ${element.filename}`);
      if (element.name.length < 3){
        toCheck.push(`${element.name} ------ ${element.filename} \n ${element.text}`);
      }
    });
    console.log(`Found ${singles.length} single products`);

    /*
    console.log(unmatched);
    console.log(singles[0]);
     */
    console.log(names);
    console.log(toCheck);
    
    let rawProducts

    expect(candidates.length).toBeGreaterThan(0);
  });
});
