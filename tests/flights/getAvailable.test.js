import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/client/index.js', () => ({
  get: vi.fn(),
}));

const { get } = await import('../../src/client/index.js');
const { getAvailable } = await import('../../src/flights/getAvailable.js');

const sampleResponse = {
  termsOfUse: 'https://example.com/terms',
  currency: 'EUR',
  currPrecision: 2,
  routeGroup: 'group',
  tripType: 'oneWay',
  upgradeType: 'standard',
  trips: [
    {
      origin: 'BER',
      originName: 'Berlin',
      destination: 'KRK',
      destinationName: 'Krakow',
      routeGroup: 'group',
      tripType: 'oneWay',
      upgradeType: 'standard',
      dates: [
        {
          dateOut: '2024-05-01T10:00:00.000',
          flights: [
            {
              faresLeft: 5,
              flightKey: 'key',
              infantsLeft: 2,
              regularFare: {
                fareKey: 'fare',
                fares: [
                  {
                    type: 'ADT',
                    amount: 19.99,
                    count: 1,
                    hasDiscount: false,
                    publishedFare: 19.99,
                    discountInPercent: 0,
                    hasPromoDiscount: false,
                    discountAmount: 0,
                    hasBogof: false,
                  },
                ],
              },
              operatedBy: 'RYR',
              segments: [
                {
                  segmentNr: 1,
                  origin: 'BER',
                  destination: 'KRK',
                  flightNumber: 'FR101',
                  time: ['2024-05-01T10:00:00.000'],
                  timeUTC: ['2024-05-01T08:00:00.000Z'],
                  duration: '02:00',
                },
              ],
              flightNumber: 'FR101',
              time: ['2024-05-01T10:00:00.000'],
              timeUTC: ['2024-05-01T08:00:00.000Z'],
              duration: '02:00',
            },
          ],
        },
      ],
    },
  ],
  serverTimeUTC: '2024-01-01T00:00:00.000Z',
};

describe('flights.getAvailable', () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue(sampleResponse);
  });

  it('merges defaults with params and validates response', async () => {
    const result = await getAvailable({ Origin: 'DUB', Destination: 'MAD' });

    expect(get).toHaveBeenCalledTimes(1);
    const calledUrl = get.mock.calls[0][0];
    expect(calledUrl).toContain('Origin=DUB');
    expect(calledUrl).toContain('Destination=MAD');
    expect(calledUrl).toContain('RoundTrip=false');
    expect(result.trips[0].dates[0].flights[0].regularFare.fares[0].amount).toBe(19.99);
  });

  it('throws when invalid params are provided', async () => {
    await expect(getAvailable({ Origin: 'INVALID' })).rejects.toThrow();
  });
});
