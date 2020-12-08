import cheerio from 'cheerio';

/**
 * From an array of single or multi product,s block returns single products object.
 * @param {object} candidates - {file, DOM} file is the filename containing the candidate, DOM is the xml-extract?
 * @return {object} - {filename, name, text} name is the extracted name of the product, text is the related synthesis and charaterization
 */

export function splitCandidates(candidates) {
  let singleCandidates = [];
  let news = [];
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
    let xml = cheerio.load(candidate.DOM, {
      xml: {
        xml: true,
      },
    });
    let moleculeName = xml('title')
      .text()
      .replace(/.*\sof\s/, '')
      .replace(/ \([0-9]+[a-z]?\).*/, '');
    if (
      xml('p').length < 2 &&
      /H-NMR[^;]*;/.exec(xml('p').text()) &&
      moleculeName.match(/[a-z]{5}/) &&
      !forbidden.some((element) => xml('title').text().match(element))
    ) {
      singleCandidates.push({
        filename: candidate.filename,
        DOI: candidate.DOI,
        name: moleculeName,
        text: xml('p').text(),
        nmr: /H-NMR[^;]*/.exec(xml('p').text()),
      });
    } else {
      xml('p').each((i, element) => {
        if (
          xml(element).children().length > 0 &&
          /H-NMR[^;]*;/.exec(xml(element).text()) &&
          xml(element).children().get(0).tagName === 'italic'
        ) {
          moleculeName = xml(element)
            .children('italic')
            .first()
            .text()
            .replace(/.*\sof\s/, '')
            .replace(/ \([0-9]+[a-z]?\).*/, '');
          if (
            moleculeName.match(/[a-z]{5}/) &&
            !forbidden.some((element) => moleculeName.match(element))
          ) {
            news.push(`${moleculeName}--${candidate.filename}`);
            singleCandidates.push({
              filename: candidate.filename,
              DOI: candidate.DOI,
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
