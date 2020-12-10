import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import { inspect } from 'util';

import { parseProducts } from '../parseProducts';

describe('parseProducts', () => {
  it('should return an object products with parsed info (spectra, general, molfile,...)', async () => {
    const path = join(__dirname, '../../data/JSON-singleProducts.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let parsedProducts = await parseProducts(singleProducts.slice(95, 100), {
      debug: true,
    });


    console.log(parsedProducts.length);
    console.log(parsedProducts[0]);
    expect(parsedProducts.length).toBeGreaterThan(0);
  });
});
