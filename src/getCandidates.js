import { readFileSync } from 'fs';

import cheerio from 'cheerio';

/**
 * Returns an array of candidates (single or multi product,s block) as DOM-strings?, all containing an NMR reference
 * @param {string} filename The filename is the absolute PATH to the file.xml
 * @return {Array} - returns an array containing all candidates matching the conditions
 */
export function getCandidates(filename) {
  let xml = cheerio.load(readFileSync(filename), {
    xml: {
      xmlMode: true,
      xml: true,
    },
  });
  let matches = [];

  let allElements = xml('*');

  let filterElements = allElements.filter((i, element) => {
    return xml(element).text().includes('NMR');
  });
  filterElements.each((i, element) => {
    if (
      element.tagName === 'p' &&
      xml(element).parents('sec').parent().attr('sec-type') === 'methods' &&
      !matches.includes(xml(element).parent().html())
    ) {
      matches.push(xml(element).parent().html());
    }
  });

  return matches;
}
