import {model} from 'utils/mongoose';

@model
class Agent {

  static schema = {
    name: {type: String, required: true},
    email: {type: String, required: true},
    pictureUrl: {type: String, required: true},
    fbAccessToken: {type: String, required: true},
    fbUserId: {type: String, unique: true, required: true},
  }

}

export default Agent;
