import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/airports/getDestinations.js', () => ({
  getDestinations: vi.fn(),
}));

const { getDestinations } = await import('../../src/airports/getDestinations.js');
const { findRoutes } = await import('../../src/airports/findRoutes.js');

describe('airports.findRoutes', () => {
  beforeEach(() => {
    getDestinations.mockReset();
  });

  it('returns direct route when destination is reachable', async () => {
    getDestinations.mockResolvedValueOnce([
      { arrivalAirport: { code: 'DUB' } },
    ]);
    getDestinations.mockResolvedValueOnce([
      { arrivalAirport: { code: 'BER' } },
    ]);

    await expect(findRoutes('BER', 'DUB')).resolves.toEqual([
      ['BER', 'DUB'],
    ]);
  });

  it('returns one-stop routes when direct is not available', async () => {
    getDestinations.mockResolvedValueOnce([
      { arrivalAirport: { code: 'STN' } },
      { arrivalAirport: { code: 'LGW' } },
    ]);
    getDestinations.mockResolvedValueOnce([
      { arrivalAirport: { code: 'LGW' } },
      { arrivalAirport: { code: 'KRK' } },
    ]);

    await expect(findRoutes('DUB', 'BER')).resolves.toEqual([
      ['DUB', 'LGW', 'BER'],
    ]);
  });
});
