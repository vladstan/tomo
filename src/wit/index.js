import {Wit} from 'node-wit';

const wit = new Wit({
  accessToken: process.env.WIT_AI_ACCESS_TOKEN,
  actions: require('./actions')
});

export default wit;
