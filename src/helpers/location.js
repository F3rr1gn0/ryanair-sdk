import { Airport, Coordinates } from '../airports/types.js';

/**
 * Extracts the coordinates from an Airport or Coordinates object.
 *
 * @throws If unable to extract coordinates from the location.
 */
export const extractCoordinates = (location) => {
  const airport = Airport.safeParse(location);
  if (airport.success) {
    return airport.data.coordinates;
  }
  const coords = Coordinates.safeParse(location);
  if (coords.success) {
    return coords.data;
  }
  throw new Error(`Unable to extract coordinates from location: ${JSON.stringify(location)}`);
};
