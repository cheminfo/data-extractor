/**
 * @typedef {Object} result
 * @property {Object} general
 * @property {{values: string, language: string}[]} general.name - is the array containing all the names (value) associated with the product and a language identifier.
 * @property {Object} general.meta - are the identification data of the literature and associated file.
 * @property {string} general.meta.doi - is the DOI of the literature the product originates from.
 * @property {string} general.meta.filename - is the filename (containing extensions).
 * @property {Object[]} spectra - those are the parsed spectrum data.
 * @property {Object[]} spectra.ir - contains all the IR-spectra provided in the text-source.
 * @property {Object[]} spectra.ir[].peaks - contains all the peak of a spectrum
 * @property {number} spectra.ir[].peaks[].value - contains the wavelength [cm-1] of each peak.
 * @property {string} spectra.ir[].peaks[].kind - to be determined !! / virbational mode ?
 * @property {string} spectra.ir[].conditions - all extra information about the spectrum provided by the litterature (to be parsed ?).
 */
/**
 * This module is part of the parsers and recovers the IR spetrca (if provided) from a texte-source.
 * @param {{name: {values: string, languague: string}[], meta: {doi : string, filename: string}}} result  - is the intitial and final object where the parsed characterization will be append.
 * @param {string} text - is the full text-source of the synthesis
 * @param {Boolean} [option.debug = false] - when 'true' triggers the debugging option.
 */

export default function appendIR(result, text, options = {}) {
  const { debug = false } = options;
  //Regex recognition of the IR-spectrum pattern (terminated by ';').
  if (text.match(/IR[^;]*/g)) {
    for (const textIR of text.match(/IR[^;]*/g)) {
      //loopin over each found spectra
      let currentIR = { peaks: [] }; //final object to be pushed into 'result' as property
      let remain = textIR.replace(/\s[0-9]+(,|\s)/g, '');
      if (debug) {
        //for debugging
        currentIR.source = textIR; // the exacte scanned text for peak recognition
        currentIR.control = remain; // the unsued characters from the initial scanned text
      }
      //Regex-based loop for findin the peak-pattern and parsing the properties.
      if (textIR.match(/\s[0-9]+(,|\s)/g)) {
        for (let element of textIR.match(/\s[0-9]+(,|\s)/g)) {
          currentIR.peaks.push({
            wavelength: parseInt(element.replace(/(\s|,)/g, '')),
            kind: '',
          });
        }
      }
      //Retrieving the general properties of the spectrum (if provided), identified by '(...)'
      if (/\([^)]+\)/.test(remain.replace('cm-1', ''))) {
        currentIR.conditions = remain
          .replace('cm-1', '')
          .match(/\([^)]+\)/)[0]
          .replace(/\(|\)/g, '');
      }
      if (!result.spectra) result.spectra = {};
      if (!result.spectra.ir) result.spectra.ir = [];
      result.spectra.ir.push(currentIR);
    }
  }
}
