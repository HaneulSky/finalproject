export default class CommitCardList {
  constructor(container, api, createCardFunction){
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
    this.list = document.querySelector('.github__swipper');
  }

  addCard(params) {
    const card = this.createCardFunction(params);

    this.container.appendChild(card);
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

  /*
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
}*/
