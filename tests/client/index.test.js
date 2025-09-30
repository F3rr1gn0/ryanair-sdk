import { describe, it, expect, beforeEach, vi } from 'vitest';

const httpClient = vi.fn((url) => Promise.resolve({ url }));
const extendMock = vi.fn(() => httpClient);
const gotFn = vi.fn();
gotFn.extend = extendMock;

vi.mock('got', () => ({
  default: gotFn,
  got: gotFn,
}));

const clientModule = await import('../../src/client/index.js');
const { get, setHttpClient, resetHttpClient, __testing__ } = clientModule;

describe('client factory', () => {
  beforeEach(() => {
    httpClient.mockClear();
    extendMock.mockClear();
    gotFn.mockClear();
    resetHttpClient();
  });

  it('initializes got client once and reuses the instance', async () => {
    await get('https://example.com');
    await get('https://example.com/again');

    expect(extendMock).toHaveBeenCalledTimes(1);
    expect(httpClient).toHaveBeenCalledTimes(2);
  });

  it('supports overriding the HTTP client for testing', async () => {
    const fakeClient = vi.fn(() => Promise.resolve('mocked'));
    setHttpClient(fakeClient);

    await expect(get('https://whatever')).resolves.toBe('mocked');
    expect(fakeClient).toHaveBeenCalledWith('https://whatever', undefined);
  });

  it('resets cached client instances', async () => {
    await get('https://first-run');
    expect(extendMock).toHaveBeenCalledTimes(1);

    resetHttpClient();

    await get('https://second-run');
    expect(extendMock).toHaveBeenCalledTimes(2);
  });

  it('exposes loadClient for advanced testing scenarios', async () => {
    const instance = await __testing__.loadClient();
    expect(instance).toBe(httpClient);
  });
});
