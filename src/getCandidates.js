import { readFileSync } from 'fs';

import cheerio from 'cheerio';

/**
 * @typedef  matches  - Each element of the array corresponds to a 'candidate' (paragraphe containing multiple or single products)
 * @type {Object}
 * @property {string} filename - The string containes the name of the scanned file (with extension).
 * @property {string} doi - contains the doi of the artcile retrieved from .xml-file
 * @property {string} dom - DOM of the paragraph containing the synthesis of the identified product
 */
/**
 * Returns an array of candidates (single or multi-product,s block) as DOM-strings, all containing an NMR reference
 * @param {string} file The filename is the absolute PATH to the file.xml
 * @return {matches[]} matches - returns an array containing all candidates matching the conditions
 */

export function getCandidates(file) {
  // the first command loads the entire xml file as a DOM.

  let xml = cheerio.load(readFileSync(file), {
    xml: {
      xmlMode: true,
      xml: true,
    },
  });
  let matches = [];
  // Retrieves the filename to save it as property of the candidate.
  const filename = /molecules-[^/]*.xml/.exec(file);
  // Selects all the DOM-elements individually
  let allElements = xml('*');
  // Retrieves the doi of the article to save it as property of the candidate.
  const articleDOI = xml('article-meta')
    .children()
    .filter((i, element) => {
      return xml(element).attr('pub-id-type') === 'doi';
    });
  // Filters tall elements retaining only paragraphes in the 'methods' section (complete synthesis and charactrerization) and containing 'NMR'-tag.
  let filterElements = allElements.filter((i, element) => {
    return xml(element).text().includes('NMR');
  });
  filterElements.each((i, element) => {
    if (
      element.tagName === 'p' &&
      xml(element).parents('sec').parent().attr('sec-type') === 'methods' &&
      !matches.some((existing) =>
        xml(element).parent().html().includes(existing.dom),
      )
    ) {
      matches.push({
        filename: filename[0],
        doi: xml(articleDOI).text(),
        dom: xml(element).parent().html(),
      });
    }
  });

  return matches;
}
