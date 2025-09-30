import { describe, it, expect } from 'vitest';
import { distance } from '../../src/helpers/geodesy.js';

describe('geodesy.distance', () => {
  it('computes haversine distance between two points', () => {
    const london = { latitude: 51.5074, longitude: -0.1278 };
    const paris = { latitude: 48.8566, longitude: 2.3522 };
    const result = distance(london, paris);
    expect(result).toBeGreaterThan(340_000);
    expect(result).toBeLessThan(350_000);
  });
});
