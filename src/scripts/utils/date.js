import {MONTHS} from "../constants/MONTHS";

export const formatDate = (date) => {
    const newDate = new Date(date);
    const formatedDate = `${newDate.getDate()} ${MONTHS[newDate.getMonth()]}, ${newDate.getFullYear()}`;
    return formatedDate;
};

export const formatDateforStatistic = (date) => {
    const newDate = new Date(date);
    const formatedDate = `${newDate.getDate()} ${MONTHS[newDate.getMonth()]}`;
    return formatedDate;
};

//даты для запроса в NewsApi
const currentDate = new Date();
const weekAgoDate = new Date();
weekAgoDate.setDate(currentDate.getDate() - 7);

export const dateMin = `${weekAgoDate.getFullYear()}-${weekAgoDate.getMonth() + 1}-${weekAgoDate.getDate()}`;
export const dateMax = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
