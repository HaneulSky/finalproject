export default class NewsCard {
  constructor(newsData, resultsTemplate){
    this.title = newsData.title;
    this.description = newsData.description;
    this.publishedAt =newsData.publishedAt;
    this.name = newsData.name;
    this.urlToImage = newsData.urlToImage;
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
    itemTitle.textContent = this.title;
    itemText.textContent = this.description;
    itemTime.textContent = date(this.publishedAt.slice(0, 10));
    itemAgency.textContent = this.name;
    itemImage.src = this.urlToImage;

    this.itemElement = newItem;
    this.addListeners();
    return this.itemElement;
  }
}
