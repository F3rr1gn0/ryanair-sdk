import { describe, it, expect } from 'vitest';

import * as sdk from '../src/index.js';
import * as airports from '../src/airports/index.js';
import * as fares from '../src/fares/index.js';
import * as flights from '../src/flights/index.js';
import * as helpers from '../src/helpers/index.js';

describe('package entrypoints', () => {
  it('exposes grouped namespaces', () => {
    expect(sdk).toHaveProperty('airports');
    expect(sdk).toHaveProperty('fares');
    expect(sdk).toHaveProperty('flights');
  });

  it('re-exports submodules directly', () => {
    expect(airports).toHaveProperty('getActive');
    expect(fares).toHaveProperty('findCheapestRoundTrip');
    expect(flights).toHaveProperty('getAvailable');
    expect(helpers).toHaveProperty('tomorrow');
  });
});
