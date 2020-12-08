import delay from 'delay';

import appendAnal from './parser/appendAnal';
import appendIR from './parser/appendIR';
import appendMolfile from './parser/appendMolfile';
import appendNMR from './parser/appendNMR';

/**
 * The module takes single-product objects (with text content) in an array and returns an array of parsed product-objects
 * @param {Objects} products {filename, name , text}
 * @return {Objects} parsedProducts {???}
 */

export async function parseProducts(products, options) {
  let parsedProducts = [];
  for (let product of products) {
    let result = {
      general: {
        name: [{ value: product.name, language: 'en' }],
        meta: { doi: product.DOI, filesource: product.filename },
      },
    };

    await appendMolfile(result); // molfile + MF + em + mw
    await delay(1000);
    appendIR(result, product.text, options);
    appendAnal(result, product.text, options);

    appendNMR(result, product.text,options);
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
