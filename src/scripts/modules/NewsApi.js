import { dateMin, dateMax } from "../utils/date";

export default class NewsApi {
  constructor(config){
      this.baseURL = config.baseURL;
      this.sortBy = config.sortBy;
      this.pageSize = config.pageSize;
      this.apiKey = config.apiKey;
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
      `${this.baseURL}?q=${keyword}&from=${dateMin}&to=${dateMax}&sortBy=${this.sortBy}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`,
      /*{
        method: "GET",
      }*/
    )
    .then(this.getResponseData);
  }
}
