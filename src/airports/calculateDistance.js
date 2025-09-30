import { distance } from '../helpers/geodesy.js';
import { extractCoordinates } from '../helpers/location.js';

/**
 * Calculates the total distance between consecutive locations.
 */
export const calculateDistance = (locations) => {
  if (locations.length < 2) {
    return 0;
  }
  let totalDistance = 0;
  locations.reduce((previous, current) => {
    const p1 = extractCoordinates(previous);
    const p2 = extractCoordinates(current);
    totalDistance += distance(p1, p2);
    return current;
  });
  return totalDistance;
};
