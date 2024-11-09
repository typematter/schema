import { type ValidationError } from '$types/validation-error.js';
import create from './create.js';

/**
 * Converts an error message into a `ValidationError`.
 *
 * @param error - The error message to convert.
 * @param path - The path to the error.
 */
const fromString: (error: string, path?: readonly string[]) => ValidationError = (
	error,
	path = []
) => create({ message: error, path });

export default fromString;
