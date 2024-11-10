import validationError from '$lib/validation-error/index.js';
import type { ValidationError } from '$types/validation-error.js';
import type { Validator } from '$types/validator.js';
import is from './is.js';

const { fromString, pipe, withPath } = validationError;

const validate: Validator = (value, field, path = []) => {
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
