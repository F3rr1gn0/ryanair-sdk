import { z } from 'zod';
import { Airport, AirportV3 } from './types.js';
import { get } from '../client/index.js';
import { VIEWS_API } from '../endpoints.js';

/**
 * Retrieves a list of all active airports.
 */
export const getActive = async () => {
  const url = `${VIEWS_API}/5/airports/en/active`;
  const data = await get(url);
  return z.array(Airport).parse(data);
};

/**
 * Retrieves a list of all active airports using API v3 (legacy endpoint).
 */
export const getActiveV3 = async () => {
  const url = `${VIEWS_API}/3/airports/en/active`;
  const data = await get(url);
  return z.array(AirportV3).parse(data);
};
