import StoryUser from 'ai/StoryUser';
import WitAiApi from 'domains/core/WitAiApi';

import StoryManager from 'ai/StoryManager';
import ResponseManager from 'ai/ResponseManager';

import Message from 'models/Message';

import BotMemory from 'ai/bot/BotMemory';
import BotInterface from 'ai/bot/BotInterface';
import BotPast from 'ai/bot/BotPast';
import ActionMessage from 'models/ActionMessage';

import Config from 'server/Config';

class WitBot {

  witAiApi: WitAiApi;
  config: Config;
  data: Object;

  constructor(config: Config) {
    this.witAiApi = WitAiApi.getInstance(config);
    this.config = config;
  }

  init(data: Object) {
    this.data = data;
  }

  async process(messageText: string) {
    const parsed = await this.witAiApi.parseMessage(messageText);
    log.debug('wit.ai response:', JSON.stringify(parsed));

    const botPast = new BotPast(this.data.messages);
    botPast.addUserMessage(parsed, this.data.user.id);

    const results = await this.runAllStories(botPast, parsed);
    const sortedResults = results.sort(this.confidenceComparatorDesc);
    const bestResult = sortedResults.find((result) => result.matched);
    log.silly('results:', results);
    log.silly('sortedResults:', sortedResults);
    log.silly('bestResult:', bestResult);
    // TODO store results in conversation / messages

    let responses = null;
    if (bestResult) {
      responses = bestResult.responses;

      log.silly('saving action messages');
      for (const actionMessage of bestResult.actionMessages) {
        await new ActionMessage({ // eslint-disable-line babel/no-await-in-loop
          type: actionMessage.type,
          userId: this.data.user.id,
          messageText: actionMessage.messageText,
        }).save();
      }

      log.silly('saving new prefs');
      this.data.profile.prefs = this.data.profile.prefs || {};
      for (const {key, value} of bestResult.newPrefs) {
        this.data.profile.prefs[key] = value;
      }
    } else {
      responses = []; // this.getContactHumanResponses();
    }

    responses.forEach((resp) => botPast.addBotResponse(resp, this.data.user.id));

    for (const newMessage of botPast.newMessages) {
      newMessage.sessionId = this.data.session.id;
      await new Message(newMessage).save(); // eslint-disable-line babel/no-await-in-loop
    }

    log.silly('WitBot', 'finished processing', responses);
    return responses;
  }

  async postback(postbackId: string) {
    const botPast = new BotPast(this.data.messages);
    botPast.addPostback(postbackId);

    const results = await this.postbackAllStories(botPast, postbackId);
    const sortedResults = results.sort(this.confidenceComparatorDesc);
    const bestResult = sortedResults.find((result) => result.matched);
    // log.silly('sortedResults:', JSON.stringify(sortedResults));
    // TODO store results in conversation / messages

    let responses = null;
    if (bestResult) {
      responses = bestResult.responses;

      log.silly('saving action messages');
      for (const actionMessage of bestResult.actionMessages) {
        await new ActionMessage({ // eslint-disable-line babel/no-await-in-loop
          type: actionMessage.type,
          userId: this.data.user.id,
          messageText: actionMessage.messageText,
        }).save();
      }

      log.silly('saving new prefs');
      this.data.profile.prefs = this.data.profile.prefs || {};
      for (const {key, value} of bestResult.newPrefs) {
        this.data.profile.prefs[key] = value;
      }
    } else {
      responses = []; // this.getContactHumanResponses();
    }

    responses.forEach((resp) => botPast.addBotResponse(resp, this.data.user.id));

    // log.silly('WitBot', 'finished processing', responses);
    return responses;
  }

  async runAllStories(botPast: Object, parsed: Object) {
    const storyTypes = StoryManager.getAllTypes();
    const tasks = storyTypes.map((Story) => this.runStory(Story, botPast, parsed));
    return await Promise.all(tasks);
  }

  async postbackAllStories(botPast: Object, postbackId: string) {
    const storyTypes = StoryManager.getAllTypes();
    const tasks = storyTypes.map((Story) => this.postbackStory(Story, botPast, postbackId));
    return await Promise.all(tasks);
  }

  async runStory(Story, botPast: Object, parsed: Object) {
    parsed = JSON.parse(JSON.stringify(parsed));

    const user = new StoryUser();
    const story = new Story(this.config, user);

    const entities = parsed.entities;
    const context = {}; // this.data.session.context; // numb context TODO
    // TODO don't persist some context props
    // TODO work on copy, not model
    // TODO store context in every state and context delta (in conversation, per message)

    this.checkEntities(entities, user);

    const botMemory = new BotMemory(this.data.memory); // TODO work on clone?
    const botInterface = new BotInterface();
    botInterface.memory = botMemory;

    context.facebookSenderId = this.data.user.facebookId;
    const matched = !!(await story.run(botPast, context, entities, botInterface));
    delete context.intent;

    return {
      confidence: 1,
      matched: matched,
      responses: botInterface.getResponses(),
      actionMessages: botInterface.getActionMessages(),
      newPrefs: botInterface.prefs,
    };
  }

  async postbackStory(Story, botPast: Object, postbackId: string) {
    const user = new StoryUser();
    const story = new Story(this.config, user);

    // const entities = parsed.entities;
    const context = {}; // this.data.session.context; // numb context TODO
    // TODO don't persist some context props
    // TODO work on copy, not model
    // TODO store context in every state and context delta (in conversation, per message)

    // this.checkEntities(entities, user);

    const botMemory = new BotMemory(this.data.memory); // TODO work on clone?
    const botInterface = new BotInterface();
    botInterface.memory = botMemory;

    if (story.postback) {
      context.facebookSenderId = this.data.user.facebookId;
      const matched = await story.postback(botPast, context, postbackId, botInterface);
      return {
        confidence: 1,
        matched: matched,
        responses: botInterface.getResponses(),
        actionMessages: botInterface.getActionMessages(),
        newPrefs: botInterface.prefs,
      };
    } else {
      return {
        confidence: 0,
        matched: false,
        responses: botInterface.getResponses(),
        actionMessages: botInterface.getActionMessages(),
        newPrefs: botInterface.prefs,
      };
    }
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
      {
        text: ResponseManager.find('NO_UNDERSTAND_CONTACT_HUMAN'),
        quickReplies: [
          {text: 'Contact a human', postbackId: 'ONBOARDING_HUMAN'},
        ],
      },
    ];
  }

  getErrorResponse() {
    return ResponseManager.find('UNKNOWN_ERROR');
  }

}

export default WitBot;
