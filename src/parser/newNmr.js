import { parse } from 'path';
import { inspect } from 'util';

//Run git status !!!


export default function newNmr(result, text, options = {}) {
  const { debug = false } = options;
  if (/[0-9]*[A-Z](-|=)NMR/.test(text)) {
    if (debug) result.source = text;
    const nmrRegex = /[0-9]*[A-Z](-|=)NMR/g;
    for (let p = 0; p < text.match(/[0-9]*[A-Z](-|=)NMR/g).length; p++) {
      let index = nmrRegex.exec(text).index;
      // console.log(nmrRegex);
      if (!result.spectra) result.spectra = {};
      text = text.replace(/([0-9]+),([0-9]+)/, '$1.$2');
      let peakStrings = [];
      let stopper = false;
      let nmrString = '';
      for (let i = index; i < text.length; i++) {
        if (/[0-9]/.test(text[i])) {
          for (let j = i++; j < text.length; j++) {
            if (text[j] === '(') stopper = true;
            if (text[j] === ')') stopper = false;
            if (
              !stopper &&
              (!/([0-9]|\.|-|~|\s)/i.test(text[j]) || j === text.length - 1)
            ) {
              if (j - i > 2) {
                peakStrings.push(text.slice(i - 1, j + 1));
                i = j;
                break;
              } else {
                i = j;
                break;
              }
            }
          }
        }
        if (text[i] === ';' || text[i] === '.') {
          nmrString = text.slice(index, i + 1);
          break;
        }
        nmrString = text.slice(index, i + 1);
      }
      if (peakStrings.length > 0) {
        if (!result.spectra.nmr) result.spectra.nmr = [];
        let currentNmr = {};
        let nmrProp = text.slice(index, text.indexOf(peakStrings[0]));
        currentNmr.nucleus = nmrString
          .match(/[0-9]*[A-Z](-|=)NMR/)[0]
          .replace(/(-|=)NMR/, '');
      
        result.spectra.nmr.push({
          peaks: peakStrings,
          nmrSource: nmrString,
          control: nmrProp,
        });
        let ranges = [];
        for (let peak of peakStrings) {
          let currentPeak = {};
          let values = peak
            .replace(/\([^\)]+\)/, '')
            .trim()
            .match(/[0-9]+(\.[0-9]+)?/g);
          if (values.length > 1) {
            let min = values[0];
            let max = values[1];
            currentPeak.from = parseFloat(min);
            currentPeak.to = parseFloat(max);
          } else {
            currentPeak.signal = [
              {
                delta: parseFloat(values[0]),
              },
            ];
          }
          ranges.push(currentPeak);
        }
        currentNmr.ranges = ranges;
        result.spectra.nmr.push(currentNmr);
      }
      // console.log(peaks);
    }
    // console.log(inspect(result, false, null, true));
  }
}
