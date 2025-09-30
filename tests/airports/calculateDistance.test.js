import { describe, it, expect, vi } from 'vitest';
import * as helpers from '../../src/helpers/location.js';
import * as geodesy from '../../src/helpers/geodesy.js';
import { calculateDistance } from '../../src/airports/calculateDistance.js';

describe('airports.calculateDistance', () => {
  it('returns zero when fewer than two locations provided', () => {
    expect(calculateDistance([{}])).toBe(0);
  });

  it('sums distances between consecutive points', () => {
    const locations = [{ id: 1 }, { id: 2 }, { id: 3 }];
    vi.spyOn(helpers, 'extractCoordinates').mockImplementation((loc) => ({
      latitude: loc.id,
      longitude: loc.id,
    }));
    vi.spyOn(geodesy, 'distance').mockImplementation(() => 10);

    expect(calculateDistance(locations)).toBe(20);

    helpers.extractCoordinates.mockRestore();
    geodesy.distance.mockRestore();
  });
});
