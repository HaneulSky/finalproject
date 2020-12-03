import "../styles/style.css";
import newsCardList from './components/NewsCardList';
import newsCard from './components/NewsCard';
import newsApi from './modules/NewsApi';

const module = (function () {
  const resultsItems = document.querySelector('.results__items');
  const template = resultsItems
    .querySelector("#result-template")
    .content.querySelector(".results__item");
  const resultsButton = document.querySelector('.results__button');
  const config = {
    baseURL: 'http://newsapi.org/v2/everything',
    apiKey: '3d91c7e0759740f5a4f6c1f566841425'
  }
  const date = new Date();
  const newsSearchForm = document.forms.search;
  const searchInput = newsSearchForm.elements.field;

  newsSearchForm.addEventListeners('submit', (event) => {
    event.preventDefault();
    resultsItems.classList.add('results_active');
    newsCardList.render(searchInput.value);
  })

})
