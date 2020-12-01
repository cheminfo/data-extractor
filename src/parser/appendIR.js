export default function appendIR(result, text) {
  const pattern = /IR[^;]*/;
  if (text.match(pattern)) {
    let textIR = pattern.exec(text);
    let wavenumbers = textIR[0].match(/\s[0-9]+(,|\s)/g);
    let peaks = [];
    wavenumbers.forEach((element) => {
      peaks.push({
        wavelength: parseInt(element.replace(/(\s|,)/g, '')),
        kind: '',
      });
    });
    result.spectra = { IR: [{ peak: peaks }] };
    // console.log(`${result.iupac}\n${textIR[0]}\n${peaks}`);
  }
}
