import PostcardsActions from 'ai/actions/PostcardsActions';
import PostcardsApi from 'apis/PostcardsApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class PostcardsStory {

  postcardsActions: PostcardsActions;
  user: Config;

  constructor(config: Config, user: StoryUser) {
    const postcardsApi = PostcardsApi.getInstance(config);
    this.postcardsActions = new PostcardsActions(postcardsApi);

    this.define(user);
    this.user = user;
  }

  // TODO run auto correct on text before sending to wit.ai
  define(user: StoryUser) {
    user.says('Send a postcard')
      .intent('postcard', 'postcard');

    // TODO support synonyms
    // TODO define boy.says, too, to calculate confidence and do story matching like wit.ai does
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running Postcards with context', JSON.stringify(context));

    if (context.intent) {
      const listings = await this.postcardsActions.getPostcards(context.intent);
      bot.say('These are 3 lovely postcards you can send worldwide for only $2.99');
      bot.sendCards(listings); // TODO map every field explicitly

      return true;
    }
  }

}

export default PostcardsStory;
