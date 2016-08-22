import ExpediaApi from 'apis/ExpediaApi';

class ActivitiesActions {

  expediaApi: ExpediaApi;

  constructor(expediaApi: ExpediaApi) {
    this.expediaApi = expediaApi;
  }

  async getActivities() {
    return this.expediaApi.getActivities();
  }

  async getShuttle() {
    return this.expediaApi.getShuttle();
  }

}

export default ActivitiesActions;
