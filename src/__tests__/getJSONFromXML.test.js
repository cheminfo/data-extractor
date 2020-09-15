import { getJSONFromXML } from '../getJSONFromXML.js';
import { join } from 'path';

describe('getJSONFromXML', () => {
  it('should return 42', () => {
    const filename = join(
      __dirname,
      '../../data/issue_1/molecules-10-00105/molecules-10-00105.xml',
    );

    let json = getJSONFromXML(filename);
    console.log(json);

    // expect(json).toStrictEqual(42);
  });
});
