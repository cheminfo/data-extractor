import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import appendNMR from '../../parser/appendNMR.js';

describe('appendMolfile', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../data/JSON-singleProducts.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let nmrs = [];
    let test =
      '13C-NMR: δ 14.57, 31.20, 63.63 (aliphatic carbons), 110.30, 115.45, 122.85, 124.70, 126.61, 128.36 (2C), 128.66 (2C), 135.85, 146.05, 151.20 (aromatic carbons), 147.08 (triazole C3), 150.30 (N=CH), 153.90 (triazole C5);';
    let testResult = {};
    // for (let [i,element] of singleProducts.entries() ){
    //   if (element.filename.includes('098')) console.log(i);
    // }
    appendNMR(testResult, test, { debug: true });
    for (let result of singleProducts.slice(0, 4)) {
      await appendNMR(result, result.text, { debug: true });
      nmrs.push(result);
      console.log(inspect(result, false, null, true));
    }
    console.log(inspect(testResult, false, null, true));
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
