import type { z } from 'zod';

export function getZodErrorMessages<T>(error: z.core.$ZodFormattedError<T>): string[] {
  return Object.values(error)
    .map(field => {
      if (Array.isArray(field)) return field;
      return (field as { _errors?: string[] })?._errors ?? [];
    })
    .flat()
    .filter(Boolean);
}
