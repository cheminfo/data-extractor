export default function appendIR(result, text, options = {}) {
  const { debug = false } = options;
  if (text.match(/IR[^;]*/g)) {
    for (const textIR of text.match(/IR[^;]*/g)) {
      let currentIR = { peaks: [] };
      let remain = textIR.replace(/\s[0-9]+(,|\s)/g, '');
      if (debug) {
        currentIR.source = textIR;
        currentIR.control = remain;
      }
      if (textIR.match(/\s[0-9]+(,|\s)/g)) {
        for (let element of textIR.match(/\s[0-9]+(,|\s)/g)) {
          currentIR.peaks.push({
            wavelength: parseInt(element.replace(/(\s|,)/g, '')),
            kind: '',
          });
        }
      }
      if (/\([^\)]+\)/.test(remain.replace('cm-1', ''))) {
        currentIR.conditions = remain
          .replace('cm-1', '')
          .match(/\([^\)]+\)/)[0]
          .replace(/\(|\)/g, '');
      }
      if (!result.spectra) result.spectra = {};
      if (!result.spectra.ir) result.spectra.ir = [];
      result.spectra.ir.push(currentIR);
    }
  }
}
