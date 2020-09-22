import { writeFileSync, readdirSync, readdir } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import { getJSONFromXML } from '../getJSONFromXML.js';

describe('getJSONFromXML', () => {
  it('should return 42', () => {
    const issuesNum = readdirSync(join(__dirname, '../../data/'));
    console.log(issuesNum);
    console.log('Total Number of Issues = ' + issuesNum.length);
    // console.log(issuesNum[0]);
    let moleculesArray = [];
    let counter = 0;

    for (let i = 0; i < issuesNum.length; i++) {
      const moleculesFile = readdirSync(
        join(__dirname, '../../data/', issuesNum[i], '/'),
      );
      // console.log(moleculesFile.length);
      for (let j = 0; j < moleculesFile.length; j++) {
        const filename = join(
          __dirname,
          '../../data/',
          issuesNum[i],
          moleculesFile[j],
          '/',
          `${moleculesFile[j]}.xml`,
        );
        let molecule = {
          ID: filename.match(/[0-9]{5}/),
          issue: issuesNum[i],
          path: filename,
        };
        moleculesArray.push(molecule);
        // console.log(moleculesArray[counter]);
        counter++;
      }
    }
    console.log('Total Number of Molecules-JSON recovered = ' + counter);

    // loop on the function to recover the JSONfile into array.object produce error ?? Async linked problem ??
    // for (let i=0; i<moleculesArray.length; i++){
    //   let jsonFile = getJSONFromXML(moleculesArray[i].path);
    //   moleculesArray[i].JSON = jsonFile;
    // }
    console.log(jsonFile);

    // console.log(inspect(json,false, null, true));
    // console.log(json);

    // writeFileSync('molecules-10-00105.json', JSON.stringify(json));

    expect(moleculesArray.length).toStrictEqual(counter);
  });
});
