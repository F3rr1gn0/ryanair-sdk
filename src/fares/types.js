import { z } from 'zod';
import { StrDate, StrDateTime } from '../date.types.js';

export const Price = z.object({
  value: z.number(),
  valueMainUnit: z.string(),
  valueFractionalUnit: z.string(),
  currencyCode: z.string(),
  currencySymbol: z.string(),
});

export const Fare = z.object({
  day: StrDate,
  arrivalDate: StrDateTime.nullable(),
  departureDate: StrDateTime.nullable(),
  price: Price.nullable(),
  soldOut: z.boolean(),
  unavailable: z.boolean(),
});

export const CheapestFares = z.object({
  outbound: z.object({
    fares: z.array(Fare),
    minFare: Fare.nullable(),
    maxFare: Fare.nullable(),
  }),
});

export const RoundTrip = z.object({
  departure: Fare,
  return: Fare,
  price: z.number(),
});
