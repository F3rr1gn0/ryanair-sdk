/**
 * Retrieves the fare price from a Fare object.
 */
export const getFarePrice = (fare) => (fare.price !== null ? fare.price.value : 0);

/**
 * Sorts two Fare objects by their price in ascending order.
 */
export const sortByPrice = (a, b) => getFarePrice(a) - getFarePrice(b);
