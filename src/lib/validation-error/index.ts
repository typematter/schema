import create from './create.js';
import fromError from './from-error.js';
import fromString from './from-string.js';
import is from './is.js';
import pipe from './pipe.js';
import withContext from './with-context.js';
import withPath from './with-path.js';

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
