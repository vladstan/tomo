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
      bot.sayText('Would you like to start planning your next trip right now?')
        .quickReply('Yes', 'ONBOARDING_NEXT_TRIP_YES')
        .quickReply('No, later', 'ONBOARDING_NEXT_TRIP_NO');
      return true;
    }

    if (past.botAsked('get_business_trip_location')) {
      bot.savePref('trip_location', past.getCurrentMessage().text);
      bot.sayText('Ok, thank you!');
      bot.sayTextWithIntent('What are the dates for you business trip?', 'get_dates_business_trip');
      return true;
    }

    if (past.botAsked('get_dates_business_trip')) {
      bot.savePref('dates_business_trip', past.getCurrentMessage().text);
      bot.sayTextWithIntent('Do you have any special requests?', 'get_special_requests_business_trip');
      return true;
    }

    if (past.botAsked('get_special_requests_business_trip')) {
      bot.savePref('special_requests_business_trip', past.getCurrentMessage().text);
      bot.sayText('Awesome, thank you! ');
      bot.sayText('Let me introduce you to one of our booking experts. They\'ll help you with your next trip.');
      bot.sayText('Next time you can simply say: I\'ll fly to NYC next week for a meeting in the fincial district. And we are on it.');
      return true;
    }

    if (past.botAsked('get_leisure_location')) {
      bot.savePref('trip_leisure_location', past.getCurrentMessage().text);
      bot.sayText('Awesome!');
      bot.sayTextWithIntent('What are the dates for you leisure trip?', 'get_dates_leisure_trip');
      return true;
    }

    if (past.botAsked('get_dates_leisure_trip')) {
      bot.savePref('dates_leisure_trip', past.getCurrentMessage().text);
      bot.sayTextWithIntent('Do you have any special requests?', 'get_special_requests_leisure_trip');
      return true;
    }

    if (past.botAsked('get_special_requests_leisure_trip')) {
      bot.savePref('special_requests_leisure_trip', past.getCurrentMessage().text);
      bot.sayText('Awesome, thank you! ');
      bot.sayText('Let me introduce you to one of our travel mates. They\'ll help you with your next trip.');
      bot.sayText('Next time you can simply say: I want to go for 2 weeks in Peru with my Family. And we are on it.');
      return true;
    }

    if (past.botAsked('get_fare_alert_destination')) {
      bot.savePref('fare_alert_destination', past.getCurrentMessage().text);
      bot.sayText('This is super cool! I will notify you every time the price drop for this destination');
      return true;
    }
  }

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {
    log.debug('Postback Onboarding with context', JSON.stringify(context));
    const userFbProfile = await this.onboardingActions.getUser(context.facebookSenderId, ['first_name']);
    switch (postbackId) {
      case 'GET_STARTED':
        bot.sayText(`Hi, ${userFbProfile.first_name}! I'm Tomo, your bot travel mate`);
        bot.sayText('Thank you for joining our waiting list! 🎉');
        bot.sayText("I'll message you here once I have something to show you");
        return true;

// Onboarding full script

      case 'GET_STARTED_FULL':
        bot.sayText(`Hi, ${userFbProfile.first_name}!`);
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

// Passenger Information

      case 'PASSENGER_INFO':
        bot.sayText(`Hi, ${userFbProfile.first_name}! I'm Tomo, your bot travel mate`);
        bot.sayText('Here we need to ask you about your info, like official name, phone and date of birth');
        return true;

// Fare Alerts

      case 'FARE_ALERT':
        bot.sayText('We\'re sending a notification on the price drop for that destination');
        bot.sayTextWithIntent('For what destination do you want to get fare alert?', 'get_fare_alert_destination');
        return true;

// Onboarding business trip for the first time

      case 'ONBOARDING_NEXT_TRIP_YES':
        bot.sayText('What kind of trip is this going to be?')
          .quickReply('Business', 'ONBOARDING_BUSINESS_TRIP')
          .quickReply('Leisure', 'ONBOARDING_LEISURE_TRIP');
        return true;

      case 'ONBOARDING_BUSINESS_TRIP':
        bot.sayText('What kind of trip is this going to be?')
          .quickReply('Solo', 'ONBOARDING_BUSINESS_SOLO')
          .quickReply('Group', 'ONBOARDING_BUSINESS_GROUP');
        return true;

      case 'ONBOARDING_BUSINESS_GROUP':
      case 'ONBOARDING_BUSINESS_SOLO':
        bot.savePref('trip_size', postbackId.replace('ONBOARDING_BUSINESS_', '').toLowerCase()); // TODO we need to create a new collection for each customer(trips)
        bot.sayTextWithIntent('Where do you have to go?', 'get_business_trip_location');
        return true;

// Onboarding Leisure trip for the first time

      case 'ONBOARDING_LEISURE_TRIP':
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
          .quickReply('Yes', 'ONBOARDING_DESTINATION_YES')
          .quickReply('No, give me options', 'ONBOARDING_DESTINATION_NO');
        return true;

      case 'ONBOARDING_DESTINATION_YES':
        bot.sayTextWithIntent('Where do you want to go next?', 'get_leisure_location');
        return true;

      case 'ONBOARDING_DESTINATION_NO':
        bot.sayText('What\'s the purpose for this trip?')
          .quickReply('Relax', 'ONBOARDING_PURPOSE_RELAX')
          .quickReply('Discover', 'ONBOARDING_PURPOSE_DISCOVER')
          .quickReply('Adventure', 'ONBOARDING_PURPOSE_ADVENTURE')
          .quickReply('Party', 'ONBOARDING_PURPOSE_PARTY')
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
        bot.sayText('Let me introduce you to one of our planning experts.');
        bot.sayText('They will get back to you shortly.');
        bot.addActionMessage({
          messageText: '<finished onboarding>',
        });
        return true;

    }
  }

}

export default OnboardingStory;
