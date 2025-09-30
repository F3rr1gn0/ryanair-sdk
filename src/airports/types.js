import { z } from 'zod';
import { StrDate } from '../date.types.js';

export const IataCode = z
  .string()
  .length(3)
  .regex(/[A-Z]/, 'Incorrect IATA code format. IATA code must contain only CAPITAL letters.');

export const Location = z.object({
  name: z.string(),
  code: z.string(),
  macCode: z.string().optional(),
});

export const Country = z.object({
  name: z.string(),
  code: z.string(),
  currency: z.string(),
  defaultAirportCode: IataCode,
});

export const Coordinates = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const AirportShort = z.object({
  code: IataCode,
  name: z.string(),
  aliases: z.array(z.string()),
  city: Location,
  macCity: Location.optional(),
  country: Country.omit({
    currency: true,
    defaultAirportCode: true,
  }),
  coordinates: Coordinates,
});

export const AirportConnection = z.object({
  arrivalAirport: AirportShort,
  connectingAirport: z.string().nullable(),
  operator: z.string(),
});

export const AirportBase = z.object({
  name: z.string(),
  seoName: z.string(),
  aliases: z.array(z.string()),
  base: z.boolean(),
  coordinates: Coordinates,
  timeZone: z.string(),
});

export const AirportV3 = AirportBase.extend({
  iataCode: IataCode,
  countryCode: z.string(),
  regionCode: z.string(),
  cityCode: z.string(),
  currencyCode: z.string(),
  routes: z.array(z.string()),
  seasonalRoutes: z.array(z.string()),
  categories: z.array(z.string()),
  priority: z.number(),
});

export const Airport = AirportBase.extend({
  code: IataCode,
  city: Location,
  macCity: Location.optional(),
  region: Location.omit({
    macCode: true,
  }),
  country: Country,
});

export const Destination = z.object({
  arrivalAirport: Airport,
  recent: z.boolean(),
  seasonal: z.boolean(),
  operator: z.string(),
  tags: z.array(z.string()),
});

export const Schedule = z.object({
  firstFlightDate: StrDate,
  lastFlightDate: StrDate,
  months: z.number(),
  monthsFromToday: z.number(),
});

export const Schedules = z.record(z.string(), Schedule);
