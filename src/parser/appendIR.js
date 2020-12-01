export default function appendIR(result, text, options = {}) {
  const { debug = false } = options;
  for (const textIR of text.match(/IR[^;]*/g)) {
    let currentIR = { peaks: [] };
    if (debug) currentIR.source = textIR;
    for (let element of textIR.match(/\s[0-9]+(,|\s)/g)) {
      currentIR.peaks.push({
        wavelength: parseInt(element.replace(/(\s|,)/g, '')),
        kind: '',
      });
    }
    if (!result.spectra) result.spectra = {};
    if (!result.spectra.ir) result.spectra.ir = [];
    result.spectra.ir.push(currentIR);
  }
}
