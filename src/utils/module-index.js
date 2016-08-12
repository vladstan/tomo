import path from 'path';
import fs from 'fs';

export default function(module) {
  const modules = {};

  const dirName = path.dirname(module.filename);
  const dirFiles = fs.readdirSync(dirName);

  for (let file of dirFiles) {
    if (!file.startsWith('.') && file !== module.filename) {
      const moduleName = path.basename(file, path.extname(file));
      modules[moduleName] = require(path.join(dirName, moduleName)).default;
    }
  }

  return modules;
}
