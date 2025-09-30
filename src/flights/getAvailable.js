import { AvailabilityResponse, AvailabilityOptions } from './types.js';
import { get } from '../client/index.js';
import { BOOKING_API } from '../endpoints.js';
import { tomorrow } from '../helpers/date.js';

const DEFAULT_OPTIONS = {
  ADT: '1',
  CHD: '0',
  DateIn: '',
  DateOut: tomorrow(),
  Destination: 'KRK',
  Disc: '0',
  FlexDaysBeforeIn: '2',
  FlexDaysBeforeOut: '2',
  FlexDaysIn: '2',
  FlexDaysOut: '2',
  IncludeConnectingFlights: 'false',
  INF: '0',
  Origin: 'BER',
  promoCode: '',
  RoundTrip: 'false',
  TEEN: '0',
  ToUs: 'AGREED',
};

/**
 * Returns the list of available flights between two airports.
 */
export const getAvailable = async (params = {}) => {
  const mergedParams = AvailabilityOptions.parse({
    ...DEFAULT_OPTIONS,
    ...params,
  });
  const urlParams = new URLSearchParams(mergedParams);
  const url = `${BOOKING_API}/availability?${urlParams.toString()}`;
  const data = await get(url);
  return AvailabilityResponse.parse(data);
};
