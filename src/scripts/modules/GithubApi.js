export default class GithubApi {
  constructor(config){
    this.baseUrl = config.baseUrl;
  }

  getCommits () {
    return fetch(`${this.baseUrl}`, {
      method: "GET",
    }).then(this.getResponseData);
  }
}
