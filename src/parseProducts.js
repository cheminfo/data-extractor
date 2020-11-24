import appendNMR from './parser/appendNMR';
/**
 * The module takes single-product objects (with text content) in an array and returns an array of parsed product-objects
 * @param {Objects} products {filename, name , text}
 * @return {Objects} parsedProducts {???}
 */

export async function parseProducts(products) {
  let parsedProducts = [];
  for (let product of products) {
    let result = { iupac: product.name };

    // await appendMolfile(result); // molfile + MF + em + mw

    // appendNMR(result, product.text);
    //   appendIR(result, product.text);
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
