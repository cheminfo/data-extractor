/**
 * The module takes single-product objects (with text content) in an array and returns an array of parsed product-objects
 * @param {Objects} products {filename, name , text}
 * @return {Objects} parsedProducts {???}
 */

export function parseProducts(products) {
  let parsedProducts = [];
  for (let product in products) {
    let parsed
    let moleculeName = product.name;
    let contents = product.text.split(';');
    parsedProducts.push({
      general: {
        name: moleculeName,         //est-ce qu'il faut mettre les guillemets ??
      },
      spectra: {
        nmr: 
      }
    });
  }
  return [];
}

/*

return {
  general: {
    iupac: [{value}]
  }
  physical: {
    bp: [{low, high, pressure}]
    mp: [{low, high}]
  }
  spectra: {
    nmr: [{}]
  }
  
}