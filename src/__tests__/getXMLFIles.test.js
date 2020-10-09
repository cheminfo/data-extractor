import { join } from 'path';

import { getXMLFiles } from '../getXMLFiles.js';

describe('getXMLFiles', () => {
  it('should have length 154', () => {
    const homeDir = join(__dirname, '../../data/NMR_extract');
    let files = getXMLFiles(homeDir);
    console.log(files.length);
    //chcking if path-format was correct
    // console.log(files);

    expect(files).toHaveLength(115); //the expected length is correct !
  });
});

//why does the test fail ??
