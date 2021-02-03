import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import appendAnal from '../../parser/appendAnal.js';

describe('appendAnal', () => {
  it('should fetch the molfile from URL and return molfile in plain text', async () => {
    const path = join(__dirname, '../../../examples/productsJSON.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let nmrs = [];
    console.log(singleProducts.slice(10, 13));
    for (let result of singleProducts.slice(10, 13)) {
      await appendAnal(result, result.text, { debug: true });
      nmrs.push(result);
      console.log(inspect(result, false, null, true));
    }
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
