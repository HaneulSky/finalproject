import "../../styles/analytics.css";
import Statistics from "../components/Statistics";
import DataStorage from "../modules/DataStorage";

const chartTimeResults = document.querySelector(".chart__time-container");
const chartLineResults = document.querySelector(".chart__columns");
const timeTemplate = chartTimeResults.querySelector("#chart-time-template").content.querySelector(".chart__time");
const lineTemplate = chartLineResults.querySelector("#chart-time-column").content.querySelector(".chart__column");
const dataStorage = new DataStorage();
const articles = dataStorage.getData();
const keyword = dataStorage.getRequest();

const statistics = new Statistics(timeTemplate, lineTemplate, chartTimeResults, chartLineResults);
const keywordSpan = document.querySelector("#keyword");
const countNews = document.querySelector(".count");

keywordSpan.textContent = keyword;
countNews.textContent = articles.length;

statistics.getStatistic(articles);
