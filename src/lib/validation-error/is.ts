import { VALIDATION_ERROR_NAME, type ValidationError } from '$types/validation-error.js';
/**
 * Type guard to check if an error is a `ValidationError`.
 * Runtime check uses name discriminator while TypeScript enforces branded type.
 *
 * @param error - The error to check.
 * @returns `true` if the error is a `ValidationError`, `false` otherwise.
 */
const is = (error: unknown): error is ValidationError =>
	error !== undefined &&
	error !== null &&
	typeof error === 'object' &&
	(error as ValidationError).name === VALIDATION_ERROR_NAME &&
	typeof (error as ValidationError).message === 'string';

export default is;
