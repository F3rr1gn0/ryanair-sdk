import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/client/index.js', () => ({
  get: vi.fn(),
}));

const { get } = await import('../../src/client/index.js');
const { getDates } = await import('../../src/flights/getDates.js');

describe('flights.getDates', () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue(['2024-05-01', '2024-05-02']);
  });

  it('calls endpoint and returns ISO dates', async () => {
    const result = await getDates('DUB', 'BER');
    expect(get).toHaveBeenCalledWith(
      expect.stringContaining('/oneWayFares/DUB/BER/availabilities'),
    );
    expect(result).toEqual(['2024-05-01', '2024-05-02']);
  });

  it('rejects invalid API response', async () => {
    get.mockResolvedValue(['not-a-date']);
    await expect(getDates('DUB', 'BER')).rejects.toThrow();
  });
});
