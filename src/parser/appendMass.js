// This modules is still under construction and is intended for the recognition of mass-spectra from a texte-source.

export default function appendMass(result, text, options) {
  const { debug = false } = options;
  if (/MS[^;\.]+/.test(text)) {
    for (let massSpecString of text.match(/MS[^;\.]+/g)) {
    //   console.log(massSpecString);
    }
  }
}
