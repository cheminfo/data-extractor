import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import appendPhysical from '../../parser/appendPhysical';

describe('appendMass', () => {
  it('should append to the result the melting or boiling point reported in string', async () => {
    const path = join(__dirname, '../../../examples/productsJSON.json');
    const products = JSON.parse(readFileSync(path));
    let results = [];
    for (let product of products) {
      appendPhysical(product, product.text, { debug: true });
      results.push(product);
    }
    let counter = 0;
    for (let result of results) {
      if (result.physical) {
        console.log(inspect(result.physical, false, null, true));
        console.log(inspect(result.filename, false, null, true));
        counter++;
      }
    }
    console.log(counter);
    expect(products.length).toBeGreaterThan(0);
  });
});
