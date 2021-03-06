import {readFileSync, writeFileSync} from 'fs';
import * as glob from 'glob';
import {tmpdir} from 'os';
import {dirname, resolve} from 'path';
import {mv, exec, mkdir, rm} from 'shelljs';

const libPath = resolve(__dirname, '../dist/the-lib');
const tmpLibPath = resolve(tmpdir(), 'the-lib');

// Build both partial and view-engine versions of the library
exec('ng build the-lib -c partial');
safeMove(libPath, tmpLibPath);
exec('ng build the-lib -c view-engine');

// Move the partial FESM2015 format to the view-engine dist folder

safeMove(resolve(tmpLibPath, 'fesm2015'), resolve(libPath, '__ivy_partial__/fesm2015'));

// Overwrite the view-engine typings files with the ones from the partial build
const typingsPaths = glob.sync('**/*.d.ts', {cwd: tmpLibPath, nodir: true});
for(const typingsPath of typingsPaths) {
  safeMove(resolve(tmpLibPath, typingsPath), resolve(libPath, typingsPath));
}

// Update the package.json to point CLI to the partial build for FESM2015
// and to tell ngcc not to touch these files.
const packageJSON = JSON.parse(readFileSync(resolve(libPath, 'package.json'), 'utf8'));
packageJSON.es2015_ivy_ngcc = '__ivy_partial__/es2015/common.js';
packageJSON.fesm2015_ivy_ngcc = '__ivy_partial__/fesm2015/common.js';
packageJSON.module_ivy_ngcc = '__ivy_partial__/module/common.js';
packageJSON.__processed_by_ivy_ngcc__ = {
  es2015: '12.0.0-next.3',
  fesm2015: '12.0.0-next.3',
  module: '12.0.0-next.3',
  typings: '12.0.0-next.3'
};
writeFileSync(resolve(libPath, 'package.json'), JSON.stringify(packageJSON, null, 2), 'utf8');

// Clean up after ourselves
rm('-rf', tmpLibPath);


////////////////////////////////////////////////////////////////


function safeMove(src: string, dest: string) {
  mkdir('-p', dirname(dest))
  mv(src, dest);
}