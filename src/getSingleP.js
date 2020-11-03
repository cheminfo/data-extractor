import cheerio from 'cheerio';

export function getSingleP(candidate) {
  let xml = cheerio.load(candidate.DOM, {
    xml: {
      xml: true,
    },
  });
  // if (!(xml('p').length > 1)) {
  //   return candidate;
  // }
  if (xml('p').length < 2 && /H-NMR.*δ[^;]*;/.exec(xml('p').text())) {
    return {
      filename: candidate.file,
      name: xml('title').text(),
      text: xml('p').text(),
      nmr: /H-NMR.*δ[^;]*/.exec(xml('p').text()),
    };
  }
}
