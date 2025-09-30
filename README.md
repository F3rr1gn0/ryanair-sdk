# Ryanair SDK

[![NPM version](https://img.shields.io/npm/v/@f3rr1gn0/ryanair-sdk)](https://www.npmjs.com/package/@f3rr1gn0/ryanair-sdk)
[![License](https://img.shields.io/npm/l/@f3rr1gn0/ryanair-sdk)](https://www.npmjs.com/package/@f3rr1gn0/ryanair-sdk)
[![GitHub Build Status](https://img.shields.io/github/actions/workflow/status/f3rr1gn0/ryanair-sdk/build.yml)](https://github.com/f3rr1gn0/ryanair-sdk/actions/workflows/build.yml)
[![Code coverage](https://img.shields.io/codecov/c/github/f3rr1gn0/ryanair-sdk)](https://codecov.io/gh/f3rr1gn0/ryanair-sdk)
[![Top language](https://img.shields.io/github/languages/top/f3rr1gn0/ryanair-sdk)](https://github.com/f3rr1gn0/ryanair-sdk)
[![Postman Collection](https://img.shields.io/badge/postman-collection-ff6c37)](https://www.postman.com/hakkotsu/workspace/ryanair)

> Inspired by the punchy docs of [2bad](https://github.com/2bad) — this package wraps Ryanair's public endpoints with sane defaults, blazing-fast validation, and test-friendly ergonomics.

> **Fork notice:** This repository is a maintained fork of [2BAD/ryanair](https://github.com/2BAD/ryanair) with rewritten JavaScript output, expanded testing, and additional documentation.

## Highlights

- **Typed by design** via Zod schemas without TypeScript runtime overhead.
- **Drop-in HTTP client** powered by `got` with smart, globally queued debouncing.
- **Rich helpers** for airports, fares, flights, routing, and geo math.
- **Ready for prod**: dual CJS/ESM bundles, full test coverage, MIT licensed.

## Installation

```bash
npm install @f3rr1gn0/ryanair-sdk
# or
pnpm add @f3rr1gn0/ryanair-sdk
```

The package ships compiled artifacts under `dist/`; no build step is required after installation.

## Quick start

### ES module

```js
import { airports, fares, flights } from '@f3rr1gn0/ryanair-sdk';

const run = async () => {
  const active = await airports.getActive();
  const cheapest = await fares.findCheapestRoundTrip('DUB', 'KRK', '2024-05-01', '2024-05-31');
  const availability = await flights.getAvailable({ Origin: 'DUB', Destination: 'KRK' });

  console.log(active.length, cheapest[0], availability.trips[0].dates[0].flights.length);
  // Example output: 253 { departure: {...}, return: {...}, price: 45 } 6
};

run();
```

### CommonJS

```js
const { airports, fares, flights } = require('@f3rr1gn0/ryanair-sdk');

async function run() {
  const active = await airports.getActive();
  const cheapest = await fares.findCheapestRoundTrip('DUB', 'KRK', '2024-05-01', '2024-05-31');
  const availability = await flights.getAvailable({ Origin: 'DUB', Destination: 'KRK' });

  console.log(active.length, cheapest[0], availability.trips[0].dates[0].flights.length);
  // Example output: 253 { departure: {...}, return: {...}, price: 45 } 6
}

run();
```

## Custom HTTP client

### ES module override

```js
import { setHttpClient, resetHttpClient } from '@f3rr1gn0/ryanair-sdk/client';
import got from 'got';

setHttpClient(
  got.extend({
    hooks: {
      beforeRequest: [({ url }) => console.info('->', url.toString())],
    },
  }),
);

// ... make SDK calls here

resetHttpClient();
```

### CommonJS override

```js
const { setHttpClient, resetHttpClient } = require('@f3rr1gn0/ryanair-sdk/client');
const got = require('got');

setHttpClient(
  got.extend({
    hooks: {
      beforeRequest: [({ url }) => console.info('->', url.toString())],
    },
  }),
);

// ... make SDK calls here

resetHttpClient();
```

## Modules at a glance

- `airports`: active airports, geo search, route discovery, schedules, and Zod schemas.
- `fares`: fare calendars, round-trip combinatorics (via fast-cartesian), and price helpers.
- `flights`: booking availability + date lookup with strongly validated payloads.
- `helpers`: dates, coordinates, pricing utilities, and haversine distance calculations.
- `client`: lazy `got` factory with global debouncing and injectable overrides.
- `endpoints`: frozen base URLs for Ryanair public APIs.

Every response is validated on the fly; invalid data throws early with precise error messages.

## Testing and coverage

The suite is powered by Vitest (v8 engine coverage). Run it locally:

```bash
npm test
```

Coverage thresholds are enforced at ≥90 percent for statements/lines/functions and ≥85 percent for branches. HTML and JSON summaries are emitted in `coverage/`.

Want to iterate? `npm run test:watch` keeps the feedback loop tight.

## Build and publish

```bash
npm run build   # bundles to dist/index.{js,cjs}
npm pack        # optional: preview the tarball destined for npm
```

A `prepare` lifecycle hook rebuilds automatically so the packaged tarball always ships fresh artifacts. Add a remote and push to make it public:

```bash
git init
git remote add origin git@github.com:f3rr1gn0/ryanair-sdk.git
npm version patch
npm publish --access public
```

## API Overview

### Airports API
- Get active airports list
- Find nearest airports
- Discover available destinations
- View airport details
- Search flight routes

[View Airports Documentation →](docs/airports.md)

### Fares API
- Find cheapest daily fares
- Compare prices across date ranges
- Discover best round-trip deals
- Search by currency preference

[View Fares Documentation →](docs/fares.md)

### Flights API
- Check flight availability
- View flight schedules
- Search available dates
- Access flight details

[View Flights Documentation →](docs/flights.md)

## Understanding IATA Codes

IATA codes are three-letter identifiers used in aviation for airports worldwide. For example:
- `DUB` - Dublin Airport
- `BER` - Berlin Brandenburg Airport
- `STN` - London Stansted Airport

Find the complete list on [IATA's official website](https://www.iata.org/en/publications/directories/code-search/).

## Disclaimer

This is an unofficial package and is not affiliated with Ryanair. Usage is subject to Ryanair's API terms and conditions.

## Contributing

Contributions are welcome. Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please ensure your code passes all tests and follows our coding standards.

## License

MIT © [f3rr1gn0](https://github.com/f3rr1gn0)

---

Need help? [Open an issue](https://github.com/f3rr1gn0/ryanair-sdk/issues) or check our [Postman collection](https://www.postman.com/hakkotsu/workspace/ryanair).
