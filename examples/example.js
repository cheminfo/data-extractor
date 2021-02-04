import { join } from 'path';

import { extractData } from '../src/extractData';

import { createJSON } from './createJSON';

async function doAll() {
  const homedir = join(__dirname, '../data/data');
  let products = await extractData(homedir);
  createJSON(products, __dirname, 'resul-test.json');
}

doAll();
