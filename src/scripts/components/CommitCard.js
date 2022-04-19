import {formatDate} from "../utils/date";

export default class CommitCard {
    constructor(commit, template) {
        this.avatarUrl = commit.author.avatar_url;
        this.name = commit.commit.committer.name;
        this.email = commit.commit.committer.email;
        this.date = commit.commit.committer.date;
        this.message = commit.commit.message;
        this.template = template;
    }

    create() {
        const newItem = this.template.cloneNode(true);
        const itemImage = newItem.querySelector(".github__item-profile_avatar");
        const itemTime = newItem.querySelector(".github__item-time");
        const itemTitle = newItem.querySelector(".github__item-profile_name");
        const itemText = newItem.querySelector(".github__item-commit");
        const itemEmail = newItem.querySelector(".github__item-profile_email");

        itemTime.textContent = formatDate(this.date);
        itemTitle.textContent = this.name;
        itemText.textContent = this.message;
        itemEmail.textContent = this.email;
        itemImage.style.backgroundImage = `url(${this.avatarUrl})`;

        this.itemElement = newItem;
        return this.itemElement;
    }
}

// name, email, date, message
