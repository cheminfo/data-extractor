export default function appendMass(result, text, options) {
  const { debug = false } = options;
  if (/MS[^;\.]+/.test(text)) {
    for (let massSpecString of text.match(/MS[^;\.]+/g)) {
      console.log(massSpecString);
    }
  }
}
