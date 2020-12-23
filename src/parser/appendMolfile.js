import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import md5 from 'md5';
import { MF } from 'mf-parser';
import fetch from 'node-fetch';
import OCL from 'openchemlib';

const cacheDirectory = join(__dirname, '../../data/cache');

export default async function appendMolfile(result) {
  const name = result.general.name[0].value;

  let molfile = '';
  const nameHash = md5(name);
  const targetName = join(cacheDirectory, nameHash);

  if (existsSync(targetName)) {
    molfile = readFileSync(targetName, 'utf8');
  } else {
    let url = `http://46.4.119.202:8082/?name=${encodeURIComponent(
      name,
    )}&what=molfile`;
    let response = await fetch(url);
    let molfile = await response.text();
    writeFileSync(targetName, molfile, 'utf8');
  }

  result.general.molfile = molfile;
/*
  if (molfile) {                                                      // to keep for the checker 
    let molecule = OCL.Molecule.fromMolfile(molfile);
    let mf = molecule.getMolecularFormula().formula;
    let mfInfo = new MF(mf).getInfo();
    // todo check property names
    result.general.mf = mfInfo.molecularFormula;
    result.general.mw = 0;
    result.general.em = 0;
  }
*/
}
