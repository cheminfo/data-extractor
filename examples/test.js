import { join } from 'path';

import { extractData } from '../src';

const homedir = join(__dirname, '../data/data');

let result = extractData(homedir);
