import { describe, it, expect, vi, beforeEach } from 'vitest';

const delayMock = vi.fn(() => Promise.resolve());
const randomMock = vi.fn(() => 42);

vi.mock('node:timers/promises', () => ({
  setTimeout: delayMock,
}));

vi.mock('node:crypto', () => ({
  randomInt: randomMock,
}));

const { debounce, __testing__ } = await import('../../src/client/hooks/debounce.js');

describe('client debounce hook', () => {
  beforeEach(() => {
    delayMock.mockClear();
    randomMock.mockClear();
  });

  it('resolves fixed durations without touching randomInt', async () => {
    await __testing__.debounceRequest(100);
    expect(randomMock).not.toHaveBeenCalled();
    expect(delayMock).toHaveBeenCalledTimes(1);
    expect(delayMock).toHaveBeenCalledWith(100);
  });

  it('queues requests sequentially', async () => {
    const promise = Promise.all([
      __testing__.debounceRequest(50),
      __testing__.debounceRequest(50),
    ]);
    await promise;
    expect(delayMock).toHaveBeenCalledTimes(2);
  });

  it('creates hook metadata including duration', () => {
    const extension = debounce([100, 200]);
    expect(extension.context.debounce.duration).toEqual([100, 200]);
  });

  it('stochastically resolves ranges via randomInt', async () => {
    await __testing__.debounceRequest([10, 20]);
    expect(randomMock).toHaveBeenCalledWith(10, 20);
  });

  it('runs beforeRequestHook only when duration exists', async () => {
    await __testing__.beforeRequestHook({ context: {} });
    expect(delayMock).not.toHaveBeenCalled();

    await __testing__.beforeRequestHook({ context: { debounce: { duration: 75 } } });
    expect(delayMock).toHaveBeenCalledWith(75);
  });
});
