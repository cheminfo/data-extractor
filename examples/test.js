import { join } from 'path';

import { extractData } from '../src/extractData';

const homedir = join(__dirname, '../data/data');

let result = extractData(homedir);
