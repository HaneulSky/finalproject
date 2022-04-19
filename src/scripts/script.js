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
    baseURL: `${NODE_ENV === "development" ? "https://newsapi.org/v2/" : "http://newsapi.org/v2/"}`,
    //baseURL: `${(NODE_ENV==='development')?'https://nomoreparties.co/news/v2/everything' : 'http://nomoreparties.co/news/v2/everything'}`,
    // baseURL: `${(NODE_ENV==='development')?'https://news-api-v2.herokuapp.com/everything' : 'http://news-api-v2.herokuapp.com/everything'}`,
    //baseURL: 'https://nomoreparties.co/news/v2/everything',
    //apiKey: '3d91c7e0759740f5a4f6c1f566841425',
    //baseURL: 'https://newsapi.org/v2/everything',
    apiKey: "db51281e856f4bd5b2f64ff4ffac0659",
    pageSize: "100",
    sortBy: `popularity`,
    endpoint: "everything",
};

//classes
const date = new Date();
const api = new NewsApi(config);
const searchForm = new SearchInput(inputSearch);
const dataStorage = new DataStorage();

//functions
const createCardFunction = (...args) => {
    const newsCard = new NewsCard(...args, resultsTemplate);
    //console.log(resultsTemplate)
    return newsCard.create();
};

const newsCardList = new NewsCardList(resultsItems, api, createCardFunction, preloader, notFound, resultsButton);

// const articles = (keyword) => {
//     api.getNews(keyword).then((res) => {
//         res.forEach((article) => {
//             console.log(article);
//             if (article !== undefined) {
//                 // const newsCard = new NewsCard(article.publishedAt, article.source, article.urlToImage, article.title, article.description, article.url, resultsTemplate);
//                 // return newsCard.create();
//                 const newsCardList = new NewsCardList(resultsItems, api, createCardFunction(article));
//                 return newsCardList.render(keyword);
//             }
//         });
//     });
// const articles = await api.getNews(keyword);
// console.log(articles);
// articles
//     ? articles.forEach((article) => {
//           // console.log(article);

//           const newsCard = new NewsCard(article, resultsTemplate);
//           return newsCard.create();
//           // const newsCardList = new NewsCardList(resultsItems, api, newsCard.create());
//           // newsCardList.render(keyword);
//       })
//     : console.log("Loading");
// };

// function lastRequest() {
//     if (dataStorage.getArticles() !== null) {
//         requestInput.value = dataStorage.getRequest();
//         cardsContainer.innerHTML = "";
//         newsCardList.render(dataStorage.getArticles());
//         titleResult.classList.remove("section-result__title-container_hidden");
//     } else {
//         //активизируем поиск новостей по кнопке сабмит на форме
//         newsSearchForm.addEventListener("submit", functionValidity);
//     }
// }

// lastRequest();

function functionValidity(event) {
    event.preventDefault(event);
    if (searchForm.inputValidateSpace(errorForm) === true || searchForm.checkInputValidity(errorForm) === false) {
        searchForm.checkInputValidity(errorForm);
        searchForm.inputValidateSpace(errorForm);
        preloader.classList.remove("hidden");
        const keyword = inputSearch.value;
        api.getNews(keyword).then((data) => {
            if (data.length !== 0) {
                dataStorage.setData(data);
                dataStorage.getData();
                dataStorage.setRequest(inputSearch);

                preloader.classList.add("hidden");
                results.classList.add("results__active");
                resultsButton.classList.remove("hidden");
                return newsCardList.render(keyword);
            } else {
                inputSearch.removeAttribute("disabled");
                resultsButton.removeAttribute("disabled");
            }

            inputSearch.value = "";
        });
    } else {
        searchForm.checkInputValidity(errorForm);
        searchForm.inputValidateSpace(errorForm);
    }

    // if (searchForm.checkInputValidity(inputSearch, error)) {
    //     // ???
    //     preloader.classList.remove("hidden");
    //     resultsButton.setAttribute("disabled", "disabled");
    //     inputSearch.setAttribute("disabled", "disabled");
    //     api.getNews(keyword)
    //         .then((data) => {
    //             if (data.articles.length !== 0) {
    //                 dataStorage.setData(data);
    //                 dataStorage.getData();
    //                 dataStorage.setRequest(inputSearch);
    //                 preloader.classList.add("hidden");
    //                 resultsButton.removeAttribute("disabled");
    //                 inputSearch.removeAttribute("disabled");
    //                 resultsItems.innerHTML = "";
    //                 newsCardList.render(data.articles);
    //                 titleResult.classList.remove("section-result__title-container_hidden");
    //             } else {
    //                 titleResult.classList.add("section-result__title-container_hidden");
    //                 notFound.classList.remove("section-notfound_hidden");
    //                 inputSearch.removeAttribute("disabled");
    //                 resultsButton.removeAttribute("disabled");
    //                 resultsButton.classList.add("hidden");
    //                 return;
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(`ошибка запроса ${err}`);
    //         })
    //         .finally(() => {
    //             preloader.classList.add("hidden");
    //         });
    // } else {
    //     resultsItems.innerHTML = "";
    //     results.classList.add("hidden");
    //     notFound.classList.add("hidden");
    //     resultsButton.classList.add("hidden");
    // }
    // cardsContainer.innerHTML = "";
    // results.classList.add("hidden");
    // notFound.classList.add("hidden");
}

// inputSearch.addEventListener("focus", () => {
//     inputSearch.reset(errorTheme);
// });

//listeners

newsSearchForm.addEventListener("submit", functionValidity);

/*
  const createCardFunction = (articles) => {
    const card = new NewsCard(articles, resultsTemplate);
    //console.log(resultsTemplate)
    return card.create();
  };

  const cardList = new NewsCardList(
    resultsItems, api, createCardFunction, preloader, notFound, resultsButton
  );

  api
    .getNews(searchInput.value)
    .then(articles => renderCards(articles))
    .catch((err) => console.log(err));

   //listeners
   newsSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    results.classList.add('results__active');
    resultsItems.classList.add('results__items_active');
    cardList.render(searchInput.value)
    });*/
