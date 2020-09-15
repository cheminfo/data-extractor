import { readFileSync, readdir } from 'fs';
import { join } from 'path';

export function myModule() {
  const basedir = join(__dirname, '../data');

  return 42;
}
