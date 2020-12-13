//imports
import "../../styles/about.css";
import "../components/CommitCard.js";
import GithubApi from "../modules/GithubApi";
import CommitCard from "../components/CommitCard";
import CommitCardList from "../components/CommitCardList";
import Swiper, { Navigation, Pagination } from 'swiper';
import {SWIPER_CONFIG} from "../constants/SWIPER_CONFIG";

//constants
const githubItems = document.querySelector('.github__items');
const githubTemplate = githubItems.querySelector("#github-template").content.querySelector(".github__item");
const config = {
  baseUrl: "https://api.github.com/repos/HaneulSky/finalproject/commits"
}

//classes
const githubApi = new GithubApi(config);
const cardList = new CommitCardList(githubItems, githubApi, createCardFunction);
//const commitCard = new CommitCard(githubItems, githubTemplate);

//настройки swiper
Swiper.use([Navigation, Pagination]);

function initSwiper() {
  new Swiper('.swiper__container', SWIPER_CONFIG);
}

//functions
function renderCards(){
  cardList.render(cardList);
  initSwiper;
}

const createCardFunction = (commitData) => {
  const card = new CommitCard(commitData, githubTemplate);

  return card.create();
};
 function init(){
    githubApi.getCommits()
    .then(commits => renderCards(commits))
    .catch((err) => console.log(err));
}

init();

