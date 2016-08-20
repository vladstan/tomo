class ActivityActions {

  constructor(expediaAPI) {
    this.expediaAPI = expediaAPI;
  }

  async fetchActivities(locationName) {
    // Here we search for activities.
    const result = await this.expediaAPI.search(locationName);
    // log.silly('getLocation geocoding result', JSON.stringify(result));

    if (result) {
      return {
        activities: result.activities,
      };
    }

    return null;
  }

// Here we fetch the details for the selected activity.

  async fetchActivityDetails(activityId) {
    const activity = await this.expediaAPI.detils(activityId);
    return JSON.parse(activity);
  }

}

export default ActivityActions;
