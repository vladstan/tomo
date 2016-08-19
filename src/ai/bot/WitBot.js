import StoryUser from 'ai/StoryUser';
import WitAiApi from 'apis/WitAiApi';

import StoryManager from 'ai/StoryManager';
import ResponseManager from 'ai/ResponseManager';

import BotMemory from 'ai/bot/BotMemory';
import BotInterface from 'ai/bot/BotInterface';
import BotPast from 'ai/bot/BotPast';

class WitBot {

  constructor(config) {
    this.witAiApi = WitAiApi.getInstance(config);
    this.config = config;
  }

  init(data) {
    this.data = data;
  }

  async process(messageText) {
    const parsed = await this.witAiApi.parseMessage(messageText);
    log.debug('wit.ai response:', JSON.stringify(parsed));

    const botPast = new BotPast(this.data.conversation);
    botPast.addUserMessage(parsed);

    const results = await this.runAllStories(botPast, parsed);
    const sortedResults = results.sort(this.confidenceComparatorDesc);
    const bestResult = sortedResults.find((result) => result.matched);
    log.silly('sortedResults:', JSON.stringify(sortedResults));
    // TODO store results in conversation

    let responses = null;
    if (bestResult) {
      responses = bestResult.responses;
    } else {
      responses = this.getContactHumanResponses();
    }

    responses.forEach((resp) => botPast.addBotResponse(resp));

    // log.silly('WitBot', 'finished processing', responses);
    return responses;
  }

  async postback(postbackId) {
    const botPast = new BotPast(this.data.conversation);
    botPast.addPostback(postbackId);

    const results = await this.postbackAllStories(botPast, postbackId);
    const sortedResults = results.sort(this.confidenceComparatorDesc);
    const bestResult = sortedResults.find((result) => result.matched);
    // log.silly('sortedResults:', JSON.stringify(sortedResults));
    // TODO store results in conversation

    let responses = null;
    if (bestResult) {
      responses = bestResult.responses;
    } else {
      responses = this.getContactHumanResponses();
    }

    responses.forEach((resp) => botPast.addBotResponse(resp));

    // log.silly('WitBot', 'finished processing', responses);
    return responses;
  }

  async runAllStories(botPast, parsed) {
    const storyTypes = StoryManager.getAllTypes();
    const tasks = storyTypes.map((Story) => this.runStory(Story, botPast, parsed));
    return await Promise.all(tasks);
  }

  async postbackAllStories(botPast, postbackId) {
    const storyTypes = StoryManager.getAllTypes();
    const tasks = storyTypes.map((Story) => this.postbackStory(Story, botPast, postbackId));
    return await Promise.all(tasks);
  }

  async runStory(Story, botPast, parsed) {
    parsed = JSON.parse(JSON.stringify(parsed));

    const user = new StoryUser();
    const story = new Story(this.config, user);

    const entities = parsed.entities;
    const context = this.data.session.context;
    // TODO don't persist some context props
    // TODO work on copy, not model
    // TODO store context in every state and context delta (in conversation, per message)

    this.checkEntities(entities, user);

    const botMemory = new BotMemory(this.data.memory); // TODO work on clone?
    const botInterface = new BotInterface();
    botInterface.memory = botMemory;

    const matched = await story.run(botPast, context, entities, botInterface);
    delete context.intent;

    return {
      confidence: 1,
      matched: matched,
      responses: botInterface.getResponses(),
    };
  }

  async postbackStory(Story, botPast, postbackId) {
    const user = new StoryUser();
    const story = new Story(this.config, user);

    // const entities = parsed.entities;
    const context = this.data.session.context;
    // TODO don't persist some context props
    // TODO work on copy, not model
    // TODO store context in every state and context delta (in conversation, per message)

    // this.checkEntities(entities, user);

    const botMemory = new BotMemory(this.data.memory); // TODO work on clone?
    const botInterface = new BotInterface();
    botInterface.memory = botMemory;

    const matched = await story.postback(botPast, context, postbackId, botInterface);

    return {
      confidence: 1,
      matched: matched,
      responses: botInterface.getResponses(),
    };
  }

  checkEntities(entities, user) {
    for (const message of user.getMessages()) {
      for (const entityName of Object.keys(message.entities)) {
        entities[entityName] = entities[entityName] || [];
      }
    }
  }

  confidenceComparatorDesc(a, b) {
    if (a.confidence < b.confidence) {
      return -1;
    } else if (a.confidence > b.confidence) {
      return 1;
    } else {
      return 0;
    }
  }

  getContactHumanResponses() {
    return [
      {text: ResponseManager.find('NO_UNDERSTAND_CONTACT_HUMAN')},
    ];
  }

  getErrorResponse() {
    return [
      {text: ResponseManager.find('UNKNOWN_ERROR')},
    ];
  }

}

export default WitBot;
