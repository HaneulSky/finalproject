export default class NewsCard {
  constructor(newsData){
    this.title = newsData.title;
    this.description = newsData.description;
    this.publishedAt =newsData.publishedAt;
    this.name = newsData.sourse.name;
    this.urlToImage = newsData.urlToImage;
  }

  create() {
    const newItem = this.template.cloneNode(true);
    const itemImage = newItem.querySelector('.results__item-image');
    const itemTime = newItem.querySelector('.results__item-time');
    const itemTitle = newItem.querySelector('.results__item-title');
    const itemText = newItem.querySelector('.results__item-text');
    const itemAgency = newItem.querySelector('.results__item-agency-info');
    itemTitle.textContent = this.title;
    itemText.textContent = this.description;
    itemTime.textContent = this.publishedAt;
    itemAgency.textContent = this.name;
    itemImage.src = this.urlToImage;

    this.itemElement = newItem;
    this.addListeners();
    return this.itemElement;
}
}
