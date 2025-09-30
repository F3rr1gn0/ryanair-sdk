import { getCheapestPerDay } from './getCheapestPerDay.js';
import { getFirstDayOfEachMonthInRange } from '../helpers/date.js';

/**
 * Find daily fares for a given origin and destination airport, within a specified date range.
 */
export const findDailyFaresInRange = async (from, to, startDate, endDate, currency = 'EUR') => {
  const months = getFirstDayOfEachMonthInRange(startDate, endDate);
  const requests = months.map((month) => getCheapestPerDay(from, to, month, currency));
  const result = await Promise.all(requests);
  return result.flatMap(({ outbound: { fares } }) => fares.filter(({ price }) => price !== null));
};
