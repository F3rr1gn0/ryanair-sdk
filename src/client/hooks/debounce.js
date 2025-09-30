import { randomInt } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

let globalQueue = Promise.resolve();

const resolveDuration = (duration) =>
  Array.isArray(duration) ? randomInt(duration[0], duration[1]) : duration;

/**
 * Creates a delay between API requests using a global queue.
 */
const debounceRequest = async (duration) => {
  const timeout = resolveDuration(duration);
  const previous = globalQueue;
  globalQueue = (async () => {
    await previous;
    await delay(timeout);
  })();
  await globalQueue;
};

/**
 * Hook that runs before each request to enforce delay between API calls.
 */
const beforeRequestHook = async (options) => {
  const debounceOpts = options.context?.debounce;
  if (!debounceOpts?.duration) {
    return;
  }
  await debounceRequest(debounceOpts.duration);
};

/**
 * Creates a Got extension that adds request debouncing functionality.
 */
export const debounce = (duration) => ({
  hooks: {
    beforeRequest: [beforeRequestHook],
  },
  context: {
    debounce: {
      duration,
    },
  },
});

export const __testing__ = {
  resolveDuration,
  debounceRequest,
  beforeRequestHook,
};
