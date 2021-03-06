import FacebookApi from 'domains/core/FacebookApi';

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
