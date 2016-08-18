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
        bot.say('ONBOARDING_GET_STARTED')
          .quickReply('Ok', 'ONBOARDING_OK');
        return true;

      case 'ONBOARDING_OK':
        bot.sayText('Demo postcards')
          .quickReply('Ok', 'ONBOARDING_POSTCARDS');
        return true;

      case 'ONBOARDING_POSTCARDS':
        bot.sayText('Demo real estate')
          .quickReply('Ok', 'ONBOARDING_REAL_ESTATE');
        return true;
    }
  }

}

export default OnboardingStory;
