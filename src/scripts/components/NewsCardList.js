export default class NewsCardList {
  constructor (container, api, createCardFunction){
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  render() {
    this.api
      .getItems()
      .then((res) => {
        res.forEach((item) => {
          this.addCard(item.name, item.link);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
