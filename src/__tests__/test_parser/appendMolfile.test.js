import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import { MF } from 'mf-parser';
import OCL from 'openchemlib';

import appendMolfile from '../../parser/appendMolfile.js';

describe('appendMolfile', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../../examples/productsJSON.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let test = singleProducts[12];
    await appendMolfile(test);
    let molfile = test.general.molfile;
    let molecule = OCL.Molecule.fromMolfile(molfile);
    let mf = molecule.getMolecularFormula().formula;
    let mfInfo = new MF(mf).getInfo();

    console.log(inspect(test, false, null, true));
    console.log(mfInfo);
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
