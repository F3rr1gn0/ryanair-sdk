/**
 * Converts an angle from degrees to radians.
 */
const toRadians = (degrees) => degrees * (Math.PI / 180);

/**
 * Returns the distance along the surface of the earth between two points.
 *
 * Uses the haversine formula.
 */
export const distance = (start, end, radius = 6371e3) => {
  const φ1 = toRadians(start.latitude);
  const λ1 = toRadians(start.longitude);
  const φ2 = toRadians(end.latitude);
  const λ2 = toRadians(end.longitude);
  const Δφ = φ2 - φ1;
  const Δλ = λ2 - λ1;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * c;
};
