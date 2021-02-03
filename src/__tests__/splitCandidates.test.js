import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { splitCandidates } from '../splitCandidates';
import { createCandidatesJSON } from "../../examples/createJSON";

describe('splitCandidates', () => {
  it('should return an array of single product block', () => {
    const jsonFile = readFileSync(
      join(__dirname, '../../examples/candidatesJSON.json'),
    );
    let candidates = JSON.parse(jsonFile);
    let singleProducts = splitCandidates(candidates);
    console.log(singleProducts.length);

    expect(singleProducts.length).toBeGreaterThan(0);
  });
});
