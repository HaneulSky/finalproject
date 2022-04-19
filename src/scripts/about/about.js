//imports
import "../../styles/about.css";
import "../components/CommitCard.js";
import GithubApi from "../modules/GithubApi";
import CommitCard from "../components/CommitCard";
import CommitCardList from "../components/CommitCardList";
import Swiper, {Navigation, Pagination} from "swiper";

//constants
const githubItems = document.querySelector(".github__items");
const githubTemplate = githubItems.querySelector("#github-template").content.querySelector(".github__item");
const config = {
    baseUrl: "https://api.github.com/repos/HaneulSky/finalproject/commits",
};

//classes
const githubApi = new GithubApi(config);

const createCardFunction = (...args) => {
    console.log(...args);
    const card = new CommitCard(...args, githubTemplate);

    return card.create();
};

const cardList = new CommitCardList(githubItems, githubApi, createCardFunction);

const mySwiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    observer: true,
    // observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

githubApi
    .getCommits()
    .then((data) => {
        console.log("commits", data);
        cardList.render();
        mySwiper.update();
    })
    .catch((error) => {
        console.log(error);
    });
