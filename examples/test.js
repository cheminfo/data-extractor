import { writeFileSync } from 'fs';
import { join } from 'path';

import { extractData } from '../src/extractData';

async function doAll() {
  const homedir = join(__dirname, '../data/data');
  let products = await extractData(homedir);

  writeFileSync(
    join(__dirname, 'result_compare.json'),
    JSON.stringify(products, undefined, 2),
  );
}

doAll();
