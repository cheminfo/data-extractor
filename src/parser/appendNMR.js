export default function appendNMR(result, text) {
  const Hpattern = /H-NMR[^;]*/;
  const Cpattern = /C-NMR[^;]*/;
  let Hspectrum = Hpattern.exec(text);
  let Cspectrum = Cpattern.exec(text);
  result.spectra = { Hnmr: Hspectrum[0] };
  if (Cspectrum) {
    result.spectra.Cnmr = Cspectrum[0];
  }
}
