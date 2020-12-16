import { inspect } from 'util';

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
      let peaks = [];
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
                peaks.push(text.slice(i - 1, j + 1));
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
      if (peaks.length > 0) {
        if (!result.spectra.nmr) result.spectra.nmr = [];
        let nmrProp = text.slice(index,text.indexOf(peaks[0]));

        result.spectra.nmr.push({
          peaks: peaks,
          nmrSource: nmrString,
          control: nmrProp,
        });
      }
      // console.log(peaks);
    }
    // console.log(inspect(result, false, null, true));
  }
}
