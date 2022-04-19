import {dateMin, dateMax} from "../utils/date";

export default class NewsApi {
    constructor(config) {
        this.baseURL = config.baseURL;
        this.sortBy = config.sortBy;
        this.pageSize = config.pageSize;
        this.apiKey = config.apiKey;
        this.endpoint = config.endpoint;
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        } else {
            return res.json();
        }
    }

    async getNews(keyword) {
        try {
            const res = await fetch(`${this.baseURL}${this.endpoint}?q=${keyword}&from=${dateMin}&to=${dateMax}&sortBy=${this.sortBy}&pageSize=${this.pageSize}&apiKey=${this.apiKey}`, {
                method: "GET",
            });
            const promiseRes = await res.json();
            const articles = promiseRes.articles;
            // console.log(articles);

            return await articles;
        } catch (error) {
            this.getResponseData(res);
        }
    }
}
