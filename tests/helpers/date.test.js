import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  tomorrow,
  nextMonth,
  isAfterISO,
  getFirstDayOfEachMonthInRange,
} from '../../src/helpers/date.js';

const FIXED_DATE = new Date('2024-01-15T00:00:00Z');

describe('date helpers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns tomorrow in ISO format', () => {
    expect(tomorrow()).toBe('2024-01-16');
  });

  it('returns same day next month in ISO format', () => {
    expect(nextMonth()).toBe('2024-02-15');
  });

  it('compares ISO dates correctly', () => {
    expect(isAfterISO('2024-02-01', '2024-01-31')).toBe(true);
    expect(isAfterISO('2024-02-01', '2024-02-01')).toBe(false);
  });

  it('returns first day of each month in range', () => {
    expect(getFirstDayOfEachMonthInRange('2024-01-10', '2024-03-09')).toEqual([
      '2024-01-01',
      '2024-02-01',
      '2024-03-01',
    ]);
  });

  it('throws when start date is after end date', () => {
    expect(() => getFirstDayOfEachMonthInRange('2024-03-02', '2024-01-01')).toThrow(
      'Invalid date range. The start date must be before the end date.',
    );
  });
});
