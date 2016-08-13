import StoryTypes from '../stories';
import StoryUser from './StoryUser';

import BotPast from './BotPast';
import BotMemory from './BotMemory';
import BotActions from './BotActions';

import Conversation from '../models/Conversation';
import Session from '../models/Session';
import Memory from '../models/Memory';

const stories = Object.keys(StoryTypes)
  .map((name) => StoryTypes[name])
  .map((Story) => new Story(new StoryUser()));

class WitBot {

  constructor(userId, witApi, db) {
    this.userId = userId;
    this.wit = witApi;
    this.db = db;
  }

  async process(messageText) {
    const botResponses = [];
    const botActions = new BotActions(botResponses);

    const parsed = this.wit.getMessage(messageText);
    this.past.addUserMessage(parsed);

    const tasks = stories.map((story) => {
      story.checkEntities(parsed.entities);
      story.run(this.past, this.context, parsed.entities, botActions);
    });
    await Promise.all(tasks);

    botResponses.forEach(this.past.addBotMessage);
    return botResponses.map((msg) => msg.text);
  }

  async wakeUp() {
    const session = await Session.findOne({userId: this.userId});
    const memories = await Memory.find({sessionId: session.id});
    const conversation = await Conversation.findOne({sessionId: session.id});
    this.context = session.context;
    this.memory = new BotMemory(memories);
    this.past = new BotPast(conversation);
  }

  async sleep() {
    const tasks = [
      this.past.conversation.save(),
      ...this.memory.memories.map((mem) => mem.save())
    ];
    await Promise.all(tasks);
  }

}

export default WitBot;
