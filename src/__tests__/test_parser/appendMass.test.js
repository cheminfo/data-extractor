import { readFileSync } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import appendMass from '../../parser/appendMass.js';

describe('appendMass', () => {
  it('should should parse the mass spectrum infromation from the passed string', async () => {
    const path = join(__dirname, '../../data/JSON-singleProducts.json');
    const products = JSON.parse(readFileSync(path));
    let results = [];
    for (let result of products.slice(10, 20)) {
      appendMass(result, result.text, { debug: true });
      results.push(result);
    }
    expect(products.length).toBeGreaterThan(0);
  });
});
