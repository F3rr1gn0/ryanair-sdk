# Airports API

The airports module wraps Ryanair's public airport endpoints and companion utilities. All methods resolve to data validated by Zod schemas so you get predictable payloads every time.

## Tips
- `getSchedules` throws when the API returns an empty object. Wrap calls in `try/catch` if an airport may not have schedules.
- `findRoutes` returns a direct route first when one exists; otherwise it emits one-stop combinations validated via Zod.
- Utility methods such as `calculateDistance` accept either airport objects or raw `{ latitude, longitude }` shapes.

## Methods
- [`getActive()`](#getactive)
- [`getActiveV3()`](#getactivev3)
- [`getClosest()`](#getclosest)
- [`getNearby(locale)`](#getnearbylocale)
- [`getDestinations(code)`](#getdestinationscode)
- [`getInfo(code)`](#getinfocode)
- [`getSchedules(code)`](#getschedulescode)
- [`findRoutes(from-to)`](#findroutesfrom-to)
- [`calculateDistance(locations)`](#calculatedistancelocations)

---

### `getActive()`
Returns the list of all currently active airports (API v5).

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const active = await airports.getActive();
console.log(active.length, active[0].code, active[0].country.name);
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.getActive().then((active) => {
  console.log(active.length, active[0].code, active[0].country.name);
});
```

**Example output**
```
253 'DUB' 'Ireland'
```

---

### `getActiveV3()`
Fetches active airports using the legacy v3 endpoint (useful for backward compatibility).

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const legacyActive = await airports.getActiveV3();
console.log(legacyActive[0].iataCode, legacyActive[0].routes.length);
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.getActiveV3().then((legacyActive) => {
  console.log(legacyActive[0].iataCode, legacyActive[0].routes.length);
});
```

**Example output**
```
'BER' 120
```

---

### `getClosest()`
Detects the closest airport based on the requester IP.

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const closest = await airports.getClosest();
console.log(closest.code, closest.coordinates);
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.getClosest().then((closest) => {
  console.log(closest.code, closest.coordinates);
});
```

**Example output**
```
'BER' { latitude: 52.3667, longitude: 13.5033 }
```

---

### `getNearby(locale)`
Lists nearby airports for a given market (default `en-gb`).

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const nearby = await airports.getNearby('en-gb');
console.log(nearby.length, nearby[0].name);
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.getNearby('en-gb').then((nearby) => {
  console.log(nearby.length, nearby[0].name);
});
```

**Example output**
```
6 'Berlin Brandenburg'
```

---

### `getDestinations(code)`
Returns destinations available from the specified airport.

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const destinations = await airports.getDestinations('DUB');
console.log(destinations[0].arrivalAirport.code, destinations.length);
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.getDestinations('DUB').then((destinations) => {
  console.log(destinations[0].arrivalAirport.code, destinations.length);
});
```

**Example output**
```
'KRK' 95
```

---

### `getInfo(code)`
Fetches detailed information for a single airport.

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const info = await airports.getInfo('BER');
console.log(info.name, info.coordinates.latitude);
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.getInfo('BER').then((info) => {
  console.log(info.name, info.coordinates.latitude);
});
```

**Example output**
```
'Berlin Brandenburg' 52.3667
```

---

### `getSchedules(code)`
Gets the schedule periods (first/last flight dates by month) for the chosen airport. Throws if the API returns no data.

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

try {
  const schedules = await airports.getSchedules('DUB');
  console.log(Object.keys(schedules));
} catch (error) {
  console.error('No schedules found', error.message);
}
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports
  .getSchedules('DUB')
  .then((schedules) => console.log(Object.keys(schedules)))
  .catch((error) => console.error('No schedules found', error.message));
```

**Example output**
```
[ 'DUB' ]
```

---

### `findRoutes(from, to)`
Discovers direct routes or one-stop combinations between two airports.

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const routes = await airports.findRoutes('DUB', 'BER');
console.log(routes.slice(0, 2));
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

airports.findRoutes('DUB', 'BER').then((routes) => {
  console.log(routes.slice(0, 2));
});
```

**Example output**
```
[ [ 'DUB', 'BER' ], [ 'DUB', 'STN', 'BER' ] ]
```

---

### `calculateDistance(locations)`
Calculates the total distance (in meters) across an array of airport objects or raw coordinates.

**ESM**
```js
import { airports } from '@f3rr1gn0/ryanair-sdk';

const distance = airports.calculateDistance([
  { latitude: 53.4213, longitude: -6.2701 },
  { latitude: 52.3086, longitude: 4.7639 },
  { latitude: 52.3667, longitude: 13.5033 },
]);
console.log(Math.round(distance));
```

**CommonJS**
```js
const { airports } = require('@f3rr1gn0/ryanair-sdk');

const distance = airports.calculateDistance([
  { latitude: 53.4213, longitude: -6.2701 },
  { latitude: 52.3086, longitude: 4.7639 },
  { latitude: 52.3667, longitude: 13.5033 },
]);
console.log(Math.round(distance));
```

**Example output**
```
1337100
```

---

> All figures shown are illustrative. Real values rely on Ryanair's live systems and your network location.
