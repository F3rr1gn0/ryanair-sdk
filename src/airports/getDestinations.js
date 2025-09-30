import { z } from 'zod';
import { Destination } from './types.js';
import { get } from '../client/index.js';
import { VIEWS_API } from '../endpoints.js';

/**
 * Returns a list of available destinations from an airport.
 */
export const getDestinations = async (code) => {
  const url = `${VIEWS_API}/searchWidget/routes/en/airport/${code}`;
  const data = await get(url);
  return z.array(Destination).parse(data);
};
