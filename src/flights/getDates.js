import { z } from 'zod';
import { get } from '../client/index.js';
import { StrDate } from '../date.types.js';
import { FARE_FINDER_API } from '../endpoints.js';

/**
 * Returns a list of available flight dates between two airports.
 */
export const getDates = async (from, to) => {
  const url = `${FARE_FINDER_API}/oneWayFares/${from}/${to}/availabilities`;
  const data = await get(url);
  return z.array(StrDate).parse(data);
};
