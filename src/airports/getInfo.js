import { Airport } from './types.js';
import { get } from '../client/index.js';
import { VIEWS_API } from '../endpoints.js';

/**
 * Returns information about an airport.
 */
export const getInfo = async (code) => {
  const url = `${VIEWS_API}/5/airports/en/${code}`;
  const data = await get(url);
  return Airport.parse(data);
};
