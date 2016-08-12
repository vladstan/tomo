import path from 'path';
import fs from 'fs';

export default function(module) {
  const modules = {};

  const dirName = path.dirname(module.filename);
  const dirFiles = fs.readdirSync(dirName);

  for (let file of dirFiles) {
    const filePath = path.join(dirName, file);
    if (!file.startsWith('.') && filePath !== module.filename) {
      const moduleName = path.basename(file, path.extname(file));
      modules[moduleName] = require(filePath).default;
    }
  }

  return modules;
}
