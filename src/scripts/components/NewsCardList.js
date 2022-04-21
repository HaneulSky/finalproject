import {formatDate} from "../utils/date";

export default class NewsCardList {
    constructor(container, section, api, createCardFunction, preloader, notfound, resultButton) {
        this.container = container;
        this.section = section;
        this.api = api;
        this.createCardFunction = createCardFunction;
        this.preloader = preloader;
        this.notfound = notfound;
        this.resultButton = resultButton;
        this.itemPerPage = 3;
        this.begun = 0;
    }

    _addCard(article) {
        const card = this.createCardFunction(formatDate(article.publishedAt), article.source.name, article.urlToImage, article.title, article.description, article.url);
        return this.container.appendChild(card);
    }

    _notFound() {
        this.notfound.classList.remove("hidden");
    }

    _preLoader() {
        this.preloader.classList.toggle("preloader_active");
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        } else {
            return res.json();
        }
    }

    render(keyword) {
        this.api
            .getNews(keyword)
            .then((articles) => {
                if (articles.length !== 0) {
                    this._preLoader();
                    this._moreNewsButtonFuction(articles);
                    this._moreNews(articles);
                    this.section.classList.add("results__active");
                    this.container.classList.add("results__items_active");
                    this.resultButton.classList.remove("hidden");
                } else {
                    // this.container.innerHTML = "";
                    // this.container.classList.remove("results__items_active");
                    this.section.classList.remove("results__active");
                    this._notFound();
                    this._preLoader();
                }
            })
            .catch((err) => {
                this.getResponseData(err);
            });
    }

    _moreNews(articles) {
        const items = articles.slice(0, this.begun + this.itemPerPage);
        if (items.length === 0) {
            console.log("nothing to show");
            this.resultButton.classList.add("hidden");
        } else {
            for (const article of items) {
                this._addCard(article);
            }
        }
    }

    _moreNewsButtonFuction(articles) {
        this.resultButton.addEventListener("click", () => {
            this.begun += this.itemPerPage;
            this._moreNews(articles.slice(this.begun, this.begun + this.itemPerPage));
        });
    }
}
