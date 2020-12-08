import { readFileSync, writeFileSync } from 'fs';
import { join, parse } from 'path';
import { inspect } from 'util';

import { parseProducts } from '../parseProducts';

describe('parseProducts', () => {
  it('should return an object products with parsed info (spectra, general, molfile,...)', async () => {
    const path = join(__dirname, '../../data/JSON-singleProducts.json');
    const singleProducts = JSON.parse(readFileSync(path));
    let parsedProducts = await parseProducts(singleProducts.slice(95, 100), {debug: true});

    // const parsedJSON = JSON.stringify(parsedProducts);
    // writeFileSync(
    //   join(__dirname, '../../data/JSON-results_2.json'),
    //   parsedJSON,
    // ); //?demander pourquoi le test tourne en boucle quand actif

    console.log(parsedProducts.length);
    console.log(parsedProducts[0]);
    expect(parsedProducts.length).toBeGreaterThan(0);
  });
});
