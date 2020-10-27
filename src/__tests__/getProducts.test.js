import { profileEnd } from 'console';
import { join } from 'path';

import { getProducts } from '../getProducts';
import { getXMLFiles } from '../getXMLFiles';

describe('getProducts', () => {
  it('should return an array of DOM as products', async () => {
    const homeDir = join(__dirname, '../../data/data');
    let files = getXMLFiles(homeDir);
    let products = [];
    let fileCount = 0;
    for (let file of files) {
      let product = await getProducts(file);
      if (product.length > 0) {
        product.forEach((e) => {
          products.push(e);
        });
        fileCount += 1;
      }
    }

    console.log(products[44]); // the title containing the name of the molecule is contained in the 'prev' element
    console.log(`${products.length} products found over ${fileCount} files.`);

    expect(products.length).toBeGreaterThan(0);
  });
});
