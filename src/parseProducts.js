import appendAnal from './parser/appendAnal';
import appendIR from './parser/appendIR';
import appendNMR from './parser/appendNMR';
import appendMolfile  from './parser/appendMolfile';

import delay from 'delay';

/**
 * The module takes single-product objects (with text content) in an array and returns an array of parsed product-objects
 * @param {Objects} products {filename, name , text}
 * @return {Objects} parsedProducts {???}
 */

export async function parseProducts(products) {
  let parsedProducts = [];
  for (let product of products) {
    let result = {
      general: {
        name: [{ value: product.name, language: 'iupac' }],
        meta: { doi: product.DOI, filesource: product.filename },
      },
    };

    // await appendMolfile(result); // molfile + MF + em + mw
    // await delay(250);
    // appendAnal(result, product.text);
    // appendIR(result, product.text);

    appendNMR(result, product.text);
    //   appendBP(result, product.text);
    parsedProducts.push(result);

    //   parsedProducts.push({
    //     general: {
    //       name: moleculeName,         //est-ce qu'il faut mettre les guillemets ??
    //     },
    //     spectra: {
    //       nmr:
    //     }
    //   });
    // }
  }
  return parsedProducts;
}
