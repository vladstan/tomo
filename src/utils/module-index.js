import path from 'path';
import fs from 'fs';

export default function(mod, exclusions = [], defaultProp = true) {
  const modules = {};

  const dirName = path.dirname(mod.filename);
  const dirFiles = fs.readdirSync(dirName);

  const parentModuleName = path.basename(mod.filename, '.js');
  exclusions.push(parentModuleName);

  for (const fileName of dirFiles) {
    if (fileName.startsWith('.') || path.extname(fileName) !== '.js') {
      continue;
    }

    const filePath = path.join(dirName, fileName);
    const moduleName = path.basename(fileName, '.js');

    if (!exclusions.includes(moduleName)) {
      modules[moduleName] = require(filePath);
      if (defaultProp) {
        modules[moduleName] = modules[moduleName].default;
      }
    }
  }

  return modules;
}
