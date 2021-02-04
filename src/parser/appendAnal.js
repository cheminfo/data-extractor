/**
 * @typedef {Object} result
 * @property {Object} general
 * @property {{values: string, language: string}[]} general.name - is the array containing all the names (value) associated with the product and language identifier
 * @property {Object} general.meta - are the identification data of the literature and associated file.
 * @property {string} general.meta.doi - is the DOI of the literature the product originates from.
 * @property {string} general.meta.filename - is the filename (containing extensions)
 * @property {Object[]} spectra - those are the parsed spectrum data
 * @property {{c: number, h:number, n: number, s: number}} general.spectra[].elementalAnalysis - is the parsed elemental analysis provided.
 */
/**
 * This module is part of the parseProdutcs.js module intended for the recognition of the elemental analysis charaterization in a source-text
 * @param {{name: {values: string, languague: string}[], meta: {doi : string, filename: string}}} result  - is the intitial and final object where the parsed characterization will be append.
 * @param {String} text - is the full text-source of the synthesis/determination found in file
 * @param {Object} options - is a debug option to add the actual parsed text in a property called source.
 * @param {Boolean} [options.debug = false] - when 'true' triggers the debugging option.
 * @return {result} - returns the same input object parameters with append element analysis results (if provided).
 */

export default function appendAnal(result, text, options = {}) {
  const AnalPattern = /Anal.*Found/i; //triggers the serach for an elemental analysis pattern
  const { debug = false } = options;
  if (text.match(AnalPattern)) {
    let index = text.match(AnalPattern).index;
    const anal = text.slice(index, text.length); //The complete elemental analysis is considered as being located always at the end of the source-text.
    const found = anal.slice(anal.match(/Found/i).index, anal.length); //experimental
    // const calculated = anal.replace(found, ''); // to use for checking the determination's accuracy.
    let elementalAnalysis = { c: 0, h: 0, n: 0, s: 0 }; //final object to be updated
    if (debug) elementalAnalysis.source = anal;
    for (let element of found.match(/(C|H|N|S),?\s[0-9]+.[0-9]+(;|.)/g)) {
      //each element can be separated by either a coma or a semicolumn
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
