import delay from 'delay';

import appendIR from './parser/appendIR';
import appendAnal from './parser/appendMass';
import appendMolfile from './parser/appendMolfile';
import appendPhysical from './parser/appendPhysical';
import appendNMR from './parser/appendNMR';

/**
 * The module takes single-product objects (with text content) in an array and returns an array of parsed product-objects. The parsing is done calling upon parser-modules found at src/parser.
 * @param {Array<Object>} products - object inherited from splitCanidates.js
 * @return {Array<Objects>} parsedProducts - those are the resulting parsed single products
 */
/**
 *@typedef {Object} parsedProducts
 */

export async function parseProducts(products, options) {
  let parsedProducts = [];
  for (let product of products) {
    const { debug = false } = options;
    // 'result' is the base of the returned object, each at least contains the general property of the product (name) and the meta data of the file/article.
    let result = {
      general: {
        name: [{ value: product.name, language: 'en' }],
        meta: { doi: product.doi, filesource: product.filename },
      },
    };
    // If the debug-options is on each parser will add a source and control property to the final object containt the initial text-source and the remaining information that has not been parsed.
    if (debug) result.source = product.text;
    // From there on the sub-sequent parsing concern : the physical data (bp,mp), the elemental analysis, the molfile fetched from server, the NMR-spectra associated with the product and the mass characterization (accurate or spectrum).
    // await appendMolfile(result); // molfile + MF + em + mw
    // await delay(1000); // prevents 'missuse-errors' from the fetched server
    appendIR(result, product.text, options);
    appendAnal(result, product.text, options);

    appendNMR(result, product.text, options);
    appendPhysical(result, product.text, options);

    parsedProducts.push(result);
  }
  return parsedProducts;
}
