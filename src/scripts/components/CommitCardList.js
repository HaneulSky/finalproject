export default class CommitCardList {
    constructor(container, api, createCardFunction) {
        this.container = container;
        this.api = api;
        this.createCardFunction = createCardFunction;
    }

    _addCommit(commit) {
        const card = this.createCardFunction(commit);
        return this.container.appendChild(card);
    }

    render() {
        this.api
            .getCommits()
            .then((commits) => {
                commits.forEach((commit) => {
                    this._addCommit(commit);
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
