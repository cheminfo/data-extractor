import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import appendPhysical from '../parser/appendPhysical';

describe('appendMass', () => {
  it('should append to the result the melting or boiling point reported in string', async () => {
    const path = join(__dirname, '../../data/JSON-singleProducts.json');
    const products = JSON.parse(readFileSync(path));
    let results = [];
    for (let product of products) {
      appendPhysical(product, product.text, { debug: true });
      results.push(product);
    }
    for (let result of results) {
      if (result.physical) {
        console.log(inspect(result.physical, false, null, true));
      }
    }
    expect(products.length).toBeGreaterThan(0);
  });
});
