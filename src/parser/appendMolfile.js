import fetch from 'node-fetch';
import { MF } from 'mf-parser';
import OCL from 'openchemlib';

export default async function appendMolfile(result) {
  const name = result.general.name[0].value;
  let url = `http://46.4.119.202:8082/?name=${encodeURIComponent(
    name,
  )}&what=molfile`;
  let response = await fetch(url);
  let molfile = await response.text();
  result.general.molfile = molfile;

  // let molecule = OCL.Molecule.fromMolfile(molfile);
  // let mf = molecule.getMolecularFormula().formula;
  // let mfInfo = new MF(mf).getInfo();

  // console.log(mfInfo);
  return molfile;
}
