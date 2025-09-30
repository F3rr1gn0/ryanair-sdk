import { z } from 'zod';
import { AirportShort } from './types.js';
import { get } from '../client/index.js';
import { GEOLOCATION_API } from '../endpoints.js';

/**
 * Retrieves a list of all nearby airports.
 */
export const getNearby = async (locale = 'en-gb') => {
  const url = `${GEOLOCATION_API}/nearbyAirports?market=${locale}`;
  const data = await get(url);
  return z.array(AirportShort).parse(data);
};
