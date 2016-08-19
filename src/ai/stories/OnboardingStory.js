import RealEstateActions from 'ai/actions/RealEstateActions';
import RealEstateApi from 'apis/RealEstateApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class OnboardingStory {

  realEstateActions: RealEstateActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const realEstateApi = RealEstateApi.getInstance(config);
    this.realEstateActions = new RealEstateActions(realEstateApi);

    // this.define(user);
    this.user = user;
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {}

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {
    switch (postbackId) {
      case 'GET_STARTED':
        bot.sayText('Hi NAME, I\'m Claire your personal concierge for your stay in Palma de Mallorca');
        bot.sayText('You can use me for free during your stay on the island');
        bot.sayText('Let me show you want I can do for you')
          .quickReply('Ok, let\'s start', 'ONBOARDING_POSTCARDS');
        return true;

      case 'ONBOARDING_POSTCARDS':
        bot.sayText('You can send printed postacards to loved ones.');
        bot.sayText('Just type I want to send a postacard to get started')
          .quickReply('Show me how', 'ONBOARDING_DEMO_POSTCARD')
          .quickReply('What else', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_DEMO_POSTCARD':
        bot.sayText('Choose a picture and send it me, make sure it has a good resolution.');
        // bot.sendImage({url: 'https://epicurienne.files.wordpress.com/2014/11/dscf4418.jpg'});
        // bot.wait('1s');
        bot.sayText('Than choose the type of the postcard.')
          .quickReply('Typed $4.99', 'ONBOARDING_POSTCARDS_NOTREADY')
          .quickReply('Handrwritten $19.99', 'ONBOARDING_POSTCARDS_NOTREADY')
          .quickReply('What else', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_POSTCARDS_NOTREADY':
        bot.sayText('Ok, thanks for letting us know.');
        bot.sayText('As I told you we are still in private beta, and this flow is not ready yet.')
          .quickReply('Contact a human', 'ONBOARDING_HUMAN')
          .quickReply('Ok, what else', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_REAL_ESTATE':
        bot.sayText('You can rent or buy properties on the Island')
          .quickReply('Show me', 'ONBOARDING_REAL_ESTATE_DEMO')
          .quickReply('What else', 'ONBOARDING_RESTAURANTS');
        return true;

      case 'ONBOARDING_REAL_ESTATE_DEMO':
        bot.sayText('You can rent or buy properties on the Island');
        bot.sayText('Type \'I want to rent an apartment\' to get started')
          .quickReply('Not now, what else?', 'ONBOARDING_RESTAURANTS');
        return true;

      case 'ONBOARDING_RESTAURANTS':
        bot.sayText('You can find the best restaurants and cofeeshops on the island');
        bot.sayText('Just type: \'Find me the best traditional spanish restaurant\' to get started')
          .quickReply('Not now, what else', 'ONBOARDING_NIGHTLIFE');
        return true;

      case 'ONBOARDING_NIGHTLIFE':
        bot.sayText('You can find the best parties or night clubs on the island');
        bot.sayText('Just type: \'Find me the best parties\' to het started')
          .quickReply('Not now, what else', 'ONBOARDING_CAR_RENTAL');
        return true;

      case 'ONBOARDING_CAR_RENTAL':
        bot.sayText('You can rent a car on the island');
        bot.sayText('Just type: \'I want to rent a car\' to get started')
          .quickReply('Not now, what else', 'ONBOARDING_ACTIVITIES');
        return true;

      case 'ONBOARDING_ACTIVITIES':
        bot.sayText('You can discover the best activities you can do on the island');
        bot.sayText('Just type: \'Find me an activity\' to get started')
          .quickReply('Ok, what else', 'ONBOARDING_FEEDBACK');
        return true;

      case 'ONBOARDING_FEEDBACK':
        bot.sayText('Because we are still in beta not all the services will work');
        bot.sayText('Just type: \'Feedback - and your feedback\'')
          .quickReply('Ok, thank you', 'ONBOARDING_START');
        return true;

      case 'ONBOARDING_START':
        bot.sayText('Now you can get started simply by typing what do you want from me');
        bot.sayText('And remember if you have a different need just let me know, I\'ll do my best to solve it.');
        return true;

      case 'ONBOARDING_HUMAN':
        bot.sayText('Ok, someone in our team will get in touch with you ASAP');
        bot.sayText('You can allways select the menu and restart the demo, or see a list of actions I can do for you')
          .quickReply('Show me the list now', 'ONBOARDING_LIST');
        return true;

      case 'ONBOARDING_LIST':
        bot.sayText('Hi there, this is the list of things I can do for you during the stay')
          .quickReply('Send a Postcard', 'ONBOARDING_POSTCARDS')
          .quickReply('Rent a house', 'ONBOARDING_REAL_ESTATE')
          .quickReply('Find a restaurant', 'ONBOARDING_RESTAURANTS')
          .quickReply('Activities', 'ONBOARDING_ACTIVITIES')
          .quickReply('Rent a car ', 'ONBOARDING_CAR_RENTAL')
          .quickReply('Nightlife ', 'ONBOARDING_NIGHTLIFE');
        bot.sayText('Or you can just simply type Send a postcard or find me a resurant to get started.');
        return true;
    }
  }

}

export default OnboardingStory;
