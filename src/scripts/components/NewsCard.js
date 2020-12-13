export default class NewsCard {
  constructor(articles, resultsTemplate){
    this.publishedAt =articles.publishedAt;
    this.name = articles.name;
    this.urlToImage = articles.urlToImage;
    this.title = articles.title;
    this.description = articles.description;
    this.url = articles.url;
    this.resultsTemplate = resultsTemplate;
   // this.templateItems = document.createElement('div');
   // this.templateItems.append(resultsTemplate.content.cloneNode(true));
   // this.template = this.templateItems.firstElementChild;
  }

  create() {
    const newItem = this.resultsTemplate.cloneNode(true);
    const itemImage = newItem.querySelector('.results__item-image');
    const itemTime = newItem.querySelector('.results__item-time');
    const itemTitle = newItem.querySelector('.results__item-title');
    const itemText = newItem.querySelector('.results__item-text');
    const itemAgency = newItem.querySelector('.results__item-agency-info');
    const itemLink = newItem.querySelector('.results__link');
    itemLink.setAttribute('href', this.url);
    itemTitle.textContent = this.title;
    itemText.textContent = this.description;
    itemTime.textContent = this.publishedAt;
    itemAgency.textContent = this.name;
    itemImage.src = `url(${this.urlToImage})`;

    this.itemElement = newItem;

    return this.itemElement;
  }
}
