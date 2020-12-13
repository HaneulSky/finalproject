import { formatDate } from "../utils/date";

export default class NewsCardList {
  constructor (resultsItems, api, createCardFunction, preloader, notfound, resultButton){
    this.resultsItems = resultsItems;
    this.api = api;
    this.createCardFunction = createCardFunction;
    this.preloader = preloader;
    this.notfound = notfound;
    this.resultButton = resultButton;
    this.begun = 0;
  }

    // тут просто добавляем карточку, вызываем переданную функцию в конструктор
    addCard(params) {
      this.resultsItems.appendChild(this.createCardFunction().create(params.image, params.date, params.link, params.heading, params.text, params.source, params.keyword, params.id));
    }

  render(keyword) {
    this.preLoader();
    this.api
      .getNews(keyword)
      .then((res) => {
        this.news = res.articles;
         if(res.articles.length === 0){
           this.notFound();
           this.preLoader();
         } else {
          this.preLoader();
          this.moreNews(this.news, keyword);
          this.resultsItems.classList.add('results__items_active');
          this.resultButton.classList.remove('hidden');
        }
          this.moreNews(this.news, keyword);
      })
      .then(() => {
        this.resultsItems.classList.add('results__items_active');
        this.preLoader();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  notFound() {
    this.notfound.classList.add('not-found_active');
  }

  //загрузка прелоудера
  preLoader() {
    this.preloader.classList.toggle('preloader_active')
  }

  moreNews(news, keyword){
    const items = news.slice(this.start, (this.begun + 3));
    if (items.length === 0 ) {
      console.log('nothing to show')
    } else {
      for (const item of items) {
        this.addCard(
          item.urlToImage,
          formatDate(item.publishedAt),
          item.url,
          item.title,
          item.description,
          item.name,
          keyword,
          item.id);
      }
    }
  }

  moreNewsButtonFuction(news, keyword) {
    this.resultButton.addEventListener('click', () => {
      this.begun += 3;
      this.moreNews(news, keyword);
    })
  }


}
