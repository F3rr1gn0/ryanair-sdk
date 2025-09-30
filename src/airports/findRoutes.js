import { z } from 'zod';
import { getDestinations } from './getDestinations.js';
import { IataCode } from './types.js';

const getIataCodes = (destinations) => {
  return new Set(destinations.map((airport) => airport.arrivalAirport.code));
};

/**
 * Finds available routes between two airports.
 */
export const findRoutes = async (from, to) => {
  const [departureDestinations, arrivalDestinations] = await Promise.all([
    getDestinations(from),
    getDestinations(to),
  ]);
  const departureConnectionsCodes = getIataCodes(departureDestinations);
  const arrivalConnectionsCodes = getIataCodes(arrivalDestinations);
  if (departureConnectionsCodes.has(to)) {
    return [[from, to]];
  }
  let matchingCodes = [...departureConnectionsCodes].filter((code) =>
    arrivalConnectionsCodes.has(code),
  );
  matchingCodes = z.array(IataCode).parse(matchingCodes);
  return matchingCodes.map((code) => [from, code, to]);
};

export const __testing__ = {
  getIataCodes,
};
