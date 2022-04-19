//Класс DataStorage предоставляет интерфейс для работы с локальным хранилищем браузера.

export default class DataStorage {
    constructor(data) {
        this.data = data;
    }

    setData(data) {
        localStorage.setItem("articles", JSON.stringify(data));
    }

    getData() {
        return JSON.parse(localStorage.getItem("articles"));
    }

    getTotalResults() {
        return localStorage.getItem("totalResults");
    }

    getArticles() {
        return JSON.parse(localStorage.getItem("articles"));
    }

    setRequest(request) {
        localStorage.setItem("keyword", request.value);
    }

    getRequest() {
        return localStorage.getItem("keyword");
    }
}
