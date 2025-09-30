import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../../src/client/index.js', () => ({
  get: vi.fn(),
}));

const { get } = await import('../../src/client/index.js');
const { getActive, getActiveV3 } = await import('../../src/airports/getActive.js');
const { getClosest } = await import('../../src/airports/getClosest.js');
const { getDestinations } = await import('../../src/airports/getDestinations.js');
const { getNearby } = await import('../../src/airports/getNearby.js');
const { getInfo } = await import('../../src/airports/getInfo.js');
const { getSchedules } = await import('../../src/airports/getSchedules.js');

const airport = {
  name: 'Berlin Brandenburg',
  seoName: 'berlin-brandenburg',
  aliases: [],
  base: true,
  coordinates: { latitude: 52.3667, longitude: 13.5033 },
  timeZone: 'Europe/Berlin',
  code: 'BER',
  city: { name: 'Berlin', code: 'BER' },
  region: { name: 'Berlin', code: 'BER' },
  country: {
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    defaultAirportCode: 'BER',
  },
};

const airportV3 = {
  name: 'Berlin Brandenburg',
  seoName: 'berlin-brandenburg',
  aliases: [],
  base: true,
  coordinates: { latitude: 52.3667, longitude: 13.5033 },
  timeZone: 'Europe/Berlin',
  iataCode: 'BER',
  countryCode: 'DE',
  regionCode: 'BER',
  cityCode: 'BER',
  currencyCode: 'EUR',
  routes: [],
  seasonalRoutes: [],
  categories: [],
  priority: 1,
};

const airportShort = {
  code: 'BER',
  name: 'Berlin',
  aliases: [],
  city: { name: 'Berlin', code: 'BER' },
  country: { name: 'Germany', code: 'DE' },
  coordinates: { latitude: 52.5, longitude: 13.4 },
};

const destination = {
  arrivalAirport: airport,
  recent: false,
  seasonal: false,
  operator: 'RYR',
  tags: [],
};

const schedules = {
  BER: {
    firstFlightDate: '2024-01-01',
    lastFlightDate: '2024-12-31',
    months: 12,
    monthsFromToday: 0,
  },
};

describe('airports API wrappers', () => {
  beforeEach(() => {
    get.mockReset();
  });

  it('retrieves active airports from v5 endpoint', async () => {
    get.mockResolvedValue([airport]);
    const result = await getActive();
    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('/5/airports/en/active'),
    );
    expect(result[0].code).toBe('BER');
  });

  it('retrieves active airports from v3 endpoint', async () => {
    get.mockResolvedValue([airportV3]);
    const result = await getActiveV3();
    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('/3/airports/en/active'),
    );
    expect(result[0].iataCode).toBe('BER');
  });

  it('retrieves closest airport', async () => {
    get.mockResolvedValue(airportShort);
    const result = await getClosest();
    expect(result.code).toBe('BER');
  });

  it('retrieves nearby airports', async () => {
    get.mockResolvedValue([airportShort]);
    const result = await getNearby('en-gb');
    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('market=en-gb'),
    );
    expect(result).toHaveLength(1);
  });

  it('retrieves airport info', async () => {
    get.mockResolvedValue(airport);
    const result = await getInfo('BER');
    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('/5/airports/en/BER'),
    );
    expect(result.code).toBe('BER');
  });

  it('retrieves destinations for airport', async () => {
    get.mockResolvedValue([destination]);
    const result = await getDestinations('BER');
    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('/searchWidget/routes/en/airport/BER'),
    );
    expect(result[0].arrivalAirport.code).toBe('BER');
  });

  it('retrieves schedules and throws when response empty', async () => {
    get.mockResolvedValue(schedules);
    const result = await getSchedules('BER');
    expect(result.BER.months).toBe(12);

    get.mockResolvedValue({});
    await expect(getSchedules('BER')).rejects.toThrow('Response code 404 (Not Found)');
  });
});
