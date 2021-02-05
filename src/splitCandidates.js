import cheerio from 'cheerio';

/**
 * @typedef  singleCandidates - those correspond to single-products object
 * @type {Object[]}
 * @property {string} filename - is the filename where the product has been found, inherited from 'candidates'.
 * @property {string} doi - is the doi of the article inherited from 'candidates'.
 * @property {string} name - is the identified name (en) of the synthetized product.
 * @property {string} text - is the full text/paragraphe associated with the identified product or molecule.
 */
/**
 * From an array of single or multi product,s block returns and array of single product objects.
 * @param {Object[]} candidates - array of objects passed by 'getCandidates.js' containaing one or multiple product-candidates.
 * @param {string} candidates[].filename - is the filename where the product has been found, inherited from 'getCandidates'.
 * @param {string} candidates[].doi - is the doi of the article inherited from 'getCandidates'.
 * @param {string} candidates[].dom - the DOM to be parsed for single-candidate recognition.
 * @type {singleCandidates[]}
 * @return {singleCandidates[]} singleCandidates - are the returned single-bloc products.
 */

export function splitCandidates(candidates) {
  let singleCandidates = [];
  // This is a list of the forbidden words in the title/molecule-name discarding any paragraphe containing more than a synthesis and the characterizations.
  let forbidden = [
    /with/i,
    /reaction/i,
    /general/i,
    /compound/i,
    /\sto\s/i,
    /product+s?/i,
    /\sand\s/i,
  ];
  for (let candidate of candidates) {
    let xml = cheerio.load(candidate.dom, {
      xml: {
        xml: true,
      },
    });
    // Retrieves the name of the molecule from the title of the paragraphe.
    let moleculeName = xml('title')
      .text()
      .replace(/.*\sof\s/, '')
      .replace(/ \([0-9]+[a-z]?\).*/, '');
    // If the candidate contains a single paragraphe : the paragraphe is a single product and the name is in the title.
    if (
      xml('p').length < 2 &&
      /H-NMR[^;]*;/.exec(xml('p').text()) && // The single has to contain at least one NMR-characterization.
      moleculeName.match(/[a-z]{5}/) &&
      !forbidden.some((element) => xml('title').text().match(element))
    ) {
      singleCandidates.push({
        filename: candidate.filename,
        doi: candidate.doi,
        name: moleculeName,
        text: xml('p').text(),
      });
      // If the number of paragraphes in the candidate is larger than one then each sections in the paragraphe is considered as a product/molecule and the name is retrieved from the first children in the paragraph (generally  <italic>).
    } else {
      xml('p').each((i, element) => {
        if (
          xml(element).children().length > 0 &&
          /H-NMR[^;]*;/.exec(xml(element).text()) && // The single has to contain at least one NMR-characterization.
          xml(element).children().get(0).tagName === 'italic'
        ) {
          moleculeName = xml(element) //Retrieves and 'normalizes' the name of the molecule
            .children('italic')
            .first()
            .text()
            .replace(/.*\sof\s/, '')
            .replace(/ \([0-9]+[a-z]?\).*/, '');
          if (
            moleculeName.match(/[a-z]{5}/) &&
            !forbidden.some((element) => moleculeName.match(element))
          ) {
            singleCandidates.push({
              filename: candidate.filename,
              doi: candidate.doi,
              name: moleculeName,
              text: xml(element).text(),
            });
          }
        }
      });
    }
  }
  return singleCandidates;
}
