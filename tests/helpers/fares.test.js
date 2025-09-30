import { describe, it, expect } from 'vitest';
import { getFarePrice, sortByPrice } from '../../src/helpers/fares.js';

const makeFare = (value) => ({
  price: value === null ? null : { value },
});

describe('fares helpers', () => {
  it('returns zero when fare has no price', () => {
    expect(getFarePrice(makeFare(null))).toBe(0);
  });

  it('returns fare price value when present', () => {
    expect(getFarePrice(makeFare(19.99))).toBe(19.99);
  });

  it('sorts fares ascending by price', () => {
    const fares = [makeFare(40), makeFare(10), makeFare(20)];
    const sorted = [...fares].sort(sortByPrice);
    expect(sorted.map(getFarePrice)).toEqual([10, 20, 40]);
  });
});
