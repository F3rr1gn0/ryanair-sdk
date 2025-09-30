import { describe, it, expect } from 'vitest';
import { extractCoordinates } from '../../src/helpers/location.js';

const airportSample = {
  name: 'Berlin Brandenburg',
  seoName: 'berlin-brandenburg',
  aliases: [],
  base: false,
  coordinates: { latitude: 52.3667, longitude: 13.5033 },
  timeZone: 'Europe/Berlin',
  code: 'BER',
  city: { name: 'Berlin', code: 'BER', macCode: undefined },
  macCity: undefined,
  region: { name: 'Berlin', code: 'BER' },
  country: {
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    defaultAirportCode: 'BER',
  },
};

describe('location helpers', () => {
  it('extracts coordinates from airport objects', () => {
    expect(extractCoordinates(airportSample)).toEqual({
      latitude: 52.3667,
      longitude: 13.5033,
    });
  });

  it('extracts coordinates from raw coordinate objects', () => {
    const coords = { latitude: 40.4168, longitude: -3.7038 };
    expect(extractCoordinates(coords)).toEqual(coords);
  });

  it('throws for unsupported input', () => {
    expect(() => extractCoordinates({ foo: 'bar' })).toThrow(
      /Unable to extract coordinates/,
    );
  });
});
