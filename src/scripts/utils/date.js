import { MONTHS } from '../constants/MONTHS';

export const dateFormat = (date) => {
  const toDate = new Date(date);
  const changedDate = `${toDate.getDate()} ${MONTHS[(toDate.getMonth() + 1 )]}, ${toDate.getFullYear()}`;
  return changedDate;
}

const toDate = new Date();
const fromDate = new Date();
fromDate.setDate(toDate.getDate() - 7);

export const weekAgoDate = `${fromDate.getFullYear()}-${(fromDate.getMonth() + 1)}-${fromDate.getDate()}`;
export const today = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;
