import RealEstateActions from 'ai/actions/RealEstateActions';
import RealEstateApi from 'apis/RealEstateApi';

class OnboardingStory {

  constructor(config, user, logger) {
    this.logger = logger;

    const realEstateApi = RealEstateApi.getInstance(config);
    this.realEstateActions = new RealEstateActions(realEstateApi, logger);

    // this.define(user);
    this.user = user;
  }

  async run(past, context, entities, bot) {}

  async postback(past, context, postbackId, bot) {
    switch (postbackId) {
      case 'GET_STARTED':
        bot.sayText('Hi NAME, I\'m Claire your personal concierge for Palma de Mallorca.')
        bot.sayText('You can use me for free during your stay on the island')
        bot.sayText('Let me show you want I can do for you')
          .quickReply('Continue', 'ONBOARDING_OK');
        return true;

      case 'ONBOARDING_POSTCARDS':
        bot.sayText('You can send printed postacards to loved one, by old email')
        bot.sayText('Just type I want to send a postacard to get started')
          .quickReply('Continue', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_REAL_ESTATE':
        bot.sayText('You can rent or buy properties on the Island')
        bot.sayText('Just type I want to rent an apartment to get started')
          .quickReply('Ok', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_RETAURANTS':
          bot.sayText('You can find the best restaurants and cofeeshops on the island')
          bot.sayText('Just type: Find me the best traditional spanish restaurant')
            .quickReply('Ok', 'ONBOARDING_NIGHTLIFE');
          return true;

      case 'ONBOARDING_NIGHTLIFE':
          bot.sayText('You can find the best parties or night clubs on the island')
          bot.sayText('Just type: Find me the best parties')
            .quickReply('Ok', 'ONBOARDING_CAR_RENTAL');
          return true;

      case 'ONBOARDING_CAR_RENTAL':
          bot.sayText('You can rent a car on the island')
          bot.sayText('Just type: I want to rent a car to get started')
            .quickReply('Ok', 'ONBOARDING_ACTIVITIES');
          return true;

      case 'ONBOARDING_ACTIVITIES':
          bot.sayText('You can rent a car on the island')
          bot.sayText('Just type: I want to rent a car to get started')
            .quickReply('Ok', 'ONBOARDING_FEEDBACK');
          return true;

      case 'ONBOARDING_FEEDBACK':
          bot.sayText('Because we are still in beta not all the services will work')
          bot.sayText('Just type: feedback - I want to order pizza trough this app')
            .quickReply('Ok', 'ONBOARDING_START');
          return true;

      case 'ONBOARDING_START':
          bot.sayText('Now you can get started simply by typing what do you want from me')
          bot.sayText('And remember if you have a different need just let me know, I\'ll do my best to solve it.')
          return true;
    }
  }

}

export default OnboardingStory;
