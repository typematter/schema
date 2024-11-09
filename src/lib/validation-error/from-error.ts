import { type ValidationError } from '$types/validation-error.js';
import create from './create.js';
import is from './is.js';

/**
 * Converts an unknown error into a `ValidationError`.
 *
 * @param error - The error to convert.
 * @param path - The path to the error.
 */
const fromError: (error: Error, path?: readonly string[]) => ValidationError = (
	error,
	path = []
) =>
	is(error)
		? error
		: create({
				cause: error,
				message: error.message,
				path,
				stack: error.stack
			});

export default fromError;
