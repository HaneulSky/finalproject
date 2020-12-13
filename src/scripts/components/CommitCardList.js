export default class CommitCardList {
  constructor(container, api, createCardFunction){
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  addCard(params) {
    const card = this.createCardFunction(params, this.template, this.api);

    this.container.appendChild(card.create());
  }

  render() {
    this.api
      .getCommits()
      .then((res) => {
        this.commits = res.commits;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
