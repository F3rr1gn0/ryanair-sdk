import { z } from 'zod';

export const StrDate = z.string().date();
export const StrDateTime = z.string().datetime({
  local: true,
});
export const StrDateTimeMs = z.string().datetime({
  local: true,
  precision: 3,
});
