import { describe, it, expect, vi, beforeEach } from 'vitest';

const fareWithPrice = (value) => ({
  day: '2024-01-01',
  arrivalDate: null,
  departureDate: null,
  price: {
    value,
    valueMainUnit: String(value),
    valueFractionalUnit: '00',
    currencyCode: 'EUR',
    currencySymbol: '€',
  },
  soldOut: false,
  unavailable: false,
});

vi.mock('../../src/fares/getCheapestPerDay.js', () => ({
  getCheapestPerDay: vi.fn(),
}));

const { getCheapestPerDay } = await import('../../src/fares/getCheapestPerDay.js');
const { findDailyFaresInRange } = await import('../../src/fares/findDailyFaresInRange.js');

describe('fares.findDailyFaresInRange', () => {
  beforeEach(() => {
    getCheapestPerDay.mockReset();
  });

  it('fetches every month in range and filters null prices', async () => {
    getCheapestPerDay
      .mockResolvedValueOnce({ outbound: { fares: [fareWithPrice(10), { price: null }] } })
      .mockResolvedValueOnce({ outbound: { fares: [fareWithPrice(20)] } })
      .mockResolvedValueOnce({ outbound: { fares: [fareWithPrice(30)] } });

    const fares = await findDailyFaresInRange('DUB', 'BER', '2024-01-15', '2024-03-20');

    expect(fares).toHaveLength(3);
    expect(getCheapestPerDay).toHaveBeenCalledTimes(3);
    expect(getCheapestPerDay.mock.calls[0][2]).toBe('2024-01-01');
    expect(getCheapestPerDay.mock.calls[1][2]).toBe('2024-02-01');
    expect(getCheapestPerDay.mock.calls[2][2]).toBe('2024-03-01');
  });
});
