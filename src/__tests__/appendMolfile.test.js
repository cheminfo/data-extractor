import { readFileSync } from 'fs';
import {join} from 'path';

import appendMolfile from '../parser/appendMolfile.js';

describe('appendMolfile', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../data/JSON-results.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let molfiles = []
    console.log(singleProducts[150].iupac);
    let test = await appendMolfile(singleProducts[150]);
    // for (let result of singleProducts){
    //     molfiles.push(await appendMolfile(result));
    // }
    console.log(test);
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
