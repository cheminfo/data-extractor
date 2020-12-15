import { inspect } from 'util';

export default function newNmr(result, text, options = {}) {
  const { debug = false } = options;
  if (text.match(/[0-9]*[A-Z](-|=)NMR/)) {
    let index = /[0-9]*[A-Z](-|=)NMR/.exec(text).index;
    console.log(index);
    if (!result.spectra) result.spectra = {};
    text = text.replace(/([0-9]+),([0-9]+)/, '$1.$2');
    let peaks = [];
    let stopper = false;
    for (let i = index; i < text.length; i++) {
      if (/[0-9]/.test(text[i])) {
        for (let j = i++; j < text.length; j++) {
          if (text[j] === '(') stopper = true;
          if (text[j] === ')') stopper = false;
          if (
            !stopper &&
            (!/([0-9]|\.|-|~|\s)/i.test(text[j]) ||
              j === text.length - 1 ||
              j === ';')
          ) {
            if (j - i > 2) {
              peaks.push(text.slice(i - 1, j+1));
              i = j;
              break;
            } else {
              i = j;
              break;
            }
          }
        }
      }
    }

    if (debug) console.log(text);
    console.log(peaks);
  }
}
