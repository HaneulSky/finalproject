import {formatDate} from "../utils/date";

export default class NewsCardList {
    constructor(container, api, createCardFunction, preloader, notfound, resultButton) {
        this.container = container;
        this.api = api;
        this.createCardFunction = createCardFunction;
        this.preloader = preloader;
        this.notfound = notfound;
        this.resultButton = resultButton;
        this.itemPerPage = 3;
        this.begun = 0;
        this.start = this.begun;
    }

    addCard(article) {
        const card = this.createCardFunction(formatDate(article.publishedAt), article.source.name, article.urlToImage, article.title, article.description, article.url);
        return this.container.appendChild(card);
    }

    notFound() {
        this.notfound.classList.add("not-found_active");
    }

    preLoader() {
        this.preloader.classList.toggle("preloader_active");
    }

    render(keyword) {
        this.api.getNews(keyword).then((articles) => {
            if (articles.length === 0) {
                this.notFound();
                this.preLoader();
            } else {
                this.preLoader();
                this.moreNewsButtonFuction(articles);
                this.moreNews(articles);
                this.container.classList.add("results__items_active");
                this.resultButton.classList.remove("hidden");
            }
        });
    }

    moreNews(articles) {
        const items = articles.slice(0, this.begun + 3);
        if (items.length === 0) {
            console.log("nothing to show");
            this.resultButton.classList.add("hidden");
        } else {
            for (const article of items) {
                this.addCard(article);
            }
        }
    }

    moreNewsButtonFuction(articles) {
        this.resultButton.addEventListener("click", () => {
            this.begun += 3;
            this.moreNews(articles.slice(this.begun, this.begun + 3));
        });
    }
}
/*
    render(keyword){
      this.preLoader();
      this.api.getNews(keyword)
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
*/

// render(news) {
//     this.firstRowNews = news;

//     this.moreNews();

//     if (this.firstRowNews.length > 0) {
//         this.resultButton.classList.remove("hidden");
//         this.resultButton.addEventListener("click", () => {
//             if (this.firstRowNews.length > 3) {
//                 this.showMore(this.firstRowNews, button);
//             } else {
//                 button.classList.add("hidden");
//                 this.showMore(this.firstRowNews, button);
//             }
//         });
//     } else {
//         button.classList.add("hidden");
//     }
// }

// moreNews() {
//     this.firstRowNews.slice(0, this.itemPerPage).forEach((item) => {
//         this.addCard({date: item.publishedAt, text: item.description, title: item.title, infoagency: item.source.name, link: item.urlToImage, url: item.url});
//     });

//     this.firstRowNews = this.firstRowNews.slice(this.itemPerPage);
// }
/*
  notFound() {
    this.notfound.classList.add('not-found_active');
  }


  preLoader() {
    this.preloader.classList.toggle('preloader_active')
  }*/
/*
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
  }*/
/*
            this.api
            .getNews(keyword)
            .then((res) =>
                res.forEach((item) => {
                    this.addCard(item);
                })
            )
            .catch((err) => {
                console.log(err);
            });

  moreNewsButtonFuction(news, keyword) {
    this.resultButton.addEventListener('click', () => {
      this.begun += 3;
      this.moreNews(news, keyword);
    })
  }*/
