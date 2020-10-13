import { writeFileSync, readdirSync, readdir } from 'fs';
import { join } from 'path';
import { inspect } from 'util';

import { getJSONFromXML } from '../getJSONFromXML.js';

describe('getJSONFromXML', () => {
  it('should return a JSON file-type', () => {
    let molecule = readdirSync(join(__dirname, '../../data/NMR_extract'));
    let filename = join(__dirname, '../../data/NMR_extract', molecule[1]);
    console.log(filename);

    let JSON = getJSONFromXML(filename);
    console.log(JSON);
    // console.log(inspect(JSON,false, null, true));

    expect(JSON).toBeDefined(); // is it possible to test if the 'type' of the content is a JSON ?
  });
});
