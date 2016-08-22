import FacebookApi from 'apis/FacebookApi';

class OnboardingActions {

  facebookApi: FacebookApi;

  constructor(facebookApi: FacebookApi) {
    this.facebookApi = facebookApi;
  }

  async getUser(id: string, fields: string[]) {
    return await this.facebookApi.getUser(id, fields);
  }

}

export default OnboardingActions;
