import { findDailyFaresInRange } from './findDailyFaresInRange.js';
import { isAfterISO } from '../helpers/date.js';
import { getFarePrice, sortByPrice } from '../helpers/fares.js';
import { RoundTrip } from './types.js';

let cartesian;
let cartesianPromise;

const loadCartesian = async () => {
  if (cartesian) {
    return cartesian;
  }
  if (!cartesianPromise) {
    cartesianPromise = import('fast-cartesian').then((module) => module.default ?? module);
  }
  cartesian = await cartesianPromise;
  return cartesian;
};

const isFareValid = (fare) => Boolean(fare?.price);

/**
 * Finds the cheapest round trip fares for a given route and date range in a specific currency.
 */
export const findCheapestRoundTrip = async (
  from,
  to,
  startDate,
  endDate,
  currency = 'EUR',
  limit = 10,
) => {
  const [outboundPrices, inboundPrices, fastCartesian] = await Promise.all([
    findDailyFaresInRange(from, to, startDate, endDate, currency),
    findDailyFaresInRange(to, from, startDate, endDate, currency),
    loadCartesian(),
  ]);
  const filteredOutbound = outboundPrices.filter(isFareValid);
  const filteredInbound = inboundPrices.filter(isFareValid);
  const sortedOutboundPrices = filteredOutbound.sort(sortByPrice).slice(0, limit);
  const sortedInboundPrices = filteredInbound.sort(sortByPrice).slice(0, limit);
  const combinations = fastCartesian([sortedOutboundPrices, sortedInboundPrices]);
  const cheapestRoundTrips = combinations
    .map(([outbound, inbound]) => ({
      departure: outbound,
      return: inbound,
      price: Number((getFarePrice(outbound) + getFarePrice(inbound)).toFixed(2)),
    }))
    .filter((trip) => isAfterISO(trip.return.day, trip.departure.day))
    .sort((a, b) => a.price - b.price)
    .slice(0, limit)
    .map((trip) => RoundTrip.parse(trip));
  return cheapestRoundTrips;
};

export const __testing__ = {
  isFareValid,
  loadCartesian,
};
