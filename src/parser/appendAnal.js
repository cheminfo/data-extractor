/**
 * This module is part of the parseProdutcs.js module intended for the recognition of the elemental analysis
 * @param {Object} result - is the final object where the parsed characterization will be append.
 * @param {String} text - is the full text-source of the synthesis
 * @param {Object} options - is a debug option (boleean)
 */

export default function appendAnal(result, text, options = {}) {
  const AnalPattern = /Anal.*Found/i; //triggers the serach for an elemental analysis pattern
  const { debug = false } = options;
  if (text.match(AnalPattern)) {
    let index = text.match(AnalPattern).index;
    const anal = text.slice(index, text.length); //The complete elemental analysis is considered as being located always at the end of the source-text.
    const found = anal.slice(anal.match(/Found/i).index, anal.length); //experimental
    const calculated = anal.replace(found, '');
    let elementalAnalysis = { c: 0, h: 0, n: 0, s: 0 }; //final object to be updated
    if (debug) elementalAnalysis.source = anal;
    for (let element of found.match(/(C|H|N|S),?\s[0-9]+.[0-9]+(;|.)/g)) { //each element can be separated by either a coma or a semicolumn
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
    let MF = anal.match(/for\s[^\s]+/i); //to be used for checking the result according to the molecular formula (to do!!)
    if (!result.spetra) result.spectra = {};
    result.spectra.elementalAnalysis = [elementalAnalysis];
  }
}
