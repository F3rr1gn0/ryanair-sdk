import { AirportShort } from './types.js';
import { get } from '../client/index.js';
import { GEOLOCATION_API } from '../endpoints.js';

/**
 * Returns information about the closest airport based on the user's IP address.
 */
export const getClosest = async () => {
  const url = `${GEOLOCATION_API}/defaultAirport`;
  const data = await get(url);
  return AirportShort.parse(data);
};
