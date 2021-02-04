import { join } from 'path';

import { getXMLFiles } from '../getXMLFiles.js';

describe('getXMLFiles', () => {
  it('should have length 154', () => {
    const homeDir = join(__dirname, '../../data/data');
    let files = getXMLFiles(homeDir);
    console.log(files.length);
    //chcking if path-format was correct
    // console.log(files);

    expect(files).toHaveLength(154); //the expected length is correct !
  });
});

//why does the test fail ??
