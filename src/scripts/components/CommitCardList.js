export default class CommitCardList {
    constructor(container, api, createCardFunction) {
        this.container = container;
        this.api = api;
        this.createCardFunction = createCardFunction;
        this.swiper = document.querySelector(".github__swiper");
    }

    addCommit(commit) {
        const card = this.createCardFunction(commit);
        return this.container.appendChild(card);
    }

    render() {
        this.api
            .getCommits()
            .then((commits) => {
                commits.forEach((commit) => {
                    console.log("commit", commit.author.avatar_url);
                    this.addCommit(commit);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

/* commit.committer.name;
commit.committer.email;
commit.committer.date;
commit.message;
author.avatar_url. */
