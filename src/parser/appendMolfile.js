import fetch from 'node-fetch';

export default async function appendMolfile(result) {
  const name = result.iupac;
  let url = `http://46.4.119.202:8082/?name=${encodeURIComponent(
    name,
  )}&what=molfile`;
  let response = await fetch(url);
  let molfile = await response.text();
  console.log(molfile);
  return molfile;
}
