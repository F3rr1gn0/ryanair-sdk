import { get } from '../client/index.js';
import { FARE_FINDER_API } from '../endpoints.js';
import { CheapestFares } from './types.js';

/**
 * Returns the cheapest one-way fares between two airports for a given month.
 */
export const getCheapestPerDay = async (from, to, startDate, currency = 'EUR') => {
  const url = `${FARE_FINDER_API}/oneWayFares/${from}/${to}/cheapestPerDay?outboundMonthOfDate=${startDate}&currency=${currency}`;
  const data = await get(url);
  return CheapestFares.parse(data);
};
