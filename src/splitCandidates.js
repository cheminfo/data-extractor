import cheerio from 'cheerio';

/**
 * From an array of single or multi product,s block returns single products object.
 * @param {object} candidates - {file, DOM} file is the filename containing the candidate, DOM is the xml-extract?
 * @return {object} - {filename, name, text} name is the extracted name of the product, text is the related synthesis and charaterization
 */

export function splitCandidates(candidates) {
  let singleCandidates = [];
  let forbidden = [/with/i, /reaction/i, /general/i, /\sto\s/i, /product+s?/i];
  for (let candidate of candidates) {
    let xml = cheerio.load(candidate.DOM, {
      xml: {
        xml: true,
      },
    });
    if (
      xml('p').length < 2 &&
      /H-NMR[^;]*;/.exec(xml('p').text()) &&
      !forbidden.some((element) => xml('title').text().match(element))
    ) {
      singleCandidates.push({
        filename: candidate.file,
        name: xml('title')
          .text()
          .replace(/.* of /, '')
          .replace(/ \([0-9]+[a-z]?\).*/, ''),
        text: xml('p').text(),
        nmr: /H-NMR[^;]*/.exec(xml('p').text()),
      });
    }
  }
  return singleCandidates;
}
