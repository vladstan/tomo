import OnboardingActions from 'domains/general/OnboardingActions';
import FacebookApi from 'domains/core/FacebookApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class OnboardingStory {

  onboardingActions: OnboardingActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const facebookApi = FacebookApi.getInstance(config);
    this.onboardingActions = new OnboardingActions(facebookApi);

    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says('Paris')
      .entity('wit/location', 'location', 'Paris');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running OnboardingStory with context', JSON.stringify(context));

    if (past.botAsked('get_pref_airport')) {
      bot.savePref('home_airport', past.getCurrentMessage().text);
      bot.sayText('What type of cabin do you prefer?')
        .quickReply('Economy', 'ONBOARDING_CABIN_ECONOMY')
        .quickReply('Business', 'ONBOARDING_CABIN_BUSINESS');
      return true;
    }
  }

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {
    log.debug('Postback Onboarding with context', JSON.stringify(context));
    const userFbProfile = await this.onboardingActions.getUser(context.facebookSenderId, ['first_name']);
    switch (postbackId) {
      case 'GET_STARTED':
        bot.sayText(`Hi ${userFbProfile.first_name}, I'm Yago your bot assistant.`);
        bot.sayText('I want to make sure we’re offering you the best possible experience.');
        bot.sayText('Let me learn few things about you.')
          .quickReply('Ok, let\'s do it', 'ONBOARDING_ACCOMMODATION');
        return true;

      case 'ONBOARDING_ACCOMMODATION':
        bot.sayText('Do you prefer to stay at hotel, hostel or Airbnb?')
          .quickReply('Hotel', 'ONBOARDING_AIRPORT_HOTEL')
          .quickReply('Airbnb', 'ONBOARDING_AIRPORT_AIRBNB')
          .quickReply('Hostel', 'ONBOARDING_AIRPORT_HOSTEL');
        return true;

      case 'ONBOARDING_AIRPORT_HOTEL':
      case 'ONBOARDING_AIRPORT_AIRBNB':
      case 'ONBOARDING_AIRPORT_HOSTEL':
        bot.savePref('accommodation', postbackId.replace('ONBOARDING_AIRPORT_', '').toLowerCase());
        bot.sayText('Great, thank you.');
        bot.sayText('How much did you spend for accommodation per night last time you were in a trip?')
          .quickReply('Less than $75/day', 'DUMMY')
          .quickReply('Less than $150/day', 'ONBOARDING_REAL_ESTATE')
          .quickReply('More than $200/day', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_HOME_AIRPORT':
        bot.sayTextWithIntent("What's the airport closest to you?", 'get_pref_airport');
        return true;

      case 'ONBOARDING_RESTAURANTS':
        bot.sayText('You can find the best restaurants, cofeeshops or clubs on the island');
        bot.sayText('Just type: \'Find me the best club or restaurant or coffee\' to get started')
          .quickReply('Find me a club', 'DUMMY')
          .quickReply('Find a restaurant', 'DUMMY')
          .quickReply('Not now, what else', 'ONBOARDING_SHUTLLE');
        return true;

      case 'ONBOARDING_SHUTLLE':
        bot.sayText('I can find you a shuttle for the airport');
        bot.sayText('Just type: \'I want a shuttle\' to get started')
          .quickReply('Airport shuttle', 'DUMMY')
          .quickReply('What else', 'ONBOARDING_FEEDBACK');
        return true;

      case 'ONBOARDING_FEEDBACK':
        bot.sayText('Type \'help\' to see what cool things I can do');
        bot.sayText('If you have any feedback for us just let me know.');
        return true;

      case 'ONBOARDING_HUMAN':
        bot.sayText('Ok, someone in our team will get in touch with you ASAP')
          .quickReply('List the activities', 'ONBOARDING_LIST');
        bot.addActionMessage({
          messageText: 'Talk to a human',
        });
        return true;

      case 'ONBOARDING_LIST':
        bot.sayText('Type one of these things I can do for you to start');
        bot.sayText('I want to send a postcard');
        bot.sayText('What\'s the weather in {location}');
        bot.sayText('I want to rent or buy an apartment');
        bot.sayText('Find a restaurant / club or coffeeshop');
        bot.sayText('Find me an airport shuttle');
        bot.sayText('Find me activity or things to do on the island');
        bot.sayText('Enjoy <3 Palma');
        return true;

      // case 'REENGAGE_DAY_1':
      //   bot.sayText('Day 1!!')
      //     .quickReply('Ok', 'OK');
      //   return true;
    }
  }

}

export default OnboardingStory;
