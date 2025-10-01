import { describe, it, expect, vi, beforeEach } from 'vitest';

const outboundFare = {
  day: '2024-05-01',
  arrivalDate: null,
  departureDate: null,
  price: {
    value: 25,
    valueMainUnit: '25',
    valueFractionalUnit: '00',
    currencyCode: 'EUR',
    currencySymbol: '€',
  },
  soldOut: false,
  unavailable: false,
};

const inboundFare = {
  day: '2024-05-10',
  arrivalDate: null,
  departureDate: null,
  price: {
    value: 30,
    valueMainUnit: '30',
    valueFractionalUnit: '00',
    currencyCode: 'EUR',
    currencySymbol: '€',
  },
  soldOut: false,
  unavailable: false,
};

const laterInboundFare = {
  ...inboundFare,
  day: '2024-05-12',
  price: { ...inboundFare.price, value: 20 },
};

const cartesianMock = vi.fn();

vi.mock('fast-cartesian', () => ({
  default: cartesianMock,
}));

vi.mock('../../src/fares/findDailyFaresInRange.js', () => ({
  findDailyFaresInRange: vi.fn(),
}));

let findDailyFaresInRange;
let findCheapestRoundTrip;
let testingHelpers;

const setupCartesian = () => {
  cartesianMock.mockImplementation(([outbounds, inbounds]) =>
    outbounds.flatMap((o) => inbounds.map((i) => [o, i])),
  );
};

describe('fares.findCheapestRoundTrip', () => {
  beforeEach(async () => {
    vi.resetModules();
    ({ findDailyFaresInRange } = await import('../../src/fares/findDailyFaresInRange.js'));
    ({ findCheapestRoundTrip, __testing__: testingHelpers } = await import(
      '../../src/fares/findCheapestRoundTrip.js',
    ));
    cartesianMock.mockClear();
    setupCartesian();
    findDailyFaresInRange.mockReset();
  });

  it('returns cheapest valid round trips sorted by price', async () => {
    findDailyFaresInRange.mockResolvedValueOnce([outboundFare, { price: null }]);
    findDailyFaresInRange.mockResolvedValueOnce([laterInboundFare, inboundFare]);

    const result = await findCheapestRoundTrip('DUB', 'BER', '2024-05-01', '2024-05-20', 'EUR', 5);

    expect(result).toEqual([
      {
        departure: outboundFare,
        return: laterInboundFare,
        price: 45,
      },
      {
        departure: outboundFare,
        return: inboundFare,
        price: 55,
      },
    ]);
    expect(cartesianMock).toHaveBeenCalledTimes(1);
  });

  it('filters out invalid return dates', async () => {
    findDailyFaresInRange.mockResolvedValueOnce([outboundFare]);
    findDailyFaresInRange.mockResolvedValueOnce([
      { ...inboundFare, day: '2024-04-30' },
      laterInboundFare,
    ]);

    const [result] = await findCheapestRoundTrip('AAA', 'BBB', '2024-05-01', '2024-05-20');
    expect(result).toEqual({
      departure: outboundFare,
      return: laterInboundFare,
      price: 45,
    });
  });

  it('reuses the cartesian helper after the first load', async () => {
    const first = await testingHelpers.loadCartesian();
    const second = await testingHelpers.loadCartesian();
    expect(second).toBe(first);
  });
});
