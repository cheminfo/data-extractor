import recursiveReadSync from 'recursive-readdir-sync';

/**
 *This module scans recursively all sub-directories starting from 'homeDir' returns an array containing the PATHS to all the files found.
 * @param {String} homedir - This is the starting PATH (relative or absolute) for scanning.
 * @return {Array.<string>} are the relatives paths to all the reccuersively scanned files from 'homeDir'.
 */

export function getXMLFiles(homedir) {
  const files = recursiveReadSync(homedir);
  return files;
}
