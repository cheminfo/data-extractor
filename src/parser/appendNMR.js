export default function appendNMR(result, text, options = {}) {
  const { debug = false } = options;
  if (!result.spectra) result.spectra = {};
  const peakPattern = /[0-9]+\.[0-9]+(\s?.\s?[0-9]+\.[0-9]+)?\s?(\([^\)]*\))?/g;
  if (text.match(/[0-9]*[A-Z](-|=)NMR[^;]*/)) {
    for (let [j, spectrum] of text
      .match(/[0-9]*[A-Z](-|=)NMR[^;]*/g)
      .entries()) {
      if (spectrum.match(peakPattern)) {
        if (!result.spectra.nmr) result.spectra.nmr = [{}];
        let remain = spectrum.replace(peakPattern, '');
        let experiment = '1d';
        let nucleus = spectrum
          .match(/[0-9]*[A-Z](-|=)NMR/)[0]
          .replace(/(-|=)NMR/, '');
        result.spectra.nmr.push({
          experiment: experiment,
          nucleus: nucleus,
        });
        if (debug) {
          result.spectra.nmr[j].description = spectrum;
          result.spectra.nmr[j].control = remain;
        }
        let ranges = [];
        for (let [i, peak] of spectrum.match(peakPattern).entries()) {
          let value = peak.match(
            /[0-9]+\.[0-9]+(\s?[^,]\s?[0-9]+\.[0-9]+)?/,
          )[0];
          if (value.match(/[0-9]+\.[0-9]+\s?.\s?[0-9]+\.[0-9]+/)) {
            let rangeString = value.match(/[0-9]+\.[0-9]+/g);
            let min = rangeString[0];
            let max = rangeString[1];
            ranges.push({
              from: parseFloat(min),
              to: parseFloat(max),
            });
          } else {
            ranges.push({
              signal: [
                {
                  peak: parseFloat(value.replace(/\s/, '')),
                },
              ],
            });
          }
          if (!ranges[i].signal) ranges[i].signal = [{}];
          if (/\([^)]*\)/.test(remain)) {
            ranges[i].signal.solvent = remain
              .match(/\([^)]*\)/)[0]
              .replace(/\(|\)/g, '');
          }
          if (peak.match(/\([^\)]+\)/)) {
            let propertyString = peak.match(/\([^\)]+\)/);
            let properties = propertyString[0]
              .replace(/[\(\)]/g, '')
              .split(`,`);
            for (let element of properties) {
              if (
                /[0-9]+\s*(H|C)/.test(element) &&
                element.replace(/[0-9]+\s*(H|C)/, '').replace(/\s/g, '')
                  .length === 0
              ) {
                let integration = element
                  .replace(nucleus.match(/[A-Z]/), '')
                  .replace(/\s/g, '');
                ranges[i].Pubintegral = parseFloat(integration);
              } else if (
                element.length < 6 &&
                element.replace(/([0-9]?[a-z]|\s)+/g, '').length === 0
              ) {
                ranges[i].signal[0].Pubmultiplicity = element.replace(
                  /\s/g,
                  '',
                );
              } else if (element.match(/(Hz|\sJ\s)/g)) {
                if (!ranges[i].signal) ranges[i].signal = [{}];
                if (!ranges[i].signal[0].j) ranges[i].signal[0].j = [];
                if (element.match(/[0-9]+(.[0-9]+)?/)) {
                  ranges[i].signal[0].j.push({
                    coupling: parseFloat(element.match(/[0-9]+(.[0-9]+)?/)[0]),
                  });
                }
              } else {
                if (!ranges[i].signal) ranges[i].signal = [{}];
                ranges[i].signal[0].pubAssignment = element;
              }
            }
          }
        }

        result.spectra.nmr[j].range = ranges;
      }
    }
  }
}
