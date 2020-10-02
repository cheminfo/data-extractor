import recursiveReadSync from 'recursive-readdir-sync';

export function getXMLFiles(homedir) {
  const files = recursiveReadSync(homedir);
  return files;
}
