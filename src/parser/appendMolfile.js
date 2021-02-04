import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import delay from 'delay';
import md5 from 'md5';
import { MF } from 'mf-parser';
import fetch from 'node-fetch';
import OCL from 'openchemlib';
/**
 * @typedef {Object} result
 * @property {Object} general
 * @property {{values: string, language: string}[]} general.name - is the array containing all the names (value) associated with the product and language identifier
 * @property {Object} general.meta - are the identification data of the literature and associated file.
 * @property {string} general.meta.doi - is the DOI of the literature the product originates from.
 * @property {string} general.meta.filename - is the filename (containing extensions)
 * @property {string} general.molfile - is the retrieved molfile if provided by the external source.
 */

/**
 * This module generates a molfile starting from a molecule name (should be IUPAC) using and external molfile provider (??).
 * @param {{name: {values: string, languague: string}[], meta: {doi : string, filename: string}}} result  - is the intitial and final object where the parsed characterization will be append.
 * @return {result} - is the initial anf final object containing the append molfile (if retrieved).
 */

const cacheDirectory = join(__dirname, '../../data/cache');

export default async function appendMolfile(result) {
  // the parameters should respect the following object-architecture, provided with a molecule name (IUPAC-based).
  const name = result.general.names[0].value;

  let molfile = '';
  const nameHash = md5(name); //the module will used this identifier to cache the retrieved molfile for further searches.
  const targetName = join(cacheDirectory, nameHash);

  if (existsSync(targetName)) {
    //if existing the molfile will simply be recovered from 'cache
    molfile = readFileSync(targetName, 'utf8');
  } else {
    // if not the module will ask an external source (HTTP) for the molfile (if name recognizied).
    let url = `http://46.4.119.202:8082/?name=${encodeURIComponent(
      name,
    )}&what=molfile`;
    let response = await fetch(url);
    let molfile = await response.text();
    writeFileSync(targetName, molfile, 'utf8');
    await delay(1000); // prevents 'missuse-errors' from the fetched server
  }

  if (molfile.split(/\r?\n/).length < 4) return; //if the returned molfile from HTTP is an error message it won't be added to the final object.

  result.general.molfile = molfile;

  // This part is intended for the checking of the parsed data from molfile (under construction) !!
  if (molfile) {
    // to keep for the checker
    let molecule = OCL.Molecule.fromMolfile(molfile);
    let mf = molecule.getMolecularFormula().formula;
    let mfInfo = new MF(mf).getInfo();
    // todo: check property names
    result.general.mf = mfInfo.molecularFormula;
    result.general.mw = mfInfo.mass;
    result.general.em = mfInfo.monoisotopicMass;
  }
}
