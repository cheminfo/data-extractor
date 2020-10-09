import { readFileSync } from 'fs';

import { JSDOM } from 'jsdom';

export async function getProducts(filename) {
  let dom = await JSDOM.fromFile(filename);
  return dom;
}
