import RecommendApi from 'stories/activities/RecommendApi';

class RecommendActions {

  recommendApi: RecommendApi;

  constructor(recommendApi: RecommendApi) {
    this.recommendApi = recommendApi;
  }

  async getRecommendations(type) {
    return this.recommendApi.getRecommendations(type);
  }

}

export default RecommendActions;
