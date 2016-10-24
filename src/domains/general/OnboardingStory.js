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

    console.log("past.botAsked('get_accommodation_budget')", past.botAsked('get_accommodation_budget'));
    // console.log("past.botAskedd('get_pref_airport')", past.botAsked('get_pref_airport'));

    if (past.botAsked('get_accommodation_budget')) {
      bot.savePref('accommodation_budget', past.getCurrentMessage().text);
      bot.sayText('Ok, let\'s talk about your flight preferences.');
      bot.sayText('What type of cabin do you prefer?')
        .quickReply('Economy', 'ONBOARDING_CABIN_ECONOMY')
        .quickReply('Economy Plus', 'ONBOARDING_CABIN_ECONOMY-PLUS')
        .quickReply('Business', 'ONBOARDING_CABIN_BUSINESS')
        .quickReply('First Class', 'ONBOARDING_CABIN_FIRST');
      return true;
    }

    if (past.botAsked('get_pref_airport')) {
      bot.savePref('home_airport', past.getCurrentMessage().text);
      bot.sayText('Ok, thank you!');
<<<<<<< HEAD
      bot.sayText('Do you want to tell me few things about your next trip?')
=======
      bot.sayText('Would you like to start planning your next trip right now?')
>>>>>>> 095e93d8abbc7fc0bbede83b19166212fcb653c5
        .quickReply('Yes', 'ONBOARDING_NEXT_TRIP_YES')
        .quickReply('No, later', 'ONBOARDING_NEXT_TRIP_NO');
      return true;
    }
  }

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {
    log.debug('Postback Onboarding with context', JSON.stringify(context));
    const userFbProfile = await this.onboardingActions.getUser(context.facebookSenderId, ['first_name']);
    switch (postbackId) {
      case 'GET_STARTED':
        bot.sayText(`Hi, ${userFbProfile.first_name}! I'm Yago, your bot assistant.`);
        bot.sayText('I want to make sure we\'re offering you the best possible experience.');
        bot.sayText('Let me learn a few things about you.')
          .quickReply('Ok, let\'s do it', 'ONBOARDING_ACCOMMODATION');
        return true;

      case 'ONBOARDING_ACCOMMODATION':
        bot.sayText('Do you prefer to stay at a hotel, hostel or Airbnb?')
          .quickReply('Hotel', 'ONBOARDING_ACCOMMODATION_HOTEL')
          .quickReply('Airbnb', 'ONBOARDING_ACCOMMODATION_AIRBNB')
          .quickReply('Hostel', 'ONBOARDING_ACCOMMODATION_HOSTEL');
        return true;

      case 'ONBOARDING_ACCOMMODATION_HOTEL':
      case 'ONBOARDING_ACCOMMODATION_AIRBNB':
      case 'ONBOARDING_ACCOMMODATION_HOSTEL':
        bot.savePref('accommodation', postbackId.replace('ONBOARDING_ACCOMMODATION_', '').toLowerCase());
        bot.sayTextWithIntent('How much $/night did you spend for accommodation the last time you went in a trip?', 'get_accommodation_budget');
        return true;

      case 'ONBOARDING_CABIN_ECONOMY':
      case 'ONBOARDING_CABIN_ECONOMY-PLUS':
      case 'ONBOARDING_CABIN_BUSINESS':
      case 'ONBOARDING_CABIN_FIRST':
        bot.savePref('flight_cabin', postbackId.replace('ONBOARDING_CABIN_', '').toLowerCase());
        bot.sayText('And what seat do you prefer?')
          .quickReply('Aisle', 'ONBOARDING_SEAT_AISLE')
          .quickReply('Window', 'ONBOARDING_SEAT_WINDOW');
        return true;

      case 'ONBOARDING_SEAT_AISLE':
      case 'ONBOARDING_SEAT_WINDOW':
        bot.savePref('flight_seat', postbackId.replace('ONBOARDING_SEAT_', '').toLowerCase());
        bot.sayTextWithIntent("What's the closest airport?", 'get_pref_airport');
        return true;

      case 'ONBOARDING_NEXT_TRIP_NO':
        bot.sayText('Ok, thank you. Just ping me back when you\'d like to start.');
        return true;

      case 'ONBOARDING_NEXT_TRIP_YES':
        bot.sayText('What kind of trip is this going to be?')
          .quickReply('Solo', 'ONBOARDING_TYPE_SOLO')
          .quickReply('Couple', 'ONBOARDING_TYPE_COUPLE')
          .quickReply('Family', 'ONBOARDING_TYPE_FAMILY')
          .quickReply('Group', 'ONBOARDING_TYPE_GROUP');
        return true;

      case 'ONBOARDING_TYPE_SOLO':
      case 'ONBOARDING_TYPE_COUPLE':
      case 'ONBOARDING_TYPE_FAMILY':
      case 'ONBOARDING_TYPE_GROUP':
        bot.savePref('next_trip_type', postbackId.replace('ONBOARDING_TYPE_', '').toLowerCase());
        bot.sayText('Ok, do you have a destination in mind?')
          .quickReply('Europe', 'ONBOARDING_DESTINATION_EUROPE')
          .quickReply('North America', 'ONBOARDING_DESTINATION_NORTH-AMERICA')
          .quickReply('South America', 'ONBOARDING_DESTINATION_SOUTH-AMERICA')
          .quickReply('Australia & NZ', 'ONBOARDING_DESTINATION_AUSTRALIA-NZ')
          .quickReply('Asia', 'ONBOARDING_DESTINATION_ASIA')
          .quickReply('Not really', 'ONBOARDING_DESTINATION_NO-DESTINATION');
        return true;

      case 'ONBOARDING_DESTINATION_EUROPE':
      case 'ONBOARDING_DESTINATION_NORTH-AMERICA':
      case 'ONBOARDING_DESTINATION_SOUTH-AMERICA':
      case 'ONBOARDING_DESTINATION_ASIA':
      case 'ONBOARDING_DESTINATION_AUSTRALIA-NZ':
      case 'ONBOARDING_DESTINATION_NO-DESTINATION':
        bot.savePref('next_trip_destination', postbackId.replace('ONBOARDING_DESTINATION_', '').toLowerCase());
        bot.sayText('When would you like to go?')
          .quickReply('Next 3 months', 'ONBOARDING_TIME_NEXT-3-MONTHS')
          .quickReply('Next 6 months', 'ONBOARDING_TIME_NEXT-6-MONTHS')
          .quickReply('Next year', 'ONBOARDING_TIME_YEAR');
        return true;

      case 'ONBOARDING_TIME_NEXT-3-MONTHS':
      case 'ONBOARDING_TIME_NEXT-6-MONTHS':
      case 'ONBOARDING_TIME_YEAR':
        bot.savePref('next_trip_time', postbackId.replace('ONBOARDING_TIME_', '').toLowerCase());
        bot.sayText('What\'s the purpose of this trip?')
          .quickReply('Relaxation', 'ONBOARDING_PURPOSE_RELAX')
          .quickReply('Adventure', 'ONBOARDING_PURPOSE_ADVENTURE')
          .quickReply('Cultural', 'ONBOARDING_PURPOSE_CULTURAL')
          .quickReply('Party', 'ONBOARDING_PURPOSE_PARTY')
          .quickReply('Discovery', 'ONBOARDING_PURPOSE_DISCOVER')
          .quickReply('Mix', 'ONBOARDING_PURPOSE_MIX');
        return true;

      case 'ONBOARDING_PURPOSE_RELAX':
      case 'ONBOARDING_PURPOSE_DISCOVER':
      case 'ONBOARDING_PURPOSE_ADVENTURE':
      case 'ONBOARDING_PURPOSE_CULTURAL':
      case 'ONBOARDING_PURPOSE_PARTY':
      case 'ONBOARDING_PURPOSE_MIX':
        bot.savePref('next_trip_purpose', postbackId.replace('ONBOARDING_PURPOSE_', '').toLowerCase());
        bot.sayText('Awesome, thank you!');
        bot.sayText('Let me introduce you to one of our agents. They\'ll help you with your next trip.');
        bot.sayText('They will get back to you shortly.');
        return true;

    }
  }

}

export default OnboardingStory;
