import appendIR from './parser/appendIR';
import appendAnal from './parser/appendMass';
import appendMolfile from './parser/appendMolfile';
import appendPhysical from './parser/appendPhysical';
import appendNMR from './parser/appendNMR';

/**
 * @typedef {Object} parsedProducts
 * @property {Object} general
 * @property {{values: string, language: string}[]} general.name - is the array containing all the names (value) associated with the product and language identifier
 * @property {Object} general.meta - are the identification data of the literature and associated file.
 * @property {string} general.meta.doi - is the DOI of the literature the product originates from.
 * @property {string} general.meta.filename - is the filename (con)
 */

/**
 * The module takes single-product objects (with text content) in an array and returns an array of parsed product-objects. The parsing is done calling upon parser-modules found at src/parser.
 * @param {Object[]} products - object inherited from splitCanidates.js
 * @param {string} products[].doi - the DOI of the litterature the product was found in.
 * @param {string} products[].name - name of the product (assigned by the litterature !).
 * @param {string} products[].filename - is the filename associated with the litterature (containing extension : should be .xml).
 * @return {parsedProducts[]} parsedProducts - those are the resulting parsed single products
 */

export async function parseProducts(products, options) {
  let parsedProducts = [];
  for (let product of products) {
    const { debug = false } = options;
    // 'result' is the base of the returned object, each at least contains the general property of the product (name) and the meta data of the file/article.
    let result = {
      general: {
        names: [{ value: product.name, language: 'en' }],
        meta: { doi: product.doi, filesource: product.filename },
      },
    };
    // If the debug-options is on each parser will add a source and control property to the final object containt the initial text-source and the remaining information that has not been parsed.
    if (debug) result.source = product.text;
    // From there on the sub-sequent parsing concern : the physical data (bp,mp), the elemental analysis, the molfile fetched from server, the NMR-spectra associated with the product and the mass characterization (accurate or spectrum).
    await appendMolfile(result); // molfile + MF + em + mw

    appendIR(result, product.text, options);
    appendAnal(result, product.text, options);

    appendNMR(result, product.text, options);
    appendPhysical(result, product.text, options);

    parsedProducts.push(result);
  }
  return parsedProducts;
}
