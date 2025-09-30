import { Schedules } from './types.js';
import { get } from '../client/index.js';
import { TIMETABLE_API } from '../endpoints.js';

/**
 * Returns a list of available flight schedules departing from an airport.
 */
export const getSchedules = async (code) => {
  const url = `${TIMETABLE_API}/schedules/${code}/periods`;
  const data = await get(url);
  const schedules = Schedules.parse(data);
  if (Object.keys(schedules).length === 0) {
    throw new Error('Response code 404 (Not Found)');
  }
  return schedules;
};
