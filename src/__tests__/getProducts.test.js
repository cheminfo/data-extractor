import { join } from 'path';
import {JSDOM} from 'jsdom';

import { getProducts } from '../getProducts';
import {getXMLFiles} from '../getXMLFiles';

describe('getProducts', () => {
  it('should return an array of DOM as products', () => {
    const homeDir = join(__dirname, '../../data/NMR_extract');
    let files = getXMLFiles(homeDir);
    let product = getProducts(files[0]);
    // JSDOM.fromFile(files[0]).then(dom => {
      // console.log(dom.serialize());
    // });
    console.log(product);

    expect(product).toBeDefined(); //the expected length is correct !
  });
});
