import globby from 'globby';
import path from 'path';

const stories = globby
  .sync('stories/*/*Story.js', {
    cwd: process.env.NODE_ENV === 'test'
      ? path.resolve(process.cwd(), '..', 'dist')
      : path.dirname(require.main.filename),
  })
  .map((filePath) => require(filePath).default);

class StoryManager {

  static getAllTypes() {
    return stories;
  }

}

export default StoryManager;
