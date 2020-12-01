import { util } from "prettier";
import {inspect} from 'util';

export default function appendNMR(result, text) {
  const Hpattern = /H-NMR[^;]*/;
  const Cpattern = /C-NMR[^;]*/;
  const peakPattern = /[0-9]+\.[0-9]+((-|~|)[0-9]+\.[0-9]+)?\s?\([^\)]*\)/g;
  let Hspectrum = Hpattern.exec(text);
  let Hpeaks = Hspectrum[0].match(peakPattern);
  let remain = Hspectrum[0].replace(peakPattern, '');
  Hpeaks.forEach((element) => {
    const propertyPattern = /\([^\)]+\)/;
    let range = [];
    let property = element.match(propertyPattern);
    let properties = property[0].replace(/[\(\)]/g, '').split(`,`);
    console.log(properties);
    let value = element.replace(property, '');
    // console.log(value);
    if (value.includes('-') | value.includes('~')) {
      let rangeString = value.split(/(-|~)/);
      let min = rangeString[0];
      let max = rangeString[2];
      // console.log(`${min}-${max}\n${properties.length}`);
      range.push({
        from: parseFloat(min),
        to: parseFloat(max),
      });
    } else {
      range.push({
        mean: parseFloat(value),
      });
    }
    let remain = property[0];
    properties.forEach((element) => {
      if (element.match(/[0-9]+H/)) {
        let integration = element.match(/[0-9]+H/)[0].replace('H', '');
        range[0].integral = parseFloat(integration);
        remain.replace(element,'');
      }
      if (element.replace(/[a-z]+/, '').length === 0) {
        range[0].signal = [{ multiplicity: element }];
        remain.replace(element,'');
      }
    });
    console.log(inspect(range));
    console.log(remain);
  });
  // let Cspectrum = Cpattern.exec(text);
  // console.log(Hspectrum[0]);
  // console.log(remain);
  // console.log(peaks);
  // if (Cspectrum) {
  //   result.spectra.Cnmr = Cspectrum[0];
  // }
}
