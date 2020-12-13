import "../styles/style.css";
import NewsCardList from './components/NewsCardList';
import NewsCard from './components/NewsCard';
import NewsApi from './modules/NewsApi';

//constants
  const results = document.querySelector('.results');
  const resultsItems = document.querySelector('.results__items');
  const resultsTemplate = resultsItems.querySelector('#result-template').content.querySelector('.results__item');
  const resultsButton = document.querySelector('.results__button');
  const preloader = document.querySelector('.preloader');
  const notFound = document.querySelector('.not-found');
  const newsSearchForm = document.querySelector('.search__field');
  const searchInput = document.querySelector('.search__field-input');
  const config = {
   // baseURL: `${(NODE_ENV==='development')?'https://newsapi.org/v2/everything' : 'http://newsapi.org/v2/everything'}`,
  //baseURL: `${(NODE_ENV==='development')?'https://nomoreparties.co/news/v2/everything' : 'http://nomoreparties.co/news/v2/everything'}`,
    baseURL: `${(NODE_ENV==='development')?'https://news-api-v2.herokuapp.com/everything' : 'http://news-api-v2.herokuapp.com/everything'}`,
   //baseURL: 'https://nomoreparties.co/news/v2/everything',
    apiKey: '3d91c7e0759740f5a4f6c1f566841425',
    pageSize: '100',
    sortBy: `popularity`,
  }

  //classes
  const date = new Date();
  const api = new NewsApi(config);

  //functions



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
    });
