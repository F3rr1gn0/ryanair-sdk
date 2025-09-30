import { addDays, addMonths, eachMonthOfInterval, format, isAfter } from 'date-fns';

/**
 * Calculates the date for the next day (formatted as 'YYYY-MM-DD').
 */
export const tomorrow = () => {
  const currentDate = new Date();
  const tomorrowDate = addDays(currentDate, 1);
  return format(tomorrowDate, 'yyyy-MM-dd');
};

/**
 * Calculates the date for the next month (formatted as 'YYYY-MM-DD').
 */
export const nextMonth = () => {
  const currentDate = new Date();
  const nextMonthDate = addMonths(currentDate, 1);
  return format(nextMonthDate, 'yyyy-MM-dd');
};

/**
 * Returns true if the first ISO-formatted date is after the second ISO-formatted date.
 */
export const isAfterISO = (firstDate, secondDate) => {
  const first = new Date(firstDate);
  const second = new Date(secondDate);
  return isAfter(first, second);
};

/**
 * Returns an array of the first day of each month in a given date range (formatted as 'YYYY-MM-01').
 */
export const getFirstDayOfEachMonthInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) {
    throw new RangeError('Invalid date range. The start date must be before the end date.');
  }
  return eachMonthOfInterval({
    start,
    end,
  }).map((d) => format(d, 'yyyy-MM-01'));
};
