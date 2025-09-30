# Flights API

The flights module provides validated access to Ryanair's booking availability and flight date endpoints.

## Tips
- `getAvailable` merges provided parameters with smart defaults (one adult, no return flight, flex search ±2 days). Override only what you need.
- Each trip contains an array of `dates`, each with `flights` and segmented fare data validated by Zod schemas under `flights/types`.
- Combine `getDates` with the fares module to correlate availability and pricing for end-to-end search flows.

## Methods
- [`getAvailable(params?)`](#getavailable)
- [`getDates(from, to)`](#getdates)

---

### `getAvailable(params?)`
Fetches flight availability using Ryanair's booking endpoint. Accepts a partial options object (strings per the API expectations).

**ESM**
```js
import { flights } from '@f3rr1gn0/ryanair-sdk';

const availability = await flights.getAvailable({ Origin: 'DUB', Destination: 'KRK', DateOut: '2024-05-10' });
console.log(availability.trips.length, availability.trips[0].dates[0].flights.length);
```

**CommonJS**
```js
const { flights } = require('@f3rr1gn0/ryanair-sdk');

flights
  .getAvailable({ Origin: 'DUB', Destination: 'KRK', DateOut: '2024-05-10' })
  .then((availability) => {
    console.log(availability.trips.length, availability.trips[0].dates[0].flights.length);
  });
```

**Example output**
```
1 6
```

---

### `getDates(from, to)`
Retrieves available travel dates between two airports using the fare finder service.

**ESM**
```js
import { flights } from '@f3rr1gn0/ryanair-sdk';

const dates = await flights.getDates('DUB', 'KRK');
console.log(dates.slice(0, 5));
```

**CommonJS**
```js
const { flights } = require('@f3rr1gn0/ryanair-sdk');

flights.getDates('DUB', 'KRK').then((dates) => {
  console.log(dates.slice(0, 5));
});
```

**Example output**
```
[ '2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05' ]
```

---

> Availability responses fluctuate throughout the day. Always check the `dates` array before assuming content.
