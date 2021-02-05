/**
 * This module is one of the parsers implemented to retrieve NMR-spectrum from the text-source associated with each product. The module itself is divided
 * into 2 main functions the first (retrievePeaks) will identifiy the nmr-tag and scann character by charater identifying several peaks,
 * the second one (parseSpectrum) will loop upon each retrieved spectrum and parse the general properties of the spectrum along with the single peaks and their porperties.
 * @param {{name: {values: string, languague: string}[], meta: {doi : string, filename: string}}} result  - is the intitial and final object where the parsed characterization will be append.
 * @param {String} text - the text source to be parsed in order to retrieve nmr-characteirzation
 * @param {Object} options - is a debug option to add the actual parsed text in a property called source.
 * @param {Boolean} [options.debug = false] - when 'true' triggers the debugging option.
 */
export default function appendNMR(result, text, options = {}) {
  // This function will scan the whole text-source and search for nmr-spectrum patterns, scann the pattern and identify the peaks and their related properties.
  // The function return an array of object containing the complete nmr-string of the spectrum and an array with the identified peaks.
  const { debug = false } = options;
  if (/[0-9]*[A-Z](-|=)NMR/.test(text)) {
    //triggers the nmr-scanning
    if (debug) result.source = text;
    if (!result.spectra) result.spectra = {};
    text = text.replace(/([0-9]+),([0-9]+)/, '$1.$2');
    let spectra = retrievePeaks(text); //retrieve spectra and related peaks in an array
    parseSpectrum(result, spectra); //parse each spectrum and corresponding peaks appending the parsed spectrum to 'result' object
  }
}

function retrievePeaks(text) {
  const nmrRegex = /[0-9]*[A-Z](-|=)NMR/g; // This RegEx-variable is intended for tracking the starting point of any nmr-chracterization in the text.
  let spectra = [];
  for (let p = 0; p < text.match(/[0-9]*[A-Z](-|=)NMR/g).length; p++) {
    let index = nmrRegex.exec(text).index; //The Reg-Ex variable must only be used once in the loop as each initialization will its 'LastIndex' property to make sure that index is updated over each loop at the index of the last found spectrum.
    let peaks = [];
    let parenthesisLevel = 0; //This identifier ensures that the content of paranthesis (usually properties) will not be parsed as a spectrum's peak.
    let nmrString = '';
    for (let i = index; i < text.length; i++) {
      if (text[i] === '(') parenthesisLevel++;
      if (text[i] === ')') parenthesisLevel--;
      if (parenthesisLevel !== 0) continue; //discards general properties, they will no be identified as peaks.
      if (/[0-9]/.test(text[i])) {
        // what triggers the peak recognition is a digit (always outside paranthesis)
        for (let j = i++; j < text.length; j++) {
          if (text[j] === '(') parenthesisLevel++;
          if (text[j] === ')') parenthesisLevel--;
          if (
            parenthesisLevel === 0 && // again peak-properties are discarded from identification at this point and assimilated to the peak-string.
            (!/[0-9.–~～—\s-]/i.test(text[j]) || j === text.length - 1) // peaks recognition ends upon a character that does not correspond either to a number (digit or point) or an interval (more tricky).
          ) {
            if (j - i > 2) {
              // ensures that the identified peak contains more than a single caracter (prevents '1H-NMR' to be parsed as a '1' peak).
              peaks.push(text.slice(i - 1, j + 1));
            }
            i = j;
            break;
          }
        }
      }
      nmrString = text.slice(index, i + 1); // retrieves the complete nmr-string of a single spectrum.
      if (text[i] === ';' || text[i] === '.') break; // the spectrum can end eiter with a point or a semi-column depending on the position of the nmr-string in the paragraph.
    }
    if (peaks.length > 0) {
      spectra.push({
        string: nmrString,
        peaks: peaks,
      });
    }
  }
  return spectra;
}
// This function will loop over all identified spectrum adn parsed them appending to the param. 'result' the nmr-caracterization.
function parseSpectrum(result, spectra) {
  for (let spectrum of spectra) {
    const peaks = spectrum.peaks;
    let nmrString = spectrum.string;

    if (!result.spectra.nmr) result.spectra.nmr = [];
    let currentNmr = {}; //current nmr object to be append to param. 'result' object.
    let remain = nmrString.slice(0, nmrString.indexOf(peaks[0])); // the reamin usually contains the general properties of the spectrum (frequency, solven, ppm etc...)
    if (/\([^)]+\)/.test(remain)) {
      let nmrProperties = remain
        .match(/\([^)]+\)/)[0]
        .replace(/[()]/g, '')
        .split(',');
      // This loop will parse the general properties of the spectrum found in the first paranthesis of 'remain'.
      for (let genProperty of nmrProperties) {
        if (genProperty.includes('MHz')) {
          //identifies the frequency of the spectrometer.
          currentNmr.frequency = parseFloat(
            genProperty.match(/[0-9]+(\.[0-9]+)?/)[0],
          );
        } else if (genProperty.length > 3) {
          // discards any small property like units (ppm) and symbols (delta).
          currentNmr.solvent = genProperty.trim();
        }
      }
    }
    // identifies the nucleus of the spcertum !!fix: should be integrated to the 'integration' recognition for generalization of the code to any-nucleus NMR.
    currentNmr.nucleus = nmrString
      .match(/[0-9]*[A-Z](-|=)NMR/)[0]
      .replace(/(-|=)NMR/, '');
    // for debugging
    // if (debug) {
    //   currentNmr.control = {
    //     peaks: peaks,
    //     nmrSource: nmrString,
    //     control: remain,
    //   };
    // }
    // array containing the parsed peaks.
    let ranges = [];
    // loop over identified peaks in retrievePeaks()
    for (let peak of peaks) {
      let currentPeak = {};
      // value/interval recognition of the peak
      let values = peak
        .replace(/\([^)]+\)/, '') //discard the general properties in parenthesis (may conatin a number miss-identified as a value)
        .trim()
        .match(/[0-9]+(\.[0-9]+)?/g);
      if (values.length > 1) {
        // in case if interval
        let min = values[0];
        let max = values[1];
        currentPeak.from = parseFloat(min);
        currentPeak.to = parseFloat(max);
      } else {
        // in case of single value (==delta)
        currentPeak.signal = [
          {
            delta: parseFloat(values[0]),
          },
        ];
      }
      if (/\([^)]+\)/.test(peak)) {
        // If the identified peaks contains specific properties in paranthesis
        let properties = peak
          .match(/\([^)]+\)/)[0]
          .replace(/[()]/g, '')
          .split(','); //each property is separated from one another with a comma !!
        for (let property of properties) {
          // The sequence of conditions is intended to follow as much as possible the general properties order (integration,multiplicity,coupling,assignements)
          if (
            /[0-9]+\s*(H|C)/.test(property) && //thsi could be impoved integrated the 'nucleus' property of the spectrum as tag-identifier || only work fro H-NMR and C-NMR as for now
            property.replace(/[0-9]+\s*(H|C)/, '').trim().length === 0
          ) {
            let integration = property
              .replace(currentNmr.nucleus.match(/[A-Z]/), '')
              .trim();
            currentPeak.integral = parseFloat(integration);
          } else if (
            //multiplicity recognition
            property.length < 6 &&
            property.replace(/([0-9]?[a-z]|\s)+/g, '').length === 0
          ) {
            if (!currentPeak.signal) currentPeak.signal = [{}];
            currentPeak.signal[0].multiplicity = property.trim();
          } else if (property.match(/(Hz|\sJ\s)/g)) {
            //coupling recognition
            if (!currentPeak.signal) currentPeak.signal = [{}];
            if (!currentPeak.signal[0].j) currentPeak.signal[0].j = [];
            if (property.match(/[0-9]+\.[0-9]+/)) {
              currentPeak.signal[0].j.push({
                coupling: parseFloat(property.match(/[0-9]+\.[0-9]+/)[0]),
              });
            }
          } else {
            // if none of the above : assignment recognition
            if (!currentPeak.signal) currentPeak.signal = [{}];
            currentPeak.signal[0].assignment = property.trim();
          }
        }
      }
      ranges.push(currentPeak);
    }
    currentNmr.ranges = ranges;
    result.spectra.nmr.push(currentNmr);
  }
}
