import { today, weekAgoDate } from "../utils/date";

export default class NewsApi {
  constructor(config, param){
      this.baseUrl= config.baseUrl;
      this.apiKey = config.apiKey;
      this.theme = param.theme;
      this.sortBy = param.sortBy;
  }

  getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    } else {
      return res.json();
    }
  }

  getNews(keyword){
    return fetch(
      `${this.baseUrl}?q=${keyword}&from=${weekAgoDate}&to=${today}&sortBy=${this.sortBy}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`
    ).then(this.getResponseData);
  }
}
