/**
 * @typedef {Object} result
 * @property {Object} general
 * @property {{values: string, language: string}[]} general.name - is the array containing all the names (value) associated with the product and language identifier
 * @property {Object} general.meta - are the identification data of the literature and associated file.
 * @property {string} general.meta.doi - is the DOI of the literature the product originates from.
 * @property {string} general.meta.filename - is the filename (containing extensions)
 * @property {Object} physical - contains all the physical data used for determination in the literature
 * @property {{low: number, high: number}[]} bp - contains an array with low and high limit temperature for the boiling point.
 * @property {{low: number, high: number}[]} mp - contains an array with low and high limit temperature for the melting point
 */
/**
 * This modules is part of the parsers and recovers physical constant determinations from a textsource
 * @param {{name: {values: string, languague: string}[], meta: {doi : string, filename: string}}} result  - is the intitial and final object where the parsed characterization will be append.
 * @param {string} text - is the source-texte used for scanning and finding physical data through regex-based process
 * @param {Object} options - is a debug option to add the actual parsed text in a property called source.
 * @param {Boolean} [options.debug = false] - when 'true' triggers the debugging option.
 */

export default function appendPhysical(result, text, options) {
  const { debug = false } = options;
  if (/(m|b)p\.[^;]*/.test(text)) {
    result.physical = {};
    for (let points of text.match(/(m|b)p\.[^;]*/g)) {
      if (debug) result.physical.source = text.match(/(m|b)p\.[^;]*/g);
      let temperatures = points.match(/[0-9]+(\.[0-9]+)?/g);
      let point = {};
      if (temperatures.length === 2) {
        point.low = parseFloat(temperatures[0]);
        point.high = parseFloat(temperatures[1]);
      } else {
        point.low = parseFloat(temperatures[0]);
      }
      if (points.includes('bp.')) {
        if (!result.physical.bp) result.physical.bp = [];
        result.physical.bp.push(point);
      }
      if (points.includes('mp.')) {
        if (!result.physical.mp) result.physical.mp = [];
        result.physical.mp.push(point);
      }
    }
  }
}
