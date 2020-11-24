import { readFileSync } from 'fs';

import cheerio from 'cheerio';

/**
 * Returns an array of candidates (single or multi product,s block) as DOM-strings?, all containing an NMR reference
 * @param {string} file The filename is the absolute PATH to the file.xml
 * @return {Array<Object>} - returns an array containing all candidates matching the conditions
 */
export function getCandidates(file) {
  let xml = cheerio.load(readFileSync(file), {
    xml: {
      xmlMode: true,
      xml: true,
    },
  });
  let matches = [];
  const filename = /molecules-[^/]*.xml/.exec(file);

  let allElements = xml('*');

  const articleDOI = xml('article-meta')
    .children()
    .filter((i, element) => {
      return xml(element).attr('pub-id-type') === 'doi';
    });
  let filterElements = allElements.filter((i, element) => {
    return xml(element).text().includes('NMR');
  });
  filterElements.each((i, element) => {
    if (
      element.tagName === 'p' &&
      xml(element).parents('sec').parent().attr('sec-type') === 'methods' &&
      !matches.some((existing) =>
        xml(element).parent().html().includes(existing.DOM),
      )
    ) {
      matches.push({
        filename: filename[0],
        DOI: xml(articleDOI).text(),
        DOM: xml(element).parent().html(),
      });
    }
  });

  return matches;
}
