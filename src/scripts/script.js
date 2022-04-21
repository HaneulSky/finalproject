import "../styles/style.css";
import NewsCardList from "./components/NewsCardList";
import NewsCard from "./components/NewsCard";
import NewsApi from "./modules/NewsApi";
import SearchInput from "./components/SearchInput";
import DataStorage from "./modules/DataStorage";

//constants
const results = document.querySelector(".results");
const resultsItems = document.querySelector(".results__items");
const resultsTemplate = resultsItems.querySelector("#result-template").content.querySelector(".results__item");
const resultsButton = document.querySelector(".results__button");
const preloader = document.querySelector(".preloader");
const notFound = document.querySelector(".not-found");
const newsSearchForm = document.querySelector(".search__field");
const inputSearch = document.querySelector(".search__field-input");
const errorForm = document.querySelector(".search__error");

const config = {
    // baseURL: `${NODE_ENV === "development" ? "https://newsapi.org/v2/" : "http://newsapi.org/v2/"}`,
    baseURL: `${NODE_ENV === "development" ? "https://nomoreparties.co/news/v2/" : "http://nomoreparties.co/news/v2/"}`,
    apiKey: "db51281e856f4bd5b2f64ff4ffac0659",
    pageSize: "100",
    sortBy: `popularity`,
    endpoint: "everything",
};

//classes
const api = new NewsApi(config);
const searchForm = new SearchInput(inputSearch);
const dataStorage = new DataStorage();

//functions
const createCardFunction = (...args) => {
    const newsCard = new NewsCard(...args, resultsTemplate);
    return newsCard.create();
};

const newsCardList = new NewsCardList(resultsItems, results, api, createCardFunction, preloader, notFound, resultsButton);

function functionValidity(event) {
    event.preventDefault(event);
    if (searchForm.inputValidateSpace(errorForm) === true || searchForm.checkInputValidity(errorForm) === false) {
        searchForm.checkInputValidity(errorForm);
        searchForm.inputValidateSpace(errorForm);
        preloader.classList.remove("hidden");
        results.classList.remove("results__items_active");
        const keyword = inputSearch.value;
        api.getNews(keyword)
            .then((data) => {
                notFound.classList.add("hidden");
                dataStorage.setData(data);
                dataStorage.getData();
                dataStorage.setRequest(inputSearch);

                resultsButton.classList.remove("hidden");
                resultsItems.innerHTML = "";
                newsCardList.render(keyword);
            })
            .catch((err) => {
                console.log(`ошибка запроса ${err}`);
            })
            .finally(() => {
                inputSearch.value = "";
                preloader.classList.add("hidden");
            });
    } else {
        searchForm.checkInputValidity(errorForm);
        searchForm.inputValidateSpace(errorForm);
    }
}

//listeners

newsSearchForm.addEventListener("submit", functionValidity);
