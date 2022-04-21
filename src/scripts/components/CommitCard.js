import {formatDate} from "../utils/date";

export default class CommitCard {
    constructor(commit, template) {
        this._avatarUrl = commit.author.avatar_url;
        this._name = commit.commit.committer.name;
        this._email = commit.commit.committer.email;
        this._date = commit.commit.committer.date;
        this._message = commit.commit.message;
        this.template = template;
    }

    create() {
        const newItem = this.template.cloneNode(true);
        const itemImage = newItem.querySelector(".github__item-profile_avatar");
        const itemTime = newItem.querySelector(".github__item-time");
        const itemTitle = newItem.querySelector(".github__item-profile_name");
        const itemText = newItem.querySelector(".github__item-commit");
        const itemEmail = newItem.querySelector(".github__item-profile_email");

        itemTime.textContent = formatDate(this._date);
        itemTitle.textContent = this._name;
        itemText.textContent = this._message;
        itemEmail.textContent = this._email;
        itemImage.style.backgroundImage = `url(${this._avatarUrl})`;

        this.itemElement = newItem;
        return this.itemElement;
    }
}
