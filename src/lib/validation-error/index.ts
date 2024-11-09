import create from './create.js';
import fromError from './from-error.js';
import fromString from './from-string.js';
import is from './is.js';
import pipe from './pipe.js';
import withContext from './with-context.js';
import withPath from './with-path.js';

const VALIDATION_ERROR_NAME = 'ValidationError';

interface ValidationError extends Error {
	readonly name: typeof VALIDATION_ERROR_NAME;
	readonly path: readonly string[];
	readonly __validationError: unique symbol;
}

const validationError = {
	create,
	fromError,
	fromString,
	is,
	pipe,
	withContext,
	withPath
} as const;

export default validationError;
export { VALIDATION_ERROR_NAME, type ValidationError };
