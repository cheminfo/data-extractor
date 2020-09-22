import { readFileSync, read, writeFile } from 'fs';
import { xml2js } from 'xml-js';

export function getJSONFromXML(filename) {
  const xml = readFileSync(filename, 'utf8');
  return xml2js(xml);
}
