import { parse } from 'path';

export default function appendAnal(result, text) {
  const AnalPattern = /Anal\..*Found/;
  if (text.match(AnalPattern)) {
    let index = text.match(AnalPattern).index;
    const anal = text.slice(index, text.length);
    const found = anal.slice(anal.match(/Found/).index, anal.length);
    const calculated = anal.replace(found, '');
    let parsedFound = found.match(/(C|H|N),?\s[0-9]+.[0-9]+(;|.)/g);
    let elementalAnalysis = { c: 0, h: 0, n: 0, s: 0 };
    parsedFound.forEach((element) => {
      if (element.includes('C')) {
        elementalAnalysis.c = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
      if (element.includes('H')) {
        elementalAnalysis.h = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
      if (element.includes('N')) {
        elementalAnalysis.n = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
      if (element.includes('S')) {
        elementalAnalysis.s = parseFloat(
          element.replace(/([A-Z]|,|;|\s)/g, ''),
        );
      }
    });
    let MF = anal.match(/for\s[^\s]+/i);
    result.elementalAnalysis = [elementalAnalysis];
    // console.log(elementalAnalysis);
    // console.log(`${anal} - ${found} - ${result.general.meta.filesource}`);
  }
}
