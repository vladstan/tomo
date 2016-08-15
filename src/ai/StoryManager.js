import moduleIndex from 'utils/module-index';

const storyModules = moduleIndex(__dirname, 'stories');
const stories = Object.values(storyModules).map((mod) => mod.default);

class StoryManager {

  static getAllTypes() {
    return stories;
  }

}

export default StoryManager;
