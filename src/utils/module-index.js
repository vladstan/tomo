import path from 'path';
import fs from 'fs';

export default function(...pathSegments) {
  const modules = {};

  const dirName = path.resolve(...pathSegments);
  const dirFiles = fs.readdirSync(dirName);

  for (const fileName of dirFiles) {
    if (fileName.startsWith('.') || path.extname(fileName) !== '.js') {
      continue;
    }

    const filePath = path.join(dirName, fileName);
    const moduleName = path.basename(fileName, '.js');

    modules[moduleName] = require(filePath);
  }

  return modules;
}
