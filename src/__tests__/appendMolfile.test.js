import delay from 'delay';
import { readFileSync } from 'fs';
import { join } from 'path';
import { MF } from 'mf-parser';
import OCL from 'openchemlib';

import appendMolfile from '../parser/appendMolfile.js';

describe('appendMolfile', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../data/JSON-results.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let molfiles = [];
    let test = await appendMolfile(singleProducts[150]);
    for (let result of singleProducts.slice(10, 13)) {
      let molfile = await appendMolfile(result);
      let molecule = OCL.Molecule.fromMolfile(molfile);
      let mf = molecule.getMolecularFormula().formula;
      let mfInfo = new MF(mf).getInfo();

      console.log(mfInfo);
      molfiles.push(molfile);
      await delay(1000);
      console.log('done');
    }
    console.log(test);
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
