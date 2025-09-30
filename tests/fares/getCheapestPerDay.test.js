import { describe, it, expect, vi, beforeEach } from 'vitest';

const sampleFare = {
  day: '2024-05-01',
  arrivalDate: null,
  departureDate: null,
  price: {
    value: 19.99,
    valueMainUnit: '19',
    valueFractionalUnit: '99',
    currencyCode: 'EUR',
    currencySymbol: '€',
  },
  soldOut: false,
  unavailable: false,
};

vi.mock('../../src/client/index.js', () => ({
  get: vi.fn(),
}));

const { get } = await import('../../src/client/index.js');
const { getCheapestPerDay } = await import('../../src/fares/getCheapestPerDay.js');

describe('fares.getCheapestPerDay', () => {
  beforeEach(() => {
    get.mockReset();
  });

  it('hits fare finder endpoint and validates response', async () => {
    get.mockResolvedValue({
      outbound: {
        fares: [sampleFare],
        minFare: sampleFare,
        maxFare: sampleFare,
      },
    });

    const result = await getCheapestPerDay('DUB', 'BER', '2024-05-01', 'EUR');

    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('/oneWayFares/DUB/BER/cheapestPerDay'),
    );
    expect(result.outbound.fares[0]).toEqual(sampleFare);
  });
});
