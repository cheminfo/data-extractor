import recursiveReadSync from 'recursive-readdir-sync';

//The function returns an array containing the PATH to all the files conatined in 'homedir'

export function getXMLFiles(homedir) {
  const files = recursiveReadSync(homedir);
  return files;
}
