import { writeFileSync } from 'fs';
import { join } from 'path';


import { getXMLFiles } from '../src/getXMLFiles';
import { getCandidates } from "../src/getCandidates";
import { splitCandidates } from "../src/splitCandidates";

export function createJSON(object,targetDir,name) {
  const destination = join(targetDir, name);
  const objectToConvert = object
  writeFileSync(
    destination,
    JSON.stringify(object, undefined, 2),
  );
}


