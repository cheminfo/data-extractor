import { readFileSync } from 'fs';

import cheerio from 'cheerio';

/**
 *
 * @param {string} filename
 */
export function getCandidates(filename) {
  // Using 'cheerio' module to recover DOM-element containing 'NMR' and its respective text --> to parse -------------------------

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
