import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { splitCandidates } from '../splitCandidates';

describe('splitCandidates', () => {
  it('should return an array of single product block', () => {
    const jsonFile = readFileSync(
      join(__dirname, '/../../data/JSON-candidates.json'),
    );
    let candidates = JSON.parse(jsonFile);
    let singleProducts = splitCandidates(candidates);
    // writeFileSync(
    //   join(__dirname, '/../../data/JSON-singleProducts.json'),
    //   JSON.stringify(singleProducts),
    // );
    console.log(singleProducts.length);
    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
