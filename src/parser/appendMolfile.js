import fetch from 'node-fetch';
import { URLToolkit } from 'url-toolkit';
import urlencode from 'urlencode';

export default async function appendMolfile(result) {
  const name = result.iupac;
  let url = encodeURI(`http://46.4.119.202:8082/?name=${name}&what=molfile`);
//   console.log(url);
  let molfile = await fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
      'cache-control': 'max-age=0',
      'if-modified-since': 'Tue, 24 Nov 2020 12:28:50 GMT',
      'upgrade-insecure-requests': '1',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
  }).then((res) => res.text());
  return molfile;
}
