import { MONTHS } from '../constants/MONTHS';

export default class CommitCard {
  constructor(commitData, template){
    this.description = commitData.description;
    this.time = commitData.date;
    this.login = commitData.login;
    this.avatarUrl = commitData.avatarUrl;
    this.template = template;

  }

  create() {
    const newItem = this.template.cloneNode(true);
    const itemImage = newItem.querySelector('.github__item-profile_avatar');
    const itemTime = newItem.querySelector('.githun__item-time');
    const itemTitle = newItem.querySelector('.github__item-profile_name');
    const itemText = newItem.querySelector('.github__item-commit');
    const itemEmail = newItem.querySelector('.github__item-profile_email');

    const dateToRender = new Date(date);

    itemTitle.textContent = this.login;
    itemText.textContent = this.description;
    itemTime.textContent = `${dateToRender.getDate().toString()} ${getMonth(dateToRender, MONTHS)}, ${dateToRender.getFullYear()}`;;
    itemEmail.textContent = this.login;
    itemImage.src = this.avatarUrl;

    this.itemElement = newItem;
    return this.itemElement;
  }
}
