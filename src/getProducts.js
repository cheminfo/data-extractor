import { readFileSync } from 'fs';

import cheerio from 'cheerio';
import { util } from 'prettier';

export async function getProducts(filename) {
  // Using 'cheerio' module to recover DOM-element containing 'NMR' and its respective text --> to parse -------------------------

  let xml = cheerio.load(readFileSync(filename), {
    xml: {
      xmlMode: true,
      xml: true,
    },
  });
  let matches = [];

  let elem = xml('*');

  let filtElem = elem.filter(function (i, e) {
    return xml(this).text().includes('NMR');
  });
  filtElem.each(function (i, e) {
    if (
      this.tagName === 'p' &&
      xml(this).parents('sec').parent().attr('sec-type') === 'methods' &&
      !xml(this).prev('title').text().includes('General')
    ) {
      matches.push({
        tag: this.tagName,
        file: filename,
        name: xml(this).siblings('title').text(),
        text: xml(this).html(),
        DOM: xml(this).get(),
      });
    }
  });

  return matches;
}
