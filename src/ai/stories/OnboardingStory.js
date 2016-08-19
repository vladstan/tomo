import RealEstateActions from 'ai/actions/RealEstateActions';
import RealEstateApi from 'apis/RealEstateApi';

class OnboardingStory {

  constructor(config, user) {
    const realEstateApi = RealEstateApi.getInstance(config);
    this.realEstateActions = new RealEstateActions(realEstateApi);

    // this.define(user);
    this.user = user;
  }

  async run(past, context, entities, bot) {}

  async postback(past, context, postbackId, bot) {
    switch (postbackId) {
      case 'GET_STARTED':
        bot.sayText('Hi NAME, I\'m Claire your personal concierge for your stay in Palma de Mallorca');
        bot.sayText('You can use me for free during your stay on the island');
        bot.sayText('Let me show you want I can do for you')
          .quickReply('Ok, let\'s start', 'ONBOARDING_POSTCARDS');
        return true;

      case 'ONBOARDING_POSTCARDS':
        bot.sayText('You can send printed postacards to loved one');
        bot.sayText('Just type I want to send a postacard to get started')
          .quickReply('Show me how', 'ONBOARDING_DEMO_POSTCARD')
          .quickReply('Show me something else', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_DEMO_POSTCARD':
        bot.sayText('Choose a picture and send it me, make sure it has a good resolution.');
        // const imageProps = {};
        // imageProps.url = 'https://scontent.fotp3-1.fna.fbcdn.net/v/t1.0-9/13413092_1731242630468630_312625618415653582_n.jpg?oh=a651576484a0dd598eabf5b3d824a9ba&oe=581696C4g';
        // bot.sendImage(imageProps);
        bot.sayText('Than choose the type of the postcard.')
          .quickReply('Typed $2.99', 'ONBOARDING_POSTCARDS_NOTREADY')
          .quickReply('Handrwritten $9.99', 'ONBOARDING_POSTCARDS_NOTREADY')
          .quickReply('Show me something else', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_POSTCARDS_NOTREADY':
        bot.sayText('Ok, thanks for letting us know.');
        bot.sayText('As I told you we are still in private beta, and this flow is not ready yet.')
          .quickReply('Contact a human to send it', 'ONBOARDING_HUMAN')
          .quickReply('Show me something else', 'ONBOARDING_REAL_ESTATE');
        return true;

      case 'ONBOARDING_REAL_ESTATE':
        bot.sayText('You can rent or buy properties on the Island');
        bot.sayText('Just type I want to rent an apartment to get started')
          .quickReply('Ok', 'ONBOARDING_RETAURANTS');
        return true;

      case 'ONBOARDING_RETAURANTS':
        bot.sayText('You can find the best restaurants and cofeeshops on the island');
        bot.sayText('Just type: Find me the best traditional spanish restaurant')
          .quickReply('Ok', 'ONBOARDING_NIGHTLIFE');
        return true;

      case 'ONBOARDING_NIGHTLIFE':
        bot.sayText('You can find the best parties or night clubs on the island');
        bot.sayText('Just type: Find me the best parties')
          .quickReply('Ok', 'ONBOARDING_CAR_RENTAL');
        return true;

      case 'ONBOARDING_CAR_RENTAL':
        bot.sayText('You can rent a car on the island');
        bot.sayText('Just type: I want to rent a car to get started')
          .quickReply('Ok', 'ONBOARDING_ACTIVITIES');
        return true;

      case 'ONBOARDING_ACTIVITIES':
        bot.sayText('You can discover the best activities you can do on the island');
        bot.sayText('Just type: Find me an activity')
          .quickReply('Ok', 'ONBOARDING_FEEDBACK');
        return true;

      case 'ONBOARDING_FEEDBACK':
        bot.sayText('Because we are still in beta not all the services will work');
        bot.sayText('Just type: feedback - I want to order pizza trough this app')
          .quickReply('Ok', 'ONBOARDING_START');
        return true;

      case 'ONBOARDING_START':
        bot.sayText('Now you can get started simply by typing what do you want from me');
        bot.sayText('And remember if you have a different need just let me know, I\'ll do my best to solve it.');
        return true;

      case 'ONBOARDING_HUMAN':
        bot.sayText('Ok, someone in our team will get in touch with you ASAP');
        bot.sayText('You can allways select the menu and restart the demo, or see a list of actions I can do for you');
        return true;

      case 'ONBOARDING_LIST':
        bot.sayText('Hi there, this is the list of things I can do for you during the stay')
          .quickReply('Send a Postcard', 'ONBOARDING_POSTCARDS')
          .quickReply('Buy or rent a property', 'ONBOARDING_REAL_ESTATE')
          .quickReply('Find a restaurant', 'ONBOARDING_RETAURANTS')
          .quickReply('Activities', 'ONBOARDING_ACTIVITIES')
          .quickReply('Rent a car ', 'ONBOARDING_CAR_RENTAL')
          .quickReply('Nightlife ', 'ONBOARDING_NIGHTLIFE');
        bot.sayText('Or you can just simply type Send a postcard or find me a resurant to get started.');
        return true;
    }
  }

}

export default OnboardingStory;
