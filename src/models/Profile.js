import {model, staticMethod} from 'utils/mongoose';

@model
class Profile {

  static schema = {
    userId: {type: String, unique: true, required: true},
    // name: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    pictureUrl: {type: String, required: true},
    locale: {type: String},
    timezone: {type: Number},
    prefs: {
      home_airport: {type: String},
      accommodation: {type: String},
      accommodation_budget: {type: Number},
      accommodation_budget_currency: {type: String},
      flight_cabin: {type: String},
      flight_seat: {type: String},
      next_trip_type: {type: String, enum: ['solo', 'couple', 'group', 'family']},
      next_trip_destination: {type: String},
      next_trip_time: {type: String},
      next_trip_purpose: {type: String, enum: ['relax', 'discover', 'adventure', 'cultural', 'party', 'mix']},
      next_trip_extra: {type: String},
    },
  }

  @staticMethod
  static async findOneOrCreate(query, newDocCallback) {
    let doc = await this.findOne(query);
    if (!doc) {
      if (newDocCallback) {
        doc = new this(await newDocCallback());
      } else {
        doc = new this(query);
      }
      await doc.save();
    }
    return doc;
  }

}

export default Profile;
