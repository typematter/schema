import validationError, { type ValidationError } from '$lib/validation-error/index.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate = (value: unknown, field: unknown, path: string[] = []): ValidationError[] => {
	const errors: ValidationError[] = [];

	const error = pipe(withPath(path));

	if (!is(field)) {
		return [error(fromString('Expected boolean field'))];
	}

	if (typeof value !== 'boolean') {
		return [error(fromString(`Expected boolean value, got ${typeof value}`))];
	}

	return errors;
};

export default validate;
