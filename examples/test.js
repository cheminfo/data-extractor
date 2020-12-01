import { join } from 'path';

import { extractData } from '../src/extractData';
import { parseProducts } from '../src/parseProducts';

const homedir = join(__dirname, '../data/data');

let result = extractData(homedir);


parseProducts(result, { debug: true })