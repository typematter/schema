import type { ValidationError } from './validation-error.js';

type Validator = (value: unknown, field: unknown, path?: string[]) => ValidationError[];

export type { Validator };
