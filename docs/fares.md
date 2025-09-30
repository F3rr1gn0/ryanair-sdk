# Fares API

The fares module focuses on Ryanair's pricing endpoints, providing helpers for exploring daily prices and assembled round trips.

## Tips
- Provide a custom `currency` when you need pricing in something other than EUR.
- `findCheapestRoundTrip` automatically filters out fares with missing price data and sorts by total cost.
- Utility helpers (`getFarePrice`, `sortByPrice`) live under the `helpers` namespace but are documented here for convenience.

## Methods
- [`getCheapestPerDay(from, to, startDate, currency?)`](#getcheapestperday)
- [`findDailyFaresInRange(from, to, startDate, endDate, currency?)`](#finddailyfaresinrange)
- [`findCheapestRoundTrip(from, to, startDate, endDate, currency?, limit?)`](#findcheapestroundtrip)
- [`getFarePrice(fare)`](#getfareprice)
- [`sortByPrice(a-b)`](#sortbyprice)

---

### `getCheapestPerDay(from, to, startDate, currency?)`
Fetches the cheapest outbound fares for each day of the month starting at `startDate`.

**ESM**
```js
import { fares } from '@f3rr1gn0/ryanair-sdk';

const calendar = await fares.getCheapestPerDay('DUB', 'KRK', '2024-05-01');
console.log(calendar.outbound.fares.length, calendar.outbound.minFare?.price?.value);
```

**CommonJS**
```js
const { fares } = require('@f3rr1gn0/ryanair-sdk');

fares
  .getCheapestPerDay('DUB', 'KRK', '2024-05-01')
  .then((calendar) => console.log(calendar.outbound.fares.length, calendar.outbound.minFare?.price?.value));
```

**Example output**
```
31 19.99
```

---

### `findDailyFaresInRange(from, to, startDate, endDate, currency?)`
Aggregates monthly fare calendars into a single flat list filtered to days with pricing data.

**ESM**
```js
import { fares } from '@f3rr1gn0/ryanair-sdk';

const faresInRange = await fares.findDailyFaresInRange('DUB', 'KRK', '2024-05-01', '2024-07-31');
console.log(faresInRange.length, faresInRange[0].price?.value);
```

**CommonJS**
```js
const { fares } = require('@f3rr1gn0/ryanair-sdk');

fares
  .findDailyFaresInRange('DUB', 'KRK', '2024-05-01', '2024-07-31')
  .then((faresInRange) => console.log(faresInRange.length, faresInRange[0].price?.value));
```

**Example output**
```
62 19.99
```

---

### `findCheapestRoundTrip(from, to, startDate, endDate, currency?, limit?)`
Combines outbound and inbound fares to produce the cheapest round-trip itineraries.

**ESM**
```js
import { fares } from '@f3rr1gn0/ryanair-sdk';

const deals = await fares.findCheapestRoundTrip('DUB', 'KRK', '2024-05-01', '2024-05-31', 'EUR', 3);
console.log(deals.length, deals[0].price);
```

**CommonJS**
```js
const { fares } = require('@f3rr1gn0/ryanair-sdk');

fares
  .findCheapestRoundTrip('DUB', 'KRK', '2024-05-01', '2024-05-31', 'EUR', 3)
  .then((deals) => console.log(deals.length, deals[0].price));
```

**Example output**
```
3 44.98
```

---

### `getFarePrice(fare)`
Helper that normalises a fare object to a numeric value (zero when price is unavailable).

**ESM**
```js
import { fares } from '@f3rr1gn0/ryanair-sdk';
import { getFarePrice } from '@f3rr1gn0/ryanair-sdk/helpers';

const calendar = await fares.getCheapestPerDay('DUB', 'KRK', '2024-05-01');
const value = getFarePrice(calendar.outbound.fares[0]);
console.log(value);
```

**CommonJS**
```js
const { fares } = require('@f3rr1gn0/ryanair-sdk');
const { getFarePrice } = require('@f3rr1gn0/ryanair-sdk/helpers');

fares.getCheapestPerDay('DUB', 'KRK', '2024-05-01').then((calendar) => {
  const value = getFarePrice(calendar.outbound.fares[0]);
  console.log(value);
});
```

**Example output**
```
19.99
```

---

### `sortByPrice(a, b)`
Comparison helper for sorting arrays of fares in ascending order.

**ESM**
```js
import { fares } from '@f3rr1gn0/ryanair-sdk';
import { sortByPrice } from '@f3rr1gn0/ryanair-sdk/helpers';

const faresInRange = await fares.findDailyFaresInRange('DUB', 'KRK', '2024-05-01', '2024-05-31');
const sorted = [...faresInRange].sort(sortByPrice);
console.log(sorted.slice(0, 2).map((fare) => fare.price?.value));
```

**CommonJS**
```js
const { fares } = require('@f3rr1gn0/ryanair-sdk');
const { sortByPrice } = require('@f3rr1gn0/ryanair-sdk/helpers');

fares
  .findDailyFaresInRange('DUB', 'KRK', '2024-05-01', '2024-05-31')
  .then((faresInRange) => {
    const sorted = [...faresInRange].sort(sortByPrice);
    console.log(sorted.slice(0, 2).map((fare) => fare.price?.value));
  });
```

**Example output**
```
[ 19.99, 24.99 ]
```

---

> Totals shown are illustrative. Real values rely on Ryanair's live fare data and may vary per run.
