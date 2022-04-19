export default class NewsCard {
    constructor(publishedAt, source, urlToImage, title, description, url, resultsTemplate) {
        this.publishedAt = publishedAt;
        this.name = source.name;
        this.urlToImage = urlToImage;
        this.title = title;
        this.description = description;
        this.url = url;
        this.resultsTemplate = resultsTemplate;
    }

    create() {
        // лучше создать шаблон

        const newItem = this.resultsTemplate.cloneNode(true);
        const itemTitle = newItem.querySelector(".results__item-title");
        const itemText = newItem.querySelector(".results__item-text");
        const itemTime = newItem.querySelector(".results__item-time");
        const itemAgency = newItem.querySelector(".results__item-agency-info");
        const itemImage = newItem.querySelector(".results__item-image");
        const itemLink = newItem.querySelector(".results__link");

        itemTitle.textContent = this.title;
        itemText.textContent = this.description;
        itemTime.textContent = this.publishedAt;
        itemAgency.textContent = this.name;
        itemImage.src = this.urlToImage;
        itemLink.href = this.url;

        this.itemElement = newItem;

        newItem.addEventListener("click", () => {
            window.open(this.url);
        });

        return this.itemElement;
    }
}
