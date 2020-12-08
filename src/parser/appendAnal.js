import { inspect } from 'util';

export default function appendAnal(result, text, options = {}) {
  const AnalPattern = /Anal.*Found/i;
  const { debug = false } = options;
  if (text.match(AnalPattern)) {
    let index = text.match(AnalPattern).index;
    const anal = text.slice(index, text.length);
    const found = anal.slice(anal.match(/Found/i).index, anal.length);
    const calculated = anal.replace(found, '');
    let elementalAnalysis = { c: 0, h: 0, n: 0, s: 0 };
    if (debug) elementalAnalysis.source = anal;
    for (let element of found.match(/(C|H|N),?\s[0-9]+.[0-9]+(;|.)/g)) {
      if (element.includes('C')) {
        elementalAnalysis.c = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
      if (element.includes('H')) {
        elementalAnalysis.h = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
      if (element.includes('N')) {
        elementalAnalysis.n = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
      if (element.includes('S')) {
        elementalAnalysis.s = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
    }
    let MF = anal.match(/for\s[^\s]+/i);
    if (!result.spetra) result.spectra = {};
    result.spectra.elementalAnalysis = [elementalAnalysis];
    // console.log(elementalAnalysis);
    // console.log(`${anal} - ${found} - ${result.general.meta.filesource}`);
  }
  // console.log(inspect(result, false, null, true));
}
