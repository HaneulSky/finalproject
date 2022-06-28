import {formatDateforStatistic} from "../utils/date";

export default class Statistics {
    constructor(templateTime, templateLine, containerTime, containerLine) {
        this.templateTime = templateTime;
        this.templateLine = templateLine;
        this.containerTime = containerTime;
        this.containerLine = containerLine;
    }

    createItem(timeColumn, lineColumn, content) {
        timeColumn.innerHTML += `<p class="chart__time">${content.date}</p>`;
        lineColumn.innerHTML += `<div class="chart__column">${content.count}</div>`;
        const chartColumns = document.querySelectorAll(".chart__column");
        const chartColumn = document.querySelector(".chart__columns")
        const columnWidth = +window.getComputedStyle(chartColumn).width.split("").slice(0, -2).join("");
        chartColumns.forEach((col) => {
            col.style.width += `${(columnWidth*content.count)/100}px`;
        });
    }

    getStatistic(articles) {
        const dates = [];
        const statistic = [];
        const counts = [];
        const sortDates = {};
        const objDates = {};
        const itemTimeTemplate = this.templateTime.cloneNode(true);

        articles.forEach((article) => {
            return dates.push(formatDateforStatistic(article.publishedAt));
        });

        for (let i in dates.sort()) {
            if (counts[dates[i]]) {
                counts[dates[i]]++;
            } else {
                counts[dates[i]] = 1;
            }
        }

        let j = 0;
        for (let i in counts) {
            statistic[j++] = {
                date: i,
                count: counts[i],
            };
        }

        statistic.forEach((item) => {
            this.createItem(this.containerTime, this.containerLine, item);
        });
    }
}
