import { writeFileSync } from 'fs';
import { join } from 'path';

import { extractData } from '../src/extractData';
import { createJSON } from "./createJSON";

async function doAll() {
  const homedir = join(__dirname, '../data/data');
  let products = await extractData(homedir);
  writeFileSync(
    join(__dirname, 'result.json'),
    JSON.stringify(products, undefined, 2),
  );
}

doAll();
